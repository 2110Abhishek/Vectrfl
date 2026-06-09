const fs = require('fs');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(dest, data);
        resolve(data);
      });
    }).on('error', reject);
  });
}

async function main() {
  const html = await download('https://www.vectrfl.com/', 'd:/Vectrfl/index.original.html');
  console.log('HTML downloaded');
  
  const css = await download('https://www.vectrfl.com/_astro/apply.B-bC7KCE.css', 'd:/Vectrfl/style.css');
  console.log('CSS downloaded');
  
  const js = await download('https://www.vectrfl.com/_astro/CommonScripts.astro_astro_type_script_index_0_lang.CZTi642d.js', 'd:/Vectrfl/main.js');
  console.log('JS downloaded');
  
  let newHtml = html;
  
  // Replace relative URLs with absolute URLs
  newHtml = newHtml.replace(/(src|href)="\/([^"#]+)"/g, '$1="https://www.vectrfl.com/$2"');
  
  // Replace CSS
  newHtml = newHtml.replace(/<link rel="stylesheet" href="https:\/\/www\.vectrfl\.com\/_astro\/apply\.B-bC7KCE\.css">/g, '<link rel="stylesheet" href="style.css">');
  
  // Replace JS
  newHtml = newHtml.replace(/<script type="module" src="https:\/\/www\.vectrfl\.com\/_astro\/CommonScripts\.astro_astro_type_script_index_0_lang\.CZTi642d\.js"><\/script>/g, '<script type="module" src="main.js"></script>');

  fs.writeFileSync('d:/Vectrfl/index.html', newHtml);
  console.log('HTML updated and saved to index.html');
}

main().catch(console.error);
