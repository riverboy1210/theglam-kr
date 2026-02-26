window.GLAM_CONTENT = {
  brand: {
    name: "THE GLAM",
    year: "2026",
    email: "hello@theglam.kr",
    phone: "02-333-3539"
  },
  map: [
    {
      title: "질문 A: 지금 필요한 결정은?",
      items: ["목표 정의 카드", "리스크 인지 카드", "우선순위 점검 카드"]
    },
    {
      title: "질문 B: 어떤 근거를 확인했는가?",
      items: ["팩트/의견 분리", "조건 비교 프롬프트", "누락 정보 체크"]
    },
    {
      title: "질문 C: 실행 가능한 선택은?",
      items: ["실행 가능성 점수", "회복·일정 캘린더", "사후 관리 트리거"]
    }
  ],
  methods: [
    "문제 재정의(PR): 질문의 각도/범위를 먼저 조정",
    "다차원 분석(MDA): 시간/공간/인과/계층 관점 분해",
    "창의 연결(CC): 공통점·차이·전이 경로 매핑",
    "통합 지혜(IW): 지식+공감+실행+윤리의 균형 점검"
  ],
  scenarios: [
    {
      title: "비용 중심 시나리오",
      body: "제약 조건을 먼저 선언하고, 가능한 옵션을 줄이는 방식."
    },
    {
      title: "회복 중심 시나리오",
      body: "일정/생활 패턴을 기준으로 선택지를 재배열하는 방식."
    },
    {
      title: "리스크 최소화 시나리오",
      body: "불확실성이 큰 요소를 선제 차단하고 순차 검증하는 방식."
    }
  ],
  intents: [
    {
      title: "가격 비교형 유입",
      body: "'강남언니 가격', '바비톡 이벤트'처럼 비용 민감 검색어로 유입된 사용자에게 총비용 체크리스트를 먼저 제시합니다.",
      keyword: "강남언니 가격, 바비톡 이벤트",
      href: "./landing/price-comparison.html",
      linkLabel: "가격 비교 랜딩 보기"
    },
    {
      title: "부작용/안전형 유입",
      body: "리스크를 먼저 확인하려는 사용자에게 회복 타임라인, 응급 신호, 병원 질문 템플릿을 우선 제공합니다.",
      keyword: "부작용, 회복기간, 안전성",
      href: "./landing/safety-recovery.html",
      linkLabel: "안전/회복 랜딩 보기"
    },
    {
      title: "병원 선택형 유입",
      body: "리뷰 신뢰성 검증, 상담 전 체크리스트, 비교 프레임을 제공해 탐색 시간을 줄입니다.",
      keyword: "병원 선택, 후기 검증, 상담 질문",
      href: "./landing/clinic-selection.html",
      linkLabel: "병원 선택 랜딩 보기"
    }
  ],
  funnel: [
    "유입 키워드 분류 (가격/안전/선택)",
    "의도별 랜딩 블록 자동 노출",
    "체크리스트 다운로드 또는 상담 준비 CTA",
    "이메일/문의 전환 및 리타게팅"
  ],
  cta: {
    headline: "지금 필요한 준비만 빠르게 받기",
    points: [
      "1분 자기진단 체크리스트",
      "상담 전 질문 템플릿",
      "회복 기간 계획표"
    ],
    primary: "체크리스트 받기",
    secondary: "상담 준비 가이드 보기",
    primaryHref: "./landing/clinic-selection.html",
    secondaryHref: "./landing/safety-recovery.html"
  },
  legal: [
    "이 페이지는 외부 특정 서비스의 화면/텍스트/이미지 원문을 직접 복제하지 않습니다.",
    "실제 운영 시에는 상표, 로고, 사진, 영상, 카피를 모두 자체 제작 또는 정식 라이선스로 교체하세요.",
    "법률 자문이 필요한 경우 공개 전 전문 변호사 검토를 권장합니다."
  ]
};
