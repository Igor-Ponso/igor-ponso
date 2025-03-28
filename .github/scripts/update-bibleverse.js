const fs = require("fs");
const path = require("path");

const readmePath = path.join(__dirname, "../../", "README.md");
const versesPath = path.join(__dirname, "../data/bible-verses.json");

let readme = fs.readFileSync(readmePath, "utf8");
const verses = JSON.parse(fs.readFileSync(versesPath, "utf8"));

const randomVerse = verses[Math.floor(Math.random() * verses.length)];

const startToken = "<!--START_SECTION:bibleverse-->";
const endToken = "<!--END_SECTION:bibleverse-->";

// Adiciona a linha de tema apenas se ela existir
const themeLine = randomVerse.theme
  ? `\n💡 _Today’s encouragement: **${randomVerse.theme}**_`
  : "";

const verseBlock = `${startToken}
📖 _"${randomVerse.text}"_  
— ${randomVerse.ref} (NIV)${themeLine}

🔁 _A new verse every day — come back tomorrow!_
${endToken}`;

const updatedReadme = readme.replace(
  new RegExp(`${startToken}[\\s\\S]*?${endToken}`),
  verseBlock
);

fs.writeFileSync(readmePath, updatedReadme);
console.log("README updated with a new Bible verse!");
