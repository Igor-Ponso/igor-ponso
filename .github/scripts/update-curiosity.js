const fs = require("fs");
const path = require("path");

// Caminho para os arquivos
const readmePath = path.join(__dirname, "../../", "README.md");
const curiositiesPath = path.join(__dirname, "../data/curiosities.json");

// Lê o README.md
let readme = fs.readFileSync(readmePath, "utf8");
const curiosities = JSON.parse(fs.readFileSync(curiositiesPath, "utf8"));

// Tokens delimitadores
const startToken = "<!--START_SECTION:curiosity-->";
const endToken = "<!--END_SECTION:curiosity-->";

// Extrai a curiosidade atual do README
const currentCuriosityMatch = readme.match(
  new RegExp(`${startToken}\\n🧠 (.*?)\\n${endToken}`)
);
const currentCuriosity = currentCuriosityMatch ? currentCuriosityMatch[1] : "";

// Sorteia uma nova curiosidade diferente da atual
let randomCuriosity;
do {
  randomCuriosity = curiosities[Math.floor(Math.random() * curiosities.length)];
} while (randomCuriosity === currentCuriosity);

// Atualiza a seção no README
const newContent = `${startToken}\n🧠 ${randomCuriosity}\n${endToken}`;
const updatedReadme = readme.replace(
  new RegExp(`${startToken}[\\s\\S]*?${endToken}`),
  newContent
);

fs.writeFileSync(readmePath, updatedReadme);
console.log("README updated with a new curiosity!");
