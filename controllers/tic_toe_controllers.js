import TicToeServices from '../services/tic_toe_services.js';


export default class TicToeController {

    startGame(request, response, next) {
        TicToeServices.prototype.startGame(request.body).then(result => {
            response.json(result);
        }).catch(error => next(error))
    }

    handlePlayer(request, response, next) {
        TicToeServices.prototype.handlePlayer(request.body).then(result => {
            response.json(result);
        }).catch(error => next(error))
    }

    resetGame(request, response, next) {
        TicToeServices.prototype.resetGame(request.body).then(result => {
            response.json(result);
        }).catch(error => next(error))
    }
}