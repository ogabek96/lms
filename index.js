const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.on('error', (error) => console.error(error));

server.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
