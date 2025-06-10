// js/ocr.js
// Tesseract.js をインポート（CDN or npm bundle を参照）
export async function ocrProcess(file) {
  const { createWorker } = Tesseract;
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const {
    data: { text }
  } = await worker.recognize(file);
  await worker.terminate();
  return text.trim();
}
