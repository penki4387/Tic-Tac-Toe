import express from "express";
import  TicToeController from "../controllers/tic_toe_controllers.js";

const ticToeRoutes = express.Router();

ticToeRoutes.route("/start")
    .post(TicToeController.prototype.startGame)

    ticToeRoutes.route("/move")
    .post(TicToeController.prototype.handlePlayer)

    ticToeRoutes.route("/reset")
    .get(TicToeController.prototype.resetGame)

        
export default ticToeRoutes;