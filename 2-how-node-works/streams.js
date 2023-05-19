const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1, Node will load the entire file in memory, then it will send the data
  // This solution becomes problematic when the file is large, and tons of requests are being made
  // Never this this code on production!
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  // Solution 2: Streams, suffers from backpressure, the data being read is much faster than the written response
  // We're streaming the text file, when one piece of the file is read we send it to the client using the
  // write method of the responsd stream.
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     // The response is a writable stream
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });

  //Solution 3 use the pipe function
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDest)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening");
});
