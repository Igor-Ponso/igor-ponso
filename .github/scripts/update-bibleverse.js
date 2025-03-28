const fs = require("fs");
const path = require("path");

// Caminho para os arquivos
const readmePath = path.join(__dirname, "../../", "README.md");
const bibleVersesPath = path.join(__dirname, "../data/bible-verses.json");
// Lê o README.md
let readme = fs.readFileSync(readmePath, "utf8");

// Lê e parseia o JSON de versículos
const verses = JSON.parse(fs.readFileSync(bibleVersesPath, "utf8"));

// Escolhe um versículo aleatório
const randomVerse = verses[Math.floor(Math.random() * verses.length)];

// Tokens para delimitar a seção
const startToken = "<!--START_SECTION:bible-verse-->";
const endToken = "<!--END_SECTION:bible-verse-->";

// Novo conteúdo
const newContent = `${startToken}\n📖 ${randomVerse.text} — *${randomVerse.ref}*\n${endToken}`;
const updatedReadme = readme.replace(
  new RegExp(`${startToken}[\\s\\S]*?${endToken}`),
  newContent
);

// Escreve no README
fs.writeFileSync(readmePath, updatedReadme);
console.log("README updated with a new Bible verse!");
