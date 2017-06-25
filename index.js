const http = require("http");
const url = require("url");

class Server {
    constructor(){
        this.server = http.createServer();
        this.middlewares = [];
        
        // default middleare

        this.use(require("./middlewares/sendFile"));
        this.use(require("./middlewares/query"));
        
        this.handleRequest();
    }

    listen(port = 80, hostname = "localhost") {
        this.server.listen(port, hostname, () => {
            console.log(`server is running at ${hostname}:${port}`);
        });
        return this;
    }

    handleRequest() {
        let server = this.server,
            self = this;
        server.on("request", function (req, res){
            let requsetUrl = req.url,
                urlInfo = url.parse(requsetUrl),
                pathname = urlInfo.pathname,
                method = req.method.toLowerCase();                        

            console.log("pathname:", pathname);
            self.callMiddleWare(pathname, req, res);
        })
    }

    callMiddleWare (pathname, req, res){
        let index = 0,
            middlewares = this.middlewares,
            handleError = this.handleError;

        function next (error){
            if (error){
                handleError(error, req, res, next);
                return;
            }

            let middleware = middlewares[index++];
            // all done
            if (!middleware) {
                return;
            }


            if (middleware.path === ""){
                middleware.handle(req, res, next);
            }
            else if (middleware.path === pathname){
                middleware.handle(req, res, next);
            }
            else {
                next();
            }
        }

        next();
    }

    use(path, handle) {
        if (typeof path === "function") { // middleware for all request
            handle = path;
            this.middlewares.push({
                path: "",
                handle: handle
            });
        }
        else {
            this.middlewares.push({
                path: path,
                handle: handle
            })
        }
        return this;
    }

    handleError (error, req, res, next){
        res.writeHead(500);
        res.write(error.toString());
        res.end();
    }
}

module.exports = Server;