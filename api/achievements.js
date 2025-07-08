import express from "express";
const router = express.Router();
export default router;
import db from "#db/client";
import { createAchievement, getAllAchievements, getUserAchievements, postUserAchievement } from "#db/queries/achievements";


//GET route for all achievments
router.route("/").get(async(req, res)=>{
    const achievements = await getAllAchievements();
    res.send(achievements);
});

//GET route for user earned achievements
router.route("/:id").get(async(req, res, next)=>{
    const id = Number(req.params.id);
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
router.route("/:id").post(async(req,res, next)=>{
    const id = Number(req.params.id);
    const {user_id, achievement_id, unlocked_at} = req.body;

    if (!req.body){
        return res.status(400).send(`Missing req body`)
    };

    if (!user_id || !achievement_id || !unlocked_at){
        return req.status(400).send(`Missing required fields.`)
    };

    const newUserAchievement = await postUserAchievement({user_id, achievement_id, unlocked_at});
    res.status(201).json(newUserAchievement);
});
