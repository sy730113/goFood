const express = require("express");
const router = express.Router();

router.post("/foodData", async (req, res) => {
    try {
        if (!global.foodItems || !global.foodCategory) {
            throw new Error("Food data not available");
        }

       
        res.send([global.foodItems, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
