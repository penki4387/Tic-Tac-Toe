# 🎮 Tic-Tac-Toe Game

A simple Tic-Tac-Toe game built using NOde js

## 🚀 Features
- 🔹 Play against a friend (2-player mode).
- 🔹 Interactive UI with responsive design.
- 🔹 Shows the winner or declares a draw.
- 🔹 Reset button to restart the game.

## 🛠️ Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/penki4387/Tic-Tac-Toe.git
cd Tic-Tac-Toe
npm install
node server.js

## 🔌 API Routes & Payloads

### 1️⃣ Start a New Game  
**Endpoint:** `POST /start`  
**Description:** Initializes a new game with two players or a computer opponent.  

**Request Payload:**  
```json
{
  "player1": "Alice",
  "player2": "Bob",
  "computer": false
}


#2️⃣ Make a Move
Endpoint: POST /move
Description: Allows a player to place their symbol on the board.
🟢 Valid Move
Request Payload:
{
  "row": 0,
  "col": 1
}

🔴 Invalid Move (Out of Bounds)
Request Payload:
{
  "row": 3,
  "col": 0
}

🔴 Invalid Move (Cell Occupied)
Request Payload:
{
  "row": 0,
  "col": 1
}

🏆 Winning Move
Request Payload:
{
  "row": 1,
  "col": 1
}

🤝 Draw Move
Response:
{
  "message": "It's a draw!",
  "board": [["X", "O", "X"], ["O", "X", "O"], ["O", "X", "O"]]
}

3️⃣ Reset the Game
Endpoint: GET /reset
Description: Resets the board and starts a new game with the same players.
