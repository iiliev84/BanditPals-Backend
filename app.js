import express from "express";
const app = express();
export default app;

app.use(express.json())

app.route('/').get((req,res)=>{
    res.send("Welcome to the Bandit Pals videogame.")
})

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send("An error occured " + err)
})