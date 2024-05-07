var http = require('http');
var querystring = require('querystring');
const PORT=3000;

function onRequest(req, res) {
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      var params = querystring.parse(body);
      var username = params["username"];
      var id = params["id"];
      var branch = params["branch"];
      var mobileNo = params["phno"];
      var gender = params["gender"];
      var branchadd = params["branchadd"];

      
      var htmlResponse = `
        <html>
        <head>
        <title>Employee Details</title>
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
        
        table {
          font-family: Arial, sans-serif;
          border-collapse: collapse;
          width: 50%;
          margin: 20px auto;
          border: 1px solid #ddd;
        }
        td, th {
          border: 1px solid #ddd;
          padding: 10px;
        }
        th {
          background-color: #f2f2f2;
        }
  
        h2{
          text-align:center;
          color:#333;
          padding:20px;
        }
        
        </style>
        </head>
        <body>
        <h2>Employee Details</h2>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Username</td>
            <td>${username}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>${id}</td>
          </tr>
          <tr>
            <td>Branch</td>
            <td>${branch}</td>
          </tr>
          <tr>
            <td>Mobile No</td>
            <td>${mobileNo}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>${gender}</td>
          </tr>
          <tr>
            <td>Branch Address</td>
            <td>${branchadd}</td>
          </tr>
        </table>
        </body>
        </html>
      `;

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(htmlResponse);
      res.end();
    });
  } else {
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('Method not allowed');
  }
}

http.createServer(onRequest).listen(PORT);
console.log(`Server is running on http://localhost:${PORT}`);
