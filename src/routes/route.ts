import * as express from "express";
import ba from "../controllers/userController";

class Routes {
  public apiRouter: express.Router;
  public userRouter: express.Router;

  constructor() {
    this.apiRouter = express.Router();
    this.userRouter = express.Router();
    this.configRoutes();
  }

  public configRoutes(): void {
    this.apiRouter.get("/", (req, res) => {
      res.json({
        message: "Welcome to cytel demo API!"
      });
    });

    this.apiRouter.get("/cron/:id", (req, res) => {
      const id = req.params.id;
      console.log(`CRON job called for #${id}`);
      setTimeout(() => {
        console.log(`CRON job call ended for #${id}`);
      }, 15000);
      res.json({
        message: "Welcome to CRON job"
      });
    });

    this.userRouter.get("/", ba.getAllUsers).post("/", ba.addUser);
  }
}

export default new Routes();
