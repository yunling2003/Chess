var http,
  fs,
  url,
  path,
  mime;

http = require("http");
fs = require("fs");
url = require("url");
path = require("path");
mime = require("mime");

function start() {
  http.createServer(function (req, res) {
    var fsPath,
      fileName,
      contentType;

    fileName = url.parse(req.url).pathname;
    if (fileName === "/") {
      fileName = "/login.htm";
    }
    //console.log(fileName);
    contentType = mime.lookup(fileName);
    fsPath = path.resolve(__dirname, "../../Chess", fileName.substring(1, fileName.length));
    //console.log(fsPath);
    fs.readFile(fsPath, function (err, data) {
      if (err) {
        res.end("404 Page Not Found!");
      }

      res.writeHead(200, {'Content-Type': contentType});
      if (contentType.indexOf("image") > -1) {
        res.end(data, "binary");
      } else {
        res.end(data.toString());
      }
    });
  }).listen(8888);
}

exports.start = start;