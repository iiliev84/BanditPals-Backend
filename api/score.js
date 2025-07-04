import express from "express";
const router = express.Router();
export default router;
import db from "#db/client";
import { getHighestScore, postNewScore, updateHighestScore } from "#db/queries/score";

router.route("/:id").get(async(req,res,next)=>{
    const id = Number(req.params.id);
    const highestScore = await getHighestScore(id);

    if (!highestScore){
        return res.status(404).send(`No highest score found at this ID.`)
    }
    res.send(highestScore);
});


router.route("/:id").post(async(req,res,next)=>{
    const id = Number(req.params.id);
    const {user_id, score, created_at} = req.body;

    if(!req.body){
        return res.status(400).send(`Missing req body.`)
    };

    if (!user_id || !score || !created_at){
        return res.status(400).send(`Missing required fields.`)
    };

    const highScore = await postNewScore({user_id: id, score, created_at});
    res.status(201).json(highScore);
});


router.route("/:id").put(async(req,res,next)=>{
    const id = Number(req.params.id);
    const {score, created_at, user_id} = req.body;

    if(!req.body){
        return res.status(400).send(`Missing req body.`)
    };

     if (!score || !created_at|| !user_id){
        return res.status(400).send(`Missing required fields.`)
    };

    const newHighScore = await updateHighestScore({score, created_at, user_id:id});
    res.status(200).json(newHighScore);
});