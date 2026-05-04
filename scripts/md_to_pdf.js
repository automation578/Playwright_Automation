const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const mdFile = path.resolve(__dirname, '../docs/Jenkins_Pipeline_Guide.md');
const pdfFile = path.resolve(__dirname, '../docs/Jenkins_Pipeline_Guide.pdf');

const markdown = fs.readFileSync(mdFile, 'utf8');

// Minimal markdown → HTML converter for the subset used in the doc
function mdToHtml(md) {
  return md
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^```[\w]*\n([\s\S]*?)```/gm, (_, code) =>
      `<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
    )
    .replace(/^\|(.+)\|$/gm, (line) => {
      const cells = line.split('|').slice(1, -1);
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
    })
    .replace(/(<tr>.*<\/tr>\n)+/gs, match => `<table>${match}</table>`)
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n)+/gs, match => `<ul>${match}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^(?!<[a-z])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: Segoe UI, Arial, sans-serif; font-size: 13px; color: #1a1a1a; max-width: 900px; margin: 0 auto; padding: 32px; }
  h1 { font-size: 24px; color: #003366; border-bottom: 2px solid #003366; padding-bottom: 6px; }
  h2 { font-size: 18px; color: #004488; border-bottom: 1px solid #cce0ff; padding-bottom: 4px; margin-top: 28px; }
  h3 { font-size: 15px; color: #005599; margin-top: 20px; }
  table { border-collapse: collapse; width: 100%; margin: 12px 0; }
  td, th { border: 1px solid #ccc; padding: 7px 10px; text-align: left; }
  tr:nth-child(odd) { background: #f5f8ff; }
  tr:first-child td { background: #003366; color: white; font-weight: bold; }
  code { background: #f0f0f0; padding: 1px 5px; border-radius: 3px; font-family: Consolas, monospace; font-size: 12px; }
  pre { background: #1e1e1e; color: #d4d4d4; padding: 14px; border-radius: 6px; overflow-x: auto; font-size: 12px; }
  pre code { background: none; color: inherit; padding: 0; }
  ul { padding-left: 22px; margin: 8px 0; }
  li { margin: 4px 0; }
  p { margin: 8px 0; line-height: 1.6; }
  hr { border: none; border-top: 1px solid #ddd; margin: 20px 0; }
</style>
</head>
<body>
${mdToHtml(markdown)}
</body>
</html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({
    path: pdfFile,
    format: 'A4',
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    printBackground: true
  });
  await browser.close();
  console.log('PDF saved to:', pdfFile);
})();
