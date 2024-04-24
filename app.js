const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!\n');
  // Log the BUILD_DATE environment variable
  res.write(`BUILD_DATE: ${process.env.BUILD_DATE || 'N/A'}\n`);
  res.end();
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
