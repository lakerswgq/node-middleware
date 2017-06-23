const fs = require("fs");
const path = require("path");

function sendFile(req, res, next){

    function handleFile (filepath, inline = true){
        let header = inline ? "inline" : "attachment";
        console.log("header:", header);
        try {
            let readStream = fs.createReadStream(filepath);
            res.writeHead(200, {
                "content-disposition": header
            });
            readStream.pipe(res);
        } 
        catch (error) {
            next(error);
        }
    }

    res.sendFile = function (path){
        handleFile(path, false);
    }
    res.renderFile = function (path){
        handleFile(path);
    }
    next();
}

module.exports = sendFile;