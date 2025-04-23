const xlsx = require('xlsx');
const fs = require('fs');

// Cargar el archivo Excel
const workbook = xlsx.readFile('./public/translations.xlsx');

// Leer la primera hoja del archivo
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Convertir la hoja en formato JSON
const jsonData = xlsx.utils.sheet_to_json(sheet);

// Crear un objeto para almacenar las traducciones
const translations = { en: {}, es: {} };

// Recorrer cada fila del archivo Excel y generar el JSON
jsonData.forEach((row) => {
  const pageId = row['Page ID'];
  const key = row['Key'];
  const esValue = row['es'];
  const enValue = row['en'];

  // Asegurarnos de que la página existe en el JSON
  if (!translations['es'][pageId]) translations['es'][pageId] = {};
  if (!translations['en'][pageId]) translations['en'][pageId] = {};

  // Asignar las traducciones
  translations['es'][pageId][key] = esValue;
  translations['en'][pageId][key] = enValue;
});

// Guardar el JSON resultante en un archivo
fs.writeFileSync('./public/translations.json', JSON.stringify(translations, null, 2));

console.log('Traducciones exportadas a translations.json');
