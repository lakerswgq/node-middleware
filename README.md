# node-middleware
learn to write a simple nodejs http server using middleware

## Install
```
npm install julien-server
```
## Usage
```
const path = require("path");
let Server = require("julien-server");
let bodyParser = require("body-parser");

let app = new Server();


// use connect middleware
app.use(bodyParser.urlencoded({
	extended: false
}));

// global middleware
app.use(function (req, res, next){
	req.name = "julien";
	next();
})

app.use("/", function (req, res){
	res.renderFile(path.resolve(__dirname, "./views/index.html"));
})

app.use("/user", function (req, res){
	res.end(req.name);
})

app.use("/download", function (req, res){
	res.sendFile(path.resolve(__dirname, "./views/index.html"));
})

app.use("/query", function (req, res){
	res.write(JSON.stringify({
		query: req.query
	}));
	res.end();
})

app.use("/post", function (req, res){
	// req.body is set by body-parser middleware
	console.log(req.body);
	res.end("handle post")
})

// throw error in middleware
app.use("/error",function (req, res, next){
	next(new Error("this is an error"));
})


// add error handle middleware
app.use(function (error, req, res, next){
	res.end("custom error handle");
})

app.listen(8000);
```
connect第三方中间件一般也可以用，试了body-parser。