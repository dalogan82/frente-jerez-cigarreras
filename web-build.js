// web-build.js
const fs = require("fs");
const path = require("path");

const sourceDir = path.resolve(__dirname);
const buildDir = path.resolve(__dirname, "dist");

// Archivos a copiar
const filesToCopy = ["manifest.json", "service-worker.js"];

filesToCopy.forEach((file) => {
  const src = path.join(sourceDir, file);
  const dest = path.join(buildDir, file);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copiado ${file} a /dist`);
  } else {
    console.warn(`⚠️ No se encontró ${file}`);
  }
});
