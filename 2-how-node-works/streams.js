const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1, Node will load the entire file in memory, then it will send the data
  // This solution becomes problematic when the file is large, and tons of requests are being made
  fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening");
});
