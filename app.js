const path = require("path");
let Server = require("./index");


let app = new Server();

app.use(function (req, res, next) {
    req.name = "julien";
    next();
})

app.use("/", function (req, res){
    console.log("name:", req.name);
    console.log("query:", req.query);
    res.renderFile(path.resolve(__dirname, "./views/index.html"));
})

app.use("/user", function (req, res, next){
    res.writeHead(200);
    res.end("profile page");
})

app.use("/download", function (req, res){
    res.sendFile(path.resolve(__dirname, "./views/index.html"));
})

app.listen(8000);

