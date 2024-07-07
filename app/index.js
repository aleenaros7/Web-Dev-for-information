const http = require("http");
const app = require("./app");
 const server = http.createServer(app);
const path = require('path')
const fs = require('fs');
const express = require("express");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 
server.listen(port, () => {
  app.use('/upload', express.static('upload'));
  console.log(`Server running on port ${port}`);
});