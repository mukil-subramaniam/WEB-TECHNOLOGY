const http = require("http");
const querystring = require("querystring");
const { MongoClient } = require("mongodb");


const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

try {
    client.connect();
    console.log("Connected to MongoDB...");
} catch (error) {
    console.log(`Error Connecting to MongoDB: ${error}`);
}

const database = client.db("Detail");
const collection = database.collection("user");

const reqHandler = async (req, res) => {
    const path = req.url;

    let query = "";

    req.on("data", chunk => {
        query += chunk;
    });

    req.on("end", async () => {
        const params = querystring.parse(query);

        let htmlResponse = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Server Response</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f8f9fa;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: #007bff;
                        color: #fff;
                    }
                    h1 {
                        text-align: center;
                        color: #007bff;
                    }
                </style>
            </head>
            <body>
                <div class="container">
        `;

        let statusCode = 200;

        switch (path) {
            case "/insert":
                htmlResponse += `<h1>Data Inserted Successfully</h1>`;
                insert(params);
                break;
            case "/view":
                htmlResponse += `<h1>View Data</h1>`;
                htmlResponse += await view();
                break;
            case "/delete":
                htmlResponse += `<h1>Data Deleted Successfully</h1>`;
                delete_(params);
                break;
            case "/update":
                htmlResponse += `<h1>Data Updated Successfully</h1>`;
                update(params);
                break;
            default:
                statusCode = 404;
                htmlResponse += `<h1>404 Page Not Found</h1>`;
                break;
        }
        htmlResponse += `
                </div>
            </body>
            </html>
        `;

        res.writeHead(statusCode, { "Content-Type": "text/html" });
        res.end(htmlResponse);
    });
};


const insert = params => {
    collection.insertOne(params);
};


const view = async () => {
    let htmlResponse = "<table>";
    htmlResponse += "<tr><th>Name</th><th>DOB</th><th>Register Number</th><th>Email</th><th>Phone</th><th>Year</th><th>Department</th></tr>";
    const cursor = collection.find({});
    const documents = await cursor.toArray();

    documents.forEach(document => {
        htmlResponse += `
            <tr>
                <td>${document["Name"]}</td>
                <td>${document["DOB"]}</td>
                <td>${document["Register Number"]}</td>
                <td>${document["Email"]}</td>
                <td>${document["Phone"]}</td>
                <td>${document["Year"]}</td>
                <td>${document["Department"]}</td>
            </tr>
        `;
    });

    htmlResponse += "</table>";

    return htmlResponse;
};

const update = params => {
    for (const key in params) {
        if (params[key] === "") {
            delete params[key];
        }
    }

    collection.updateOne({ "Register Number" : params["Register Number"] }, { $set: params });
};


const delete_ = params => {
    collection.deleteOne({ "Register Number" : params["Register Number"] });
};

http.createServer(reqHandler).listen(3001, () => console.log("Server is running on port 3001."));
