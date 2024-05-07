var http = require('http');
var url = require('url');
var querystring = require('querystring');
const PORT=3001;
function onRequest(req, res) {
    var path = url.parse(req.url).pathname;
    console.log('Request for ' + path + ' received');
    
    var query = url.parse(req.url).query;
    console.log(query);
    var params = querystring.parse(query);
    var username = params["username"];
    var id = params["id"];
    var branch = params["branch"];
    var mobileNo = params["phno"];
    var gender = params["gender"];
    var branchadd = params["branchadd"];

    var htmlResponse = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>User Details</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }

                .container {
                    max-width: 500px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                h2 {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }

                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>User Details</h2>
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
            </div>
        </body>
        </html>
    `;

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(htmlResponse);
    res.end();
}

http.createServer(onRequest).listen(PORT);
console.log(`Server is running on http://localhost:${PORT}`);
