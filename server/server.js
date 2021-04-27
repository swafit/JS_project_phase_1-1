var bodyParser = require('body-parser');
var express = require('express');
var app = express();
const PORT =8081;

app.use(bodyParser.json());

app.get('/getComment', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    //file reading
    const fs = require('fs');
    try {
        //read entire file into string
        fs.readFile("./server/comments.txt", "utf8", function(err, contents) {
            try {
                //log contents and pass reply
                console.log(contents);
                res.send(contents);
            }
            catch {
                console.error("Something went wrong with the response");
            }
        });
    }
    catch {
        console.log("Error reading file");
        res.send("error, error")
    };
    return;
});

app.post('/getComment', function (req, res) {
    //Write to file
    var newComment = JSON.parse(req.body);
    console.log(req.body);
    const fs = require('fs');
    try{
        fs.appendFile("./server/comments.txt", "\n" + newComment, function(err) {
            if (err) throw err;
            console.log("Saved!");
        });
    }
    catch (error) {
        console.error(error);
    }
}, );

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Condense Games server listening at http://%s:%s", host, port)
})

 console.log(`Server running at http://127.0.0.1:${PORT}/`);