import express from "express";
const app = express();
export default app;
import cors from "cors";
import usersRouter from "#api/users";
import scoreRouter from "#api/score";
import achievementsRouter from "#api/achievements";

app.use(cors());
app.use(express.json())

app.use("/users", usersRouter);

app.use("/score", scoreRouter);

app.use("/achievements", achievementsRouter);

app.route('/').get((req,res)=>{
    res.send("Welcome to the Bandit Pals videogame.")
})

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send("An error occured " + err)
})