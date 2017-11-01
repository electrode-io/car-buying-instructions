"use strict";

const http = require("http");
const plugin = {};

/* eslint-disable no-console */
plugin.register = function(server, options, next) {
  server.route({
    method: "GET",
    path: "/vehicles",
    handler: (request, reply) => {
      const requestOptions = {
        host: "localhost",
        path: "/vehicles",
        port: "8000"
      };

      const req = http.get(requestOptions, res => {
        const bodyChunks = [];
        res
          .on("data", chunk => {
            bodyChunks.push(chunk);
          })
          .on("end", () => {
            const body = Buffer.concat(bodyChunks);
            const results = JSON.parse(body);
            return reply(results);
          });
      });

      req.on("error", e => {
        console.log(`ERROR: ${e.message}`);
        return reply(`ERROR: ${e.message}`);
      });
    }
  });

  next();
};

plugin.register.attributes = {
  name: "vehiclesPlugin",
  version: "0.0.1"
};

module.exports = plugin;
