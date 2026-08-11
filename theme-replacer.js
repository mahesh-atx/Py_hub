const fs = require('fs');
const path = require('path');

const replacements = {
  '#1e1e1e': 'var(--vscode-bg)',
  '#252526': 'var(--vscode-sidebar-bg)',
  '#2b2b2b': 'var(--vscode-border)',
  '#333333': 'var(--vscode-hover)',
  '#3c3c3c': 'var(--vscode-input)',
  '#007acc': 'var(--vscode-accent)',
  '#007fd4': 'var(--vscode-accent)',
  '#cccccc': 'var(--vscode-text)',
  '#858585': 'var(--vscode-text-muted)'
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [hex, variable] of Object.entries(replacements)) {
        const regex = new RegExp(hex, 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, variable);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Done replacing colors.');
