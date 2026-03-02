// BODA Supabase Client — community board backend
// Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY after creating a Supabase project.

(function () {
  'use strict';

  const SUPABASE_URL = 'YOUR_SUPABASE_URL';
  const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

  if (typeof supabase === 'undefined') {
    console.error('[BODA] Supabase JS SDK not loaded. Add the CDN script before supabase-config.js');
    return;
  }

  const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  // ── Auth Helpers ──────────────────────────────────────────

  async function getSession() {
    const { data: { session } } = await db.auth.getSession();
    return session;
  }

  async function getUser() {
    const session = await getSession();
    return session ? session.user : null;
  }

  async function getProfile(userId) {
    const { data } = await db.from('profiles').select('*').eq('id', userId).single();
    return data;
  }

  async function signInWithKakao(redirectPath) {
    const redirectTo = window.location.origin + (redirectPath || '/callback.html');
    return db.auth.signInWithOAuth({ provider: 'kakao', options: { redirectTo } });
  }

  async function signInWithGoogle(redirectPath) {
    const redirectTo = window.location.origin + (redirectPath || '/callback.html');
    return db.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
  }

  async function signOut() {
    return db.auth.signOut();
  }

  function onAuthChange(callback) {
    return db.auth.onAuthStateChange(callback);
  }

  // ── Posts API ──────────────────────────────────────────────

  async function fetchPosts({ page = 1, perPage = 20, sort = 'latest', filters = {} } = {}) {
    let query = db
      .from('posts')
      .select('*', { count: 'exact' });

    if (filters.serviceId)   query = query.eq('service_id', filters.serviceId);
    if (filters.concernType) query = query.eq('concern_type', filters.concernType);
    if (filters.methodUsed)  query = query.eq('method_used', filters.methodUsed);

    if (sort === 'popular')  query = query.order('like_count', { ascending: false });
    else                     query = query.order('created_at', { ascending: false });

    const from = (page - 1) * perPage;
    query = query.range(from, from + perPage - 1);

    const { data, count, error } = await query;
    return { data: data || [], total: count || 0, error };
  }

  async function fetchPost(postId) {
    const { data, error } = await db
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();
    return { data, error };
  }

  async function createPost(post) {
    const user = await getUser();
    const row = { ...post };
    if (user) {
      row.user_id = user.id;
    }
    // nickname is expected in `post` already (defaults to '익명' in DB if omitted)
    const { data, error } = await db.from('posts').insert(row).select().single();
    return { data, error };
  }

  async function deletePost(postId) {
    return db.from('posts').delete().eq('id', postId);
  }

  // ── Comments API ──────────────────────────────────────────

  async function fetchComments(postId) {
    const { data, error } = await db
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    return { data: data || [], error };
  }

  async function createComment(postId, body, nickname) {
    const user = await getUser();
    const row = { post_id: postId, body };
    if (user) row.user_id = user.id;
    if (nickname) row.nickname = nickname;
    // nickname defaults to '익명' in DB if omitted
    const { data, error } = await db
      .from('comments')
      .insert(row)
      .select()
      .single();
    return { data, error };
  }

  async function deleteComment(commentId) {
    return db.from('comments').delete().eq('id', commentId);
  }

  // ── Likes API ─────────────────────────────────────────────

  async function toggleLike(postId) {
    const user = await getUser();
    if (!user) return { liked: false, error: { message: '로그인이 필요합니다.' } };

    const { data: existing } = await db
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      await db.from('likes').delete().eq('id', existing.id);
      return { liked: false, error: null };
    } else {
      await db.from('likes').insert({ post_id: postId, user_id: user.id });
      return { liked: true, error: null };
    }
  }

  async function getUserLikes(postIds) {
    const user = await getUser();
    if (!user || !postIds.length) return new Set();
    const { data } = await db.from('likes').select('post_id').eq('user_id', user.id).in('post_id', postIds);
    return new Set((data || []).map(l => l.post_id));
  }

  // ── Expose globally ───────────────────────────────────────

  window.BODA_DB = {
    client: db,
    // Auth
    getSession, getUser, getProfile,
    signInWithKakao, signInWithGoogle, signOut, onAuthChange,
    // Posts
    fetchPosts, fetchPost, createPost, deletePost,
    // Comments
    fetchComments, createComment, deleteComment,
    // Likes
    toggleLike, getUserLikes
  };
})();
