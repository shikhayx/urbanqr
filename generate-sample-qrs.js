import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const qrList = [
  { name: 'sample_SL-1024.png', text: 'https://urbanqr.gov.in/asset/SL-1024', label: 'Streetlight SL-1024' },
  { name: 'sample_WB-3109.png', text: 'https://urbanqr.gov.in/asset/WB-3109', label: 'Garbage Bin WB-3109' },
  { name: 'sample_BS-1044.png', text: 'https://urbanqr.gov.in/asset/BS-1044', label: 'Bus Stop BS-1044' },
  { name: 'sample_PT-0518.png', text: 'https://urbanqr.gov.in/asset/PT-0518', label: 'Public Toilet PT-0518' },
  { name: 'sample_WP-7712.png', text: 'https://urbanqr.gov.in/asset/WP-7712', label: 'Water Point WP-7712' },
  { name: 'sample_PK-4421.png', text: 'https://urbanqr.gov.in/asset/PK-4421', label: 'Park Equipment PK-4421' },
];

const outDir = path.resolve('public/sample-qr');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function generate() {
  for (const item of qrList) {
    const filePath = path.join(outDir, item.name);
    await QRCode.toFile(filePath, item.text, {
      width: 500,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
    console.log(`Generated: ${filePath}`);
  }
}

generate().catch(console.error);
