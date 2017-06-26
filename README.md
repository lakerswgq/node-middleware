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

let app = new Server();

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

app.listen(8000);
```
