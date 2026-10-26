import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const htmlPath = path.join(rootDir, 'public', 'resume.html');
const pdfPath = path.join(rootDir, 'public', 'Aman_Sharma_Resume.pdf');

const edgeCandidates = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = edgeCandidates.find(p => fs.existsSync(p));
if (!browserPath) {
  console.error('No compatible browser found for PDF generation');
  process.exit(1);
}

console.log(`Using browser: ${browserPath}`);
const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
const cmd = `"${browserPath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" --no-pdf-header-footer "${fileUrl}"`;

console.log('Generating PDF...');
execSync(cmd, { stdio: 'inherit' });

// Patch PDF Title metadata so viewer tabs don't show "(anonymous)"
if (fs.existsSync(pdfPath)) {
  let buf = fs.readFileSync(pdfPath);
  let str = buf.toString('latin1');
  
  const titleNeedle = '/Title ((anonymous))';
  const newTitle = '/Title (Aman Sharma - Web Developer Resume)';
  
  if (str.includes(titleNeedle)) {
    str = str.replace(titleNeedle, newTitle);
    fs.writeFileSync(pdfPath, Buffer.from(str, 'latin1'));
    console.log('Successfully patched PDF title metadata to: Aman Sharma - Web Developer Resume');
  } else {
    console.log('PDF Title was already clean or has custom format.');
  }

  const stats = fs.statSync(pdfPath);
  console.log(`Resume PDF built: ${pdfPath} (${stats.size} bytes)`);
}
