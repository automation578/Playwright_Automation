const fs = require('fs');
const path = require('path');

const resultsPath = path.join('test-results', 'results.json');
const outputPath = 'email-summary.html';

if (!fs.existsSync(resultsPath)) {
    fs.writeFileSync(outputPath, '<p><i>No results.json found.</i></p>');
    process.exit(0);
}

const data = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
const stats = data.stats || {};
const durationSec = Math.round((stats.duration || 0) / 1000);

const failingTests = [];
function walk(suite) {
    (suite.suites || []).forEach(walk);
    (suite.specs || []).forEach((spec) => {
        (spec.tests || []).forEach((test) => {
            const lastResult = (test.results || []).slice(-1)[0];
            if (lastResult && lastResult.status !== 'passed' && lastResult.status !== 'skipped') {
                failingTests.push(`${spec.file} :: ${spec.title}`);
            }
        });
    });
}
(data.suites || []).forEach(walk);

const failuresHtml = failingTests.length
    ? `<h3>Failing tests</h3><ul>${failingTests.map((t) => `<li>${t}</li>`).join('')}</ul>`
    : '';

const html = `
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
  <tr><th align="left">Passed</th><td>${stats.expected || 0}</td></tr>
  <tr><th align="left">Failed</th><td style="color:#c00;"><b>${stats.unexpected || 0}</b></td></tr>
  <tr><th align="left">Skipped</th><td>${stats.skipped || 0}</td></tr>
  <tr><th align="left">Flaky</th><td>${stats.flaky || 0}</td></tr>
  <tr><th align="left">Duration</th><td>${durationSec} s</td></tr>
</table>
${failuresHtml}
`;

fs.writeFileSync(outputPath, html);
console.log(`Wrote ${outputPath}`);
