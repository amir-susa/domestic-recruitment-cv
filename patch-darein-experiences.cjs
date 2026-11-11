const fs = require('fs');
const path = require('path');
const srcDir = path.join(process.cwd(), 'src');
if (!fs.existsSync(srcDir)) { console.error('Run this from the project root.'); process.exit(1); }
const AR_COUNTRY = '\u062F\u0648\u0644\u0629';
const AR_PERIOD = '\u0627\u0644\u0645\u062F\u0629';
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/^DareinHtmlTemplate.*\.tsx$/.test(e.name)) out.push(p);
  }
  return out;
}
function countOf(t, s) { return t.split(s).length - 1; }
function replaceOnce(t, find, repl, label) {
  if (countOf(t, find) !== 1) throw new Error('anchor not found exactly once: ' + label);
  const i = t.indexOf(find);
  return t.slice(0, i) + repl + t.slice(i + find.length);
}
function patch(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const crlf = raw.includes('\r\n');
  let t = raw.replace(/\r\n/g, '\n');
  if (t.includes('experienceRows')) return 'already patched';
  if (!t.includes('const firstExperience = Array.isArray(source.previousExperiences)')) return 'skipped (not the form-driven Darein template)';
  const typeAnchor = '  experience: { country: string; period: string };\n';
  t = replaceOnce(t, typeAnchor,
    typeAnchor + '  /** All previous experiences (max 3). `experience` mirrors the first one. */\n  experiences?: Array<{ country: string; period: string }>;\n', 'type');
  const helper =
'const formatExperiencePeriod = (exp: any): string => {\n' +
'  const given = String((exp && exp.period) || "").trim();\n' +
'  if (given) return given;\n' +
'  const y = parseInt(String((exp && exp.years) || "0"), 10) || 0;\n' +
'  const m = parseInt(String((exp && exp.months) || "0"), 10) || 0;\n' +
'  const parts: string[] = [];\n' +
'  if (y > 0) parts.push(y + " " + (y === 1 ? "Year" : "Years"));\n' +
'  if (m > 0) parts.push(m + " " + (m === 1 ? "Month" : "Months"));\n' +
'  return parts.join(", ");\n' +
'};\n\n';
  t = replaceOnce(t, 'const toArabicDigits = ', helper + 'const toArabicDigits = ', 'helper');
  t = replaceOnce(t,
'  const firstExperience = Array.isArray(source.previousExperiences)\n    ? source.previousExperiences[0]\n    : undefined;\n',
'  const experienceList: Array<{ country: string; period: string }> = (\n' +
'    Array.isArray(source.previousExperiences) ? source.previousExperiences : []\n' +
'  )\n' +
'    .map((exp: any) => ({ country: String((exp && exp.country) || "").trim(), period: formatExperiencePeriod(exp) }))\n' +
'    .filter((exp: { country: string; period: string }) => exp.country !== "" || exp.period !== "")\n' +
'    .slice(0, 3);\n' +
'  const firstExperience = experienceList[0];\n', 'firstExperience');
  const re = /^( *)experience: \{\n *country: firstExperience\?\.country[\s\S]*?\n\1\},\n/m;
  const matches = t.match(new RegExp(re.source, 'gm')) || [];
  if (matches.length !== 1) throw new Error('mapped experience block not found exactly once');
  t = t.replace(re, function (m0, ind) {
    return ind + 'experience: {\n' +
      ind + '  country: firstExperience?.country ?? source.experience?.country ?? "",\n' +
      ind + '  period: firstExperience?.period ?? source.experience?.period ?? "",\n' +
      ind + '},\n' +
      ind + 'experiences: experienceList,\n';
  });
  t = replaceOnce(t, '  const detailCols = "34fr 38fr 34fr";\n',
'  const experienceRows: Array<{ country: string; period: string }> =\n' +
'    d.experiences && d.experiences.length > 0\n' +
'      ? d.experiences\n' +
'      : [{ country: d.experience.country, period: d.experience.period }];\n' +
'  const expCount = experienceRows.length;\n' +
'  const expCols = "21mm repeat(" + expCount + ", minmax(0, 1fr)) 13mm";\n' +
'  const detailCols = "34fr 38fr 34fr";\n', 'rows');
  const secIdx = t.indexOf('<SectionHead en="PREVIOUS EXPERIENCE"');
  if (secIdx < 0) throw new Error('PREVIOUS EXPERIENCE heading not found');
  const tblStart = t.indexOf('<div className="drn-table">', secIdx);
  const marker = AR_PERIOD + '</div>';
  const pIdx = t.indexOf(marker, tblStart);
  if (tblStart < 0 || pIdx < 0) throw new Error('old experience table not found');
  const tail = /^\s*<\/div>\s*<\/div>/.exec(t.slice(pIdx + marker.length));
  if (!tail) throw new Error('old experience table end not found');
  const tblEnd = pIdx + marker.length + tail[0].length;
  const oldBlock = t.slice(tblStart, tblEnd);
  if (oldBlock.length > 1800 || oldBlock.indexOf('COUNTRY') < 0 || oldBlock.indexOf('PERIOD') < 0) throw new Error('old experience block looks wrong');
  const L = 18;
  const sp = (n) => ' '.repeat(n);
  const newBlock =
'<div className="drn-table">\n' +
sp(L-2) + '{expCount <= 1 ? (\n' +
sp(L) + '<>\n' +
sp(L+2) + '<div className="drn-row" style={{ gridTemplateColumns: "26fr 66fr 14fr", height: "7mm" }}>\n' +
sp(L+4) + '<div className="drn-cell drn-label">COUNTRY</div>\n' +
sp(L+4) + '<div className="drn-cell drn-value-left drn-value">{experienceRows[0].country}</div>\n' +
sp(L+4) + '<div className="drn-cell drn-label drn-ar" lang="ar">' + AR_COUNTRY + '</div>\n' +
sp(L+2) + '</div>\n' +
sp(L+2) + '<div className="drn-row" style={{ gridTemplateColumns: "26fr 66fr 14fr", height: "7mm" }}>\n' +
sp(L+4) + '<div className="drn-cell drn-label">PERIOD</div>\n' +
sp(L+4) + '<div className="drn-cell drn-value-left drn-value">{experienceRows[0].period}</div>\n' +
sp(L+4) + '<div className="drn-cell drn-label drn-ar" lang="ar">' + AR_PERIOD + '</div>\n' +
sp(L+2) + '</div>\n' +
sp(L) + '</>\n' +
sp(L-2) + ') : (\n' +
sp(L) + '<>\n' +
sp(L+2) + '<div className="drn-row" style={{ gridTemplateColumns: expCols, minHeight: "7mm" }}>\n' +
sp(L+4) + '<div className="drn-cell drn-label">COUNTRY</div>\n' +
sp(L+4) + '{experienceRows.map((e, i) => (\n' +
sp(L+6) + '<div key={"c" + i} className={"drn-cell drn-value drn-exp drn-exp-" + expCount}>{e.country}</div>\n' +
sp(L+4) + '))}\n' +
sp(L+4) + '<div className="drn-cell drn-label drn-ar" lang="ar">' + AR_COUNTRY + '</div>\n' +
sp(L+2) + '</div>\n' +
sp(L+2) + '<div className="drn-row" style={{ gridTemplateColumns: expCols, minHeight: "7mm" }}>\n' +
sp(L+4) + '<div className="drn-cell drn-label">PERIOD</div>\n' +
sp(L+4) + '{experienceRows.map((e, i) => (\n' +
sp(L+6) + '<div key={"p" + i} className={"drn-cell drn-value drn-exp drn-exp-" + expCount}>{e.period}</div>\n' +
sp(L+4) + '))}\n' +
sp(L+4) + '<div className="drn-cell drn-label drn-ar" lang="ar">' + AR_PERIOD + '</div>\n' +
sp(L+2) + '</div>\n' +
sp(L) + '</>\n' +
sp(L-2) + ')}\n' +
sp(L-4) + '</div>';
  t = t.slice(0, tblStart) + newBlock + t.slice(tblEnd);
  const cssAnchor = '.drn-passport-box { width: 131.6mm; height: 90mm; margin: 0 auto; }\n';
  t = replaceOnce(t, cssAnchor,
    cssAnchor +
    '/* previous experience: several countries side by side (same total height) */\n' +
    '.drn-exp { padding: 0.5mm 1mm; line-height: 1.05; overflow-wrap: anywhere; }\n' +
    '.drn-exp-2 { font-size: 10.5pt; }\n' +
    '.drn-exp-3 { font-size: 8.5pt; }\n', 'css');
  if (!fs.existsSync(file + '.bak')) fs.copyFileSync(file, file + '.bak');
  fs.writeFileSync(file, crlf ? t.replace(/\n/g, '\r\n') : t, 'utf8');
  return 'patched (backup: ' + path.basename(file) + '.bak)';
}
const files = walk(srcDir, []);
if (files.length === 0) console.log('No DareinHtmlTemplate*.tsx found under src.');
for (const f of files) {
  try { console.log(path.relative(process.cwd(), f) + ' -> ' + patch(f)); }
  catch (e) { console.log(path.relative(process.cwd(), f) + ' -> FAILED, file untouched: ' + e.message); }
}