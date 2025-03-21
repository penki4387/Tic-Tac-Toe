import AuthenticationMiddleware from "./middleware.js";

const authMiddleware = new AuthenticationMiddleware();

// Game state
let gameBoard;
let players;
let currentTurn;
let gameActive;

export default class TicToeServices {
  constructor() {
    this.resetGame();
  }

  async startGame(body) {
    try {
      const { player1, player2, computer } = body;
      players = {
        player1: { name: player1 || "Player 1", symbol: "O" },
        player2: { name: computer ? "Computer" : player2 || "Player 2", symbol: "X", isComputer: !!computer },
      };
      this.resetGame();
      return { message: "Game started!", players, board: gameBoard };
    } catch (error) {
      console.error("Error in startGame:", error);
      throw error;
    }
  }

  async handlePlayer(body) {
    try {
        if (!gameActive) return { message: "Game over! Reset to play again." };
        const { row, col } = body;
        if (row < 0 || row > 2 || col < 0 || col > 2) {
            return { message: "Invalid move! Out of bounds." };
        }
        if (gameBoard[row][col] !== "") {
            return { message: "Invalid move! Cell is already occupied." };
        }
        gameBoard[row][col] = players[currentTurn].symbol;
        if (authMiddleware.checkWin(players[currentTurn].symbol, gameBoard)) {
            gameActive = false;
            return {
                message: `${players[currentTurn].name} wins!`,
                board: gameBoard,
            };
        }
        if (authMiddleware.isDraw(gameBoard)) {
            gameActive = false;
            return { message: "It's a draw!", board: gameBoard };
        }
        currentTurn = currentTurn === "player1" ? "player2" : "player1";
        if (players.player2.isComputer && currentTurn === "player2") {
            gameBoard = authMiddleware.computerMove(gameBoard, players.player2.symbol);

            if (authMiddleware.checkWin(players.player2.symbol, gameBoard)) {
                gameActive = false;
                return {
                    message: `${players.player2.name} wins!`,
                    board: gameBoard,
                };
            }
            if (authMiddleware.isDraw(gameBoard)) {
                gameActive = false;
                return { message: "It's a draw!", board: gameBoard };
            }

            currentTurn = "player1";
        }

        return { message: "Move accepted", board: gameBoard };
    } catch (error) {
        console.log(error);
        throw error;
    }
}


  async resetGame() {
    gameBoard = Array.from({ length: 3 }, () => Array(3).fill(""));
    currentTurn = "player1";
    gameActive = true;
    return { message: "Game reset!", board: gameBoard };
  }

  isValidMove(row, col) {
    return row >= 0 && row < 3 && col >= 0 && col < 3 && gameBoard[row][col] === "";
  }
}
