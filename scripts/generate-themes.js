const fs = require('fs');
const path = require('path');

const themes = [
  'All Hallows Eve', 'Amy', 'Birds of Paradise', 'Blackboard',
  'Clouds Midnight', 'Clouds', 'Cobalt', 'Dawn', 'Dominion Day',
  'Espresso Libre', 'GitHub Light', 'IDLE', 'Katzenmilch', 'LAZY',
  'MagicWB (Amiga)', 'Merbivore Soft', 'Merbivore', 'Monokai Bright',
  'Pastels on Dark', 'Slush and Poppies', 'Solarized-light', 'SpaceCadet',
  'Textmate (Mac Classic)', 'Tomorrow-Night-Bright', 'Tomorrow',
  'Upstream Sunburst', 'Xcode_default', 'Zenburnesque', 'iPlastic',
  'krTheme', 'monoindustrial'
];

function hexToRgb(hex) {
  let c = hex.substring(1);
  if(c.length === 3) c = c.split('').map(x => x+x).join('');
  if(c.length > 6) c = c.substring(0, 6);
  return {
    r: parseInt(c.substring(0, 2), 16),
    g: parseInt(c.substring(2, 4), 16),
    b: parseInt(c.substring(4, 6), 16)
  };
}

function rgbToHex({r, g, b}) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function lighten({r, g, b}, percent) {
  const amt = Math.round(2.55 * percent);
  return {
    r: Math.max(0, Math.min(255, r + amt)),
    g: Math.max(0, Math.min(255, g + amt)),
    b: Math.max(0, Math.min(255, b + amt))
  };
}

function getLuminance({r, g, b}) {
  return (0.299*r + 0.587*g + 0.114*b) / 255;
}

function camel(str) {
  return str.replace(/[-_ ]+(.)?/g, (_, c) => c ? c.toUpperCase() : '').replace(/[^a-zA-Z0-9]/g, '');
}

function kebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
}

let cssAppends = "";
let imports = "";
let defines = "";
let options = "";

themes.forEach(theme => {
  const file = 'src/lib/editor/themes/' + theme + '.json';
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  let bg = data.colors?.["editor.background"] || "#1e1e1e";
  let fg = data.colors?.["editor.foreground"] || "#cccccc";
  
  if (bg.length > 7) bg = bg.substring(0, 7);
  if (fg.length > 7) fg = fg.substring(0, 7);
  
  const rgbBg = hexToRgb(bg);
  const isLight = getLuminance(rgbBg) > 0.5;
  
  const sidebarBg = rgbToHex(lighten(rgbBg, isLight ? -5 : 5));
  const border = rgbToHex(lighten(rgbBg, isLight ? -15 : 10));
  const hover = rgbToHex(lighten(rgbBg, isLight ? -10 : 15));
  const input = rgbToHex(lighten(rgbBg, isLight ? 5 : -5));
  const accent = isLight ? "#007acc" : "#007acc";
  const textMuted = rgbToHex(lighten(hexToRgb(fg), isLight ? 30 : -30));
  
  const themeId = kebab(theme);
  const varName = camel(theme);
  
  cssAppends += `
[data-theme='${themeId}'] {
  color-scheme: ${isLight ? 'light' : 'dark'};
  --vscode-bg: ${bg};
  --vscode-sidebar-bg: ${sidebarBg};
  --vscode-border: ${border};
  --vscode-hover: ${hover};
  --vscode-input: ${input};
  --vscode-accent: ${accent};
  --vscode-text: ${fg};
  --vscode-text-muted: ${textMuted};
}
`;

  imports += `import ${varName} from "./themes/${theme}.json";\n`;
  defines += `  monaco.editor.defineTheme("${themeId}", ${varName} as any);\n`;
  options += `                    <option value="${themeId}">${theme}</option>\n`;
});

// Update globals.css
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/html,\nbody \{/, cssAppends + '\nhtml,\nbody {');
fs.writeFileSync('src/app/globals.css', css);

// Update themes.ts
let ts = fs.readFileSync('src/lib/editor/themes.ts', 'utf8');
ts = ts.replace('let themesRegistered = false;', imports + '\nlet themesRegistered = false;');
ts = ts.replace(/}\s*$/, defines + '}\n');
fs.writeFileSync('src/lib/editor/themes.ts', ts);

// Update SettingsEditor.tsx
let settings = fs.readFileSync('src/components/ide/SettingsEditor.tsx', 'utf8');
settings = settings.replace('</select>', options + '                  </select>');
fs.writeFileSync('src/components/ide/SettingsEditor.tsx', settings);

console.log('Successfully generated and integrated 31 themes');
