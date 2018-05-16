import * as express from "express";
import * as logger from "morgan";
import * as createError from "http-errors";
import route from "./routes/route";
import { CronJob } from "cron";
import axios from "axios";

export class Server {
  public app: express.Application;
  public task;

  constructor() {
    this.app = express();
    this.configServer();
    this.mountRoutes();
    this.scheduleTask();
  }

  private scheduleTask() {
    this.task = new CronJob("*/5 * * * * *", () => {
      // console.log("Today is recognized by Rebecca Black! " + Math.floor(Date.now() / 1000));
      const rnd = Math.floor(Math.random() * Math.floor(9999));
      console.log(rnd);
      // http://localhost:5000/cron/12
      const url = `http://localhost:5000/cron/${rnd}`;
      // console.log(url);
      axios.get(url)
        .then(response => {
          console.log(response.status);
        })
        .catch(error => {
          console.log(error);
        });
      console.log("Done");
    }, null, false);
  }

  private mountRoutes(): void {
    this.app.use("/", route.apiRouter);
    this.app.use("/user", route.userRouter);
  }

  private configServer() {
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

  public static getServer(): Server {
    return new Server();
  }
}
