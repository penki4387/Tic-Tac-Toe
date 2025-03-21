import express from 'express'
import cors from  'cors'
const app = express()
app.use(express.json())
app.use(cors())
const port =  3000
import  ticToeRoutes from './routes/tic-toe_routes.js';


app.use( ticToeRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });