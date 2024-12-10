import db from '../models/index';

let getAllCoffeeShops = async (req, res) => {
    try {
        let data = await db.CoffeeShop.findAll(); // Use CoffeeShop model
        console.log('data: ', data);
        
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Error fetching coffee shops:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllCoffeeShops: getAllCoffeeShops,
};