var express = require('express');
var app = express();
const PORT =8081;

app.get('/getGames', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    //file reading
    const fs = require('fs');
    try {
        //read entire file into string
        fs.readFile("./server/games.txt", "utf8", function(err, contents) {
            try {
                //log contents and pass reply
                //console.log(contents);
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
//*
app.get('/getComment', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    //file reading
    const fs = require('fs');
    try {
        //read entire file into string
        fs.readFile("./server/comments.txt", "utf8", function(err, contents) {
            try {
                //log contents and pass reply
                //console.log(contents);
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

/** */

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Condense Games server listening at http://%s:%s", host, port)
})

 console.log(`Server running at http://127.0.0.1:${PORT}/`);