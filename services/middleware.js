export default class AuthenticationMiddleware {
    // Check for a winner
    checkWin(symbol, board) {
      const winPatterns = [
        [[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]], 
        [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]], 
        [[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]
      ];
      return winPatterns.some(pattern => pattern.every(([r, c]) => board[r][c] === symbol));
    }
  
    // Check for a draw
    isDraw(board) {
      return board.flat().every(cell => cell !== "");
    }
  
    // Improved computer move (tries to win or block opponent)
    computerMove(board, symbol) {
      const opponentSymbol = symbol === "O" ? "X" : "O";
  
      // Winning move
      const winMove = this.findBestMove(board, symbol);
      if (winMove) {
        board[winMove[0]][winMove[1]] = symbol;
        return board;
      }
  
      // Blocking move
      const blockMove = this.findBestMove(board, opponentSymbol);
      if (blockMove) {
        board[blockMove[0]][blockMove[1]] = symbol;
        return board;
      }
  
      // Random move
      const emptyCells = [];
      board.forEach((row, r) => row.forEach((cell, c) => { if (cell === "") emptyCells.push([r, c]); }));
      if (emptyCells.length > 0) {
        const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[r][c] = symbol;
      }
  
      return board;
    }
  
    // Check if a move can win the game
    findBestMove(board, symbol) {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[r][c] === "") {
            board[r][c] = symbol;
            if (this.checkWin(symbol, board)) {
              board[r][c] = ""; // Undo the move
              return [r, c];
            }
            board[r][c] = ""; // Undo the move
          }
        }
      }
      return null;
    }
  }
  