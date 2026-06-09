const fs = require('fs');
const path = require('path');

function fixHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                fixHtmlFiles(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Remove opacity:0 and complex transforms from inline styles
            content = content.replace(/style="opacity:\s*0[^"]*"/g, '');
            content = content.replace(/style="opacity:0[^"]*"/g, '');
            
            // Also, remove the preload class from html tag to ensure everything displays immediately
            content = content.replace(/class="preload"/g, '');
            
            // Just in case, replace any remaining opacity: 0 that might use single quotes
            content = content.replace(/style='opacity:\s*0[^']*'/g, '');
            
            fs.writeFileSync(fullPath, content);
            console.log(`Fixed ${fullPath}`);
        }
    }
}

fixHtmlFiles('d:/Vectrfl');
