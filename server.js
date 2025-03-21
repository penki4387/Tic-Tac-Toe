import express from 'express'
import cors from  'cors'
const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3000;
import  ticToeRoutes from './routes/tic-toe_routes.js';


app.use( ticToeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Tic-Tac-Toe API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});