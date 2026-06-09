const fs = require('fs');
const path = require('path');

function removeLoader(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                removeLoader(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Remove the loader
            const loaderIndex = content.indexOf('<div id="loader"');
            if (loaderIndex !== -1) {
                content = content.substring(0, loaderIndex) + '</body></html>';
            }
            
            // Also ensure no opacity 0 is hiding elements
            content = content.replace(/opacity:\s*0/g, 'opacity: 1');
            
            fs.writeFileSync(fullPath, content);
            console.log(`Removed loader from ${fullPath}`);
        }
    }
}

removeLoader('d:/Vectrfl');
