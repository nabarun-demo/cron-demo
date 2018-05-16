"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const createError = require("http-errors");
const route_1 = require("./routes/route");
const cron_1 = require("cron");
const axios_1 = require("axios");
class Server {
    constructor() {
        this.app = express();
        this.configServer();
        this.mountRoutes();
        this.scheduleTask();
    }
    scheduleTask() {
        this.task = new cron_1.CronJob("*/5 * * * * *", () => {
            // console.log("Today is recognized by Rebecca Black! " + Math.floor(Date.now() / 1000));
            const rnd = Math.floor(Math.random() * Math.floor(9999));
            console.log(rnd);
            // http://localhost:5000/cron/12
            const url = `http://localhost:5000/cron/${rnd}`;
            // console.log(url);
            axios_1.default.get(url)
                .then(response => {
                console.log(response.status);
            })
                .catch(error => {
                console.log(error);
            });
            console.log("Done");
        }, null, false);
    }
    mountRoutes() {
        this.app.use("/", route_1.default.apiRouter);
        this.app.use("/user", route_1.default.userRouter);
    }
    configServer() {
        this.app.use(logger("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        // catch 404 and forward to error handler
        this.app.use((err, req, res, next) => {
            err.status = 404;
            next(createError(err));
        });
        // error handler
        this.app.use((err, req, res, next) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.json("error");
        });
    }
    static getServer() {
        return new Server();
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map