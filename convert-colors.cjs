const fs = require('fs');

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);
    return `${r} ${g} ${b}`;
}

let indexCss = fs.readFileSync('src/index.css', 'utf8');
indexCss = indexCss.replace(/--color-([a-zA-Z0-9-]+):\s*#([0-9a-fA-F]{3,6})/g, (match, p1, p2) => {
    return `--color-${p1}: ${hexToRgb(p2)}`;
});
fs.writeFileSync('src/index.css', indexCss);

let tailwind = fs.readFileSync('tailwind.config.js', 'utf8');
tailwind = tailwind.replace(/"var\(--color-([a-zA-Z0-9-]+)\)"/g, '"rgb(var(--color-$1) / <alpha-value>)"');
fs.writeFileSync('tailwind.config.js', tailwind);

console.log('Converted colors to RGB triplets and updated tailwind config.');
