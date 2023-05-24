const { Router } = require("express");
const { Diet } = require("../../db")
const { getDiets } = require("../../controllers/controllers");

const dietRouter = Router();

dietRouter.get("/", async (req, res) => {
    let diets = await Diet.findAll()
    try {
        if (!diets[0]) await getDiets()
        diets = await Diet.findAll()
        return res.status(200).send(diets)
    }   catch (error) {
        res.status(404).send("No hay dietas todavía")
    }
});

module.exports = dietRouter;
