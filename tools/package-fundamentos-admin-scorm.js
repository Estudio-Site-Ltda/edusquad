const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const outputDir = path.join(
  root,
  'squads',
  'fundamentos-administracao-pequenos-negocios',
  'output',
  '2026-06-01-apostila'
);

const packages = [
  {
    source: 'slides-capitulo-01',
    dir: 'scorm-capitulo-01',
    zip: 'fundamentos-administracao-capitulo-01-scorm-1.2.zip',
    id: 'fundamentos-administracao-capitulo-01',
    title: 'Fundamentos de Administracao para Pequenos Negocios - Capitulo 1',
  },
  {
    source: 'slides-capitulo-02',
    dir: 'scorm-capitulo-02',
    zip: 'fundamentos-administracao-capitulo-02-scorm-1.2.zip',
    id: 'fundamentos-administracao-capitulo-02',
    title: 'Fundamentos de Administracao para Pequenos Negocios - Capitulo 2',
  },
  {
    source: 'slides-capitulo-03',
    dir: 'scorm-capitulo-03',
    zip: 'fundamentos-administracao-capitulo-03-scorm-1.2.zip',
    id: 'fundamentos-administracao-capitulo-03',
    title: 'Fundamentos de Administracao para Pequenos Negocios - Capitulo 3',
  },
  {
    source: 'slides-capitulo-04',
    dir: 'scorm-capitulo-04',
    zip: 'fundamentos-administracao-capitulo-04-scorm-1.2.zip',
    id: 'fundamentos-administracao-capitulo-04',
    title: 'Fundamentos de Administracao para Pequenos Negocios - Capitulo 4',
  },
  {
    source: 'slides-capitulo-05',
    dir: 'scorm-capitulo-05',
    zip: 'fundamentos-administracao-capitulo-05-scorm-1.2.zip',
    id: 'fundamentos-administracao-capitulo-05',
    title: 'Fundamentos de Administracao para Pequenos Negocios - Capitulo 5',
  },
  {
    source: 'slides-capitulo-06',
    dir: 'scorm-capitulo-06',
    zip: 'fundamentos-administracao-capitulo-06-scorm-1.2.zip',
    id: 'fundamentos-administracao-capitulo-06',
    title: 'Fundamentos de Administracao para Pequenos Negocios - Capitulo 6',
  },
  {
    source: 'slides-capitulo-07',
    dir: 'scorm-capitulo-07',
    zip: 'fundamentos-administracao-capitulo-07-scorm-1.2.zip',
    id: 'fundamentos-administracao-capitulo-07',
    title: 'Fundamentos de Administracao para Pequenos Negocios - Capitulo 7',
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function assertInside(parent, target) {
  const rel = path.relative(parent, target);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error(`Unsafe target outside output dir: ${target}`);
  }
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const entry of fs.readdirSync(src)) {
      if (entry === 'slide.html') continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function walkFiles(dir, base = dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      files.push(...walkFiles(full, base));
    } else {
      files.push(path.relative(base, full).replace(/\\/g, '/'));
    }
  }
  return files.sort((a, b) => a.localeCompare(b));
}

function xmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function manifest(pkg, files) {
  const fileTags = files
    .filter((file) => file !== 'imsmanifest.xml')
    .map((file) => `      <file href="${xmlEscape(file)}"/>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${xmlEscape(pkg.id)}"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="org_main">
    <organization identifier="org_main">
      <title>${xmlEscape(pkg.title)}</title>
      <item identifier="item_main" identifierref="res_main">
        <title>${xmlEscape(pkg.title)}</title>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="res_main"
              type="webcontent"
              adlcp:scormtype="sco"
              href="index.html">
${fileTags}
    </resource>
  </resources>
</manifest>
`;
}

function readme(pkg) {
  return `SCORM 1.2 package
Course: Fundamentos de Administracao para Pequenos Negocios
Module: ${pkg.title}

Upload the ZIP file directly to an LMS that supports SCORM 1.2.

Tracking implemented:
- cmi.core.lesson_status=completed on the final slide
- cmi.core.lesson_location for resume
- cmi.suspend_data for interaction state
- cmi.core.score.raw for the formative quiz
`;
}

function psQuote(value) {
  return `'${value.replace(/'/g, "''")}'`;
}

function zipPackage(packageDir, zipPath) {
  const command = [
    "$ErrorActionPreference='Stop'",
    `$source = Join-Path ${psQuote(packageDir)} '*'`,
    `Compress-Archive -Path $source -DestinationPath ${psQuote(zipPath)} -Force`,
  ].join('; ');
  execFileSync('powershell', ['-NoProfile', '-Command', command], { stdio: 'inherit' });
}

function buildPackage(pkg) {
  const sourceDir = path.join(outputDir, pkg.source);
  const packageDir = path.join(outputDir, pkg.dir);
  const zipPath = path.join(outputDir, pkg.zip);
  assertInside(outputDir, packageDir);
  assertInside(outputDir, zipPath);

  if (!fs.existsSync(path.join(sourceDir, 'slide.html'))) {
    throw new Error(`Missing source slide.html: ${sourceDir}`);
  }

  fs.rmSync(packageDir, { recursive: true, force: true });
  fs.rmSync(zipPath, { force: true });
  ensureDir(packageDir);

  copyRecursive(sourceDir, packageDir);
  fs.copyFileSync(path.join(sourceDir, 'slide.html'), path.join(packageDir, 'index.html'));
  fs.writeFileSync(path.join(packageDir, 'README-SCORM.txt'), readme(pkg), 'utf8');

  const filesBeforeManifest = walkFiles(packageDir);
  fs.writeFileSync(path.join(packageDir, 'imsmanifest.xml'), manifest(pkg, filesBeforeManifest), 'utf8');
  zipPackage(packageDir, zipPath);

  return { packageDir, zipPath };
}

const result = packages.map(buildPackage);
console.log(JSON.stringify(result, null, 2));
