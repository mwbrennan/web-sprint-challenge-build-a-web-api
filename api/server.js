const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const actionRouter = require('./actions/actions-router.js');
const projectRouter = require('./projects/projects-router.js');

server.use(express.json())

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

// server.get('/', (req, res) => {
//     res.json({ message: 'yo' });
//   });


module.exports = server;
