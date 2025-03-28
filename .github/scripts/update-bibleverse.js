const fs = require("fs");

// Lê os versículos do JSON externo
const verses = JSON.parse(fs.readFileSync("data/bible-verses.json", "utf8"));

const todayIndex = new Date().getDate() % verses.length;
const verse = verses[todayIndex];

const content = `📖 _"${verse.text}"_  \n— ${verse.ref} (NIV)\n\n🔁 _A new verse every day — come back tomorrow!_`;

const readme = fs.readFileSync("README.md", "utf8");
const updated = readme.replace(
  /<!--START_SECTION:bibleverse-->[\s\S]*<!--END_SECTION:bibleverse-->/,
  `<!--START_SECTION:bibleverse-->\n${content}\n<!--END_SECTION:bibleverse-->`
);

fs.writeFileSync("README.md", updated);
