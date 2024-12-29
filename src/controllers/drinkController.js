import db from '../models/index';

let getMaxDrinkId = async (req, res) => {
    try {
        let maxId = await db.Drink.max('id');
        return res.json({ maxId });
    } catch(error) {
        console.error('Error fetching max drink id:', error);
        throw error;
    }
}

let getDrinkById = async (req, res) => {
    try {
        let id = req.params.id;
        let drink = await db.Drink.findOne({
            where: { id: id }
        });

        if (!drink) {
            return res.status(200).json(null);
        }

        return res.status(200).json(drink);
    } catch (error) {
        console.error('Error fetching drink by id:', error);
        return res.status(500).json({ error: error.message });
    }
};

let updateDrink = async (req, res) => {
    try {
        let did = req.body.did;

        let drink = await db.Drink.findOne({
            where: { id: did }
        });

        if (!drink) {
            return res.status(404).json({ message: 'Drink not found' });
        }

        drink.name_vi = req.body.name_vi;
        drink.name_eng = req.body.name_eng;
        drink.name_ja = req.body.name_ja;
        drink.price = req.body.price;
        drink.picture = req.body.picture;

        await drink.save();

        let includeDrink = await db.Drink.findOne({
            where: { did: did }
        });

        includeDrink.price = req.body.price;
        await includeDrink.save();

        return res.status(200).json({ message: 'Drink updated successfully' });

    } catch (error) {
        console.error('Error updating drink:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMaxDrinkId: getMaxDrinkId,
    getDrinkById: getDrinkById,
    updateDrink: updateDrink
}