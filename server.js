const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DIR = __dirname;

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (url === '/document.pdf' || url.endsWith('.pdf')) {
    const pdfPath = path.join(DIR, 'document.pdf');
    if (fs.existsSync(pdfPath)) {
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline'
      });
      return fs.createReadStream(pdfPath).pipe(res);
    }
  }

  // Any other route: serve index.html
  const indexPath = path.join(DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return fs.createReadStream(indexPath).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
  console.log("- Direct PDF link: http://localhost:" + PORT + "/document.pdf");
  console.log("- Verification link: http://localhost:" + PORT + "/noc/E_Certificate/NOC26CS39S55341344003140532");
});
