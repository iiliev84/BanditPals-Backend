import express from "express";
const router = express.Router();
export default router;
import db from "#db/client";
import { createAchievement, getAllAchievements, getUserAchievements, postUserAchievement } from "#db/queries/achievements";
import { verifyToken } from "#middleware";


//GET route for all achievments
router.route("/").get(async(req, res)=>{
    const achievements = await getAllAchievements();
    res.send(achievements);
});

//GET route for user earned achievements
router.route("/user").get(verifyToken, async(req, res, next)=>{
    const id = req.user.id;
    const userAchievements = await getUserAchievements(id);

    if (!userAchievements){
        return res.status(404).send(`This user has earned no achievements`)
    };

    if (!id){
        return res.status(400).send(`Please login to start earning achievements.`)
    };

    res.send(userAchievements);
});

//POST user achievements
router.route("/").post(verifyToken, async(req,res, next)=>{
    const id = req.user.id;
    if (!id){
        return res.status(401).send(`User not authorized`)
    }
    const {achievement_id} = req.body;

    if (!req.body){
        return res.status(400).send(`Missing req body`)
    };

    if (!id || !achievement_id){
        return req.status(400).send(`Missing required fields.`)
    };

    const newUserAchievement = await postUserAchievement({user_id: id, achievement_id});
    res.status(201).json(newUserAchievement);
});
