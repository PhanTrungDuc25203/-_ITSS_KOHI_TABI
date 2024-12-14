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

let getCoffeeShopById = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await db.CoffeeShop.findOne({
            where: { cid: id },
            include: [
                {
                    model: db.Drink,
                    through: {
                        model: db.Include_drink,
                        attributes: []
                    },
                    as: 'drinks'
                }
            ]
        });
        if (data) {
            return res.json({ data, errCode: 0 });
        } else {
            return res.status(404).json({ error: 'Coffee shop not found' });
        }
    } catch (error) {
        console.error('Error fetching coffee shop:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

let addFavoriteCoffeeShop = async (req, res) => {
    try {
        let userId = req.body.user_id;
        let coffeeShopId = req.body.coffee_shop_id;

        // Kiểm tra xem bản ghi đã tồn tại chưa
        let existingFavorite = await db.Favorite_list.findOne({
            where: {
                uid: userId,
                cid: coffeeShopId
            }
        });

        if (existingFavorite) {
            return res.status(400).json({ error: 'Favorite already exists' });
        }

        // Nếu chưa tồn tại, tạo mới bản ghi
        let favorite = await db.Favorite_list.create({
            uid: userId,
            cid: coffeeShopId
        });

        return res.status(201).json(favorite);

    } catch (error) {
        console.error('Error adding favorite coffee shop:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

let getUsersFavoritingCoffeeShop = async (req, res) => {
    try {
        let coffeeShopId = req.params.id;
        let data = await db.Favorite_list.findAll({
            where: { cid: coffeeShopId },
            include: [
                {
                    model: db.User,
                    as: 'user'
                }
            ]
        });
        if (data) {
            return res.json({ data, errCode: 0 });
        } else {
            return res.status(404).json({ error: 'No users found for this coffee shop' });
        }
    } catch (error) {
        console.error('Error fetching users favoriting coffee shop:', error);
        return res.status(500).json({ error: error.message });
    }
};

let isFavoriteCoffeeShop = async (req, res) => {
    try {
        let userId = req.body.user_id;
        let coffeeShopId = req.body.coffee_shop_id;
        let data = await db.Favorite_list.findOne({
            where: {
                uid: userId,
                cid: coffeeShopId
            }
        });
        if (data) {
            return res.json({ isFavorite: true });
        } else {
            return res.json({ isFavorite: false });
        }
    } catch (error) {
        console.error('Error checking favorite coffee shop:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCoffeeShops: getAllCoffeeShops,
    getCoffeeShopById: getCoffeeShopById,
    addFavoriteCoffeeShop: addFavoriteCoffeeShop,
    getUsersFavoritingCoffeeShop: getUsersFavoritingCoffeeShop,
    isFavoriteCoffeeShop: isFavoriteCoffeeShop,
};