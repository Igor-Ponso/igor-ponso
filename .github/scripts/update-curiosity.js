const fs = require("fs");
const path = require("path");

// Caminho para os arquivos
const readmePath = path.join(__dirname, "../../", "README.md");
const curiositiesPath = path.join(__dirname, "../data/curiosities.json");

// Lê o README.md
let readme = fs.readFileSync(readmePath, "utf8");

// Lê e parseia o JSON de curiosidades
const curiosities = JSON.parse(fs.readFileSync(curiositiesPath, "utf8"));

// Escolhe uma curiosidade aleatória
const randomCuriosity = curiosities[Math.floor(Math.random() * curiosities.length)];

// Expressões para marcar a seção
const startToken = "<!--START_SECTION:curiosity-->";
const endToken = "<!--END_SECTION:curiosity-->";

// Substitui o conteúdo entre os tokens
const newContent = `${startToken}\n🧠 ${randomCuriosity}\n${endToken}`;
const updatedReadme = readme.replace(
  new RegExp(`${startToken}[\\s\\S]*?${endToken}`),
  newContent
);

// Salva o novo conteúdo no README
fs.writeFileSync(readmePath, updatedReadme);
console.log("README updated with a new curiosity!");
