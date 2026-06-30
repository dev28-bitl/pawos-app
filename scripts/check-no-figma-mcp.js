const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const TARGET = 'figma.com/api/mcp/' + 'asset';
const ALLOWED_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.md']);
const SKIP_DIRS = new Set([
  '.git',
  'node_modules',
  'android/build',
  'android/app/build',
  'ios/Pods',
  '.bundle',
]);

function shouldSkip(relPath) {
  return Array.from(SKIP_DIRS).some((skip) => {
    return relPath === skip || relPath.startsWith(skip + path.sep);
  });
}

function walk(dir, rel = '') {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryRel = rel ? path.join(rel, entry.name) : entry.name;
    const entryAbs = path.join(dir, entry.name);

    if (shouldSkip(entryRel)) {
      continue;
    }

    if (entry.isDirectory()) {
      out.push(...walk(entryAbs, entryRel));
      continue;
    }

    if (!ALLOWED_EXT.has(path.extname(entry.name))) {
      continue;
    }

    out.push(entryAbs);
  }

  return out;
}

const offenders = [];
for (const file of walk(ROOT)) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes(TARGET)) {
    offenders.push(path.relative(ROOT, file));
  }
}

if (offenders.length > 0) {
  console.error('Blocked: detected forbidden Figma MCP asset URLs in:');
  for (const file of offenders) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log('OK: no Figma MCP asset URLs found.');
