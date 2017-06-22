let Server = require("./index");

let app = new Server();

app.use(function (req, res, next) {
    req.name = "julien";
    next();
})

app.use("/", function (req, res){
    console.log("name:", req.name);
    res.writeHead(200);
    res.end("index page");
})

app.use(function (req, res, next){
    next("throw a error");
})

app.use("/user", function (req, res, next){
    res.writeHead(200);
    res.end("profile page");
})

app.listen(8000);

