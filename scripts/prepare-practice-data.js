/**
 * ⚠️ DISABLED BY DEFAULT — legacy script.
 *
 * This script previously DELETED public/practice-data and re-copied it from an
 * old external source (`python-fundamentals-practice`, batches named batch-01..
 * batch-05) that no longer matches the current structure:
 *
 *   - phases are now phase-1-foundation .. phase-4-oop
 *   - manifest.json is hand-maintained (batches + files arrays)
 *   - per-phase projects.md files were added by hand
 *
 * Running the old version would silently wipe ALL of that. The current version
 * is a safe "merge only" copier:
 *   - it NEVER deletes existing files
 *   - it only copies files that do not already exist in the destination
 *   - it must be invoked explicitly with the SKIP_LEGACY_CHECK=1 env var,
 *     otherwise it exits with a warning
 *
 * Usage (from repo root):
 *   $env:SKIP_LEGACY_CHECK=1; node scripts/prepare-practice-data.js
 */
const fs = require('fs');
const path = require('path');

const LEGACY_SOURCE_DIR = 'C:\\Users\\Mahesh\\Desktop\\python-fundamentals-practice';
const DEST_DIR = path.join(__dirname, '..', 'public', 'practice-data');

if (process.env.SKIP_LEGACY_CHECK !== '1') {
  console.error(
    `Refusing to run: this legacy script targets "${LEGACY_SOURCE_DIR}" which does\n` +
    `not match the current phase-* layout in public/practice-data.\n` +
    `It will NOT delete anything, but it also has nothing to merge unless that\n` +
    `source folder matches your current phases.\n` +
    `Read the header of this file before re-enabling (SKIP_LEGACY_CHECK=1).`
  );
  process.exit(1);
}

if (!fs.existsSync(LEGACY_SOURCE_DIR)) {
  console.error(`Source directory not found: ${LEGACY_SOURCE_DIR}. Nothing to do.`);
  process.exit(1);
}

// Merge-only copy: never overwrite, never delete.
function mergeCopy(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  const copied = [];
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copied.push(...mergeCopy(srcPath, destPath));
    } else if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
      copied.push(entry.name);
    }
  }
  return copied;
}

function main() {
  console.log('Legacy merge mode: copying ONLY files missing from the destination.');
  let total = 0;
  for (const batch of fs.readdirSync(LEGACY_SOURCE_DIR, { withFileTypes: true })) {
    if (!batch.isDirectory()) continue;
    const copied = mergeCopy(path.join(LEGACY_SOURCE_DIR, batch.name), path.join(DEST_DIR, batch.name));
    total += copied.length;
    if (copied.length) console.log(`${batch.name}: +${copied.length} file(s) added`);
  }
  console.log(`Done. ${total} file(s) added, 0 modified, 0 deleted.`);
  console.log('NOTE: manifest.json is hand-maintained and must be updated manually for new files.');
}

main();