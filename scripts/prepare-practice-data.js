const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'C:\\Users\\Mahesh\\Desktop\\python-fundamentals-practice';
const DEST_DIR = path.join(__dirname, '..', 'public', 'practice-data');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function main() {
  console.log('Preparing practice data...');

  if (fs.existsSync(DEST_DIR)) {
    fs.rmSync(DEST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DEST_DIR, { recursive: true });

  const manifest = {
    batches: [],
    topicDrills: []
  };

  for (let i = 1; i <= 5; i++) {
    const batchName = `batch-0${i}`;
    const srcBatch = path.join(SOURCE_DIR, batchName);
    if (fs.existsSync(srcBatch)) {
      const destBatch = path.join(DEST_DIR, batchName);
      copyDirectory(srcBatch, destBatch);
      manifest.batches.push({
        id: batchName,
        title: `Batch ${i}`,
        path: `/practice-data/${batchName}`
      });
      console.log(`Copied ${batchName}`);
    }
  }

  const srcDrills = path.join(SOURCE_DIR, 'topic-drills');
  if (fs.existsSync(srcDrills)) {
    const destDrills = path.join(DEST_DIR, 'topic-drills');
    copyDirectory(srcDrills, destDrills);
    
    const files = fs.readdirSync(srcDrills).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const name = file.replace('.md', '');
      const title = name.split('-').slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      manifest.topicDrills.push({
        id: name,
        title: title,
        path: `/practice-data/topic-drills/${file}`
      });
    }
    console.log(`Copied topic-drills`);
  }

  fs.writeFileSync(
    path.join(DEST_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('Practice data preparation complete! Manifest written.');
}

main().catch(console.error);
