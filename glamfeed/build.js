const fs = require("fs");

// Build the HTML as array of strings to avoid template literal issues
const parts = [];

parts.push("<!DOCTYPE html>");
parts.push("<html lang='ko'>");
parts.push("<head>");
parts.push("<meta charset='UTF-8'>");
parts.push("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
parts.push("<title>글램톡 - 성형시술 커뮤니티</title>");
parts.push("<link rel='preconnect' href='https://fonts.googleapis.com'>");
parts.push("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
parts.push("<link href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,700;1,600&display=swap' rel='stylesheet'>");
parts.push("<style>");
parts.push("STYLE_PLACEHOLDER");
parts.push("</style>");
parts.push("</head>");
parts.push("<body>BODY_PLACEHOLDER</body>");
parts.push("</html>");

const html = parts.join("\n");
fs.writeFileSync("index.html", html, "utf8");
console.log("Written", html.length, "chars");
