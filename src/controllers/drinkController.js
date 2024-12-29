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

module.exports = {
    getMaxDrinkId: getMaxDrinkId,
}