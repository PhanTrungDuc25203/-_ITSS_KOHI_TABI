import { at, get } from 'lodash';
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
                        attributes: ['price']
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
        let userId = req.query.user_id;
        let coffeeShopId = req.query.coffee_shop_id;
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

let removeFavoriteCoffeeShop = async (req, res) => {
    try {
        let userId = req.body.user_id;
        let coffeeShopId = req.body.coffee_shop_id;

        let favorite = await db.Favorite_list.findOne({
            where: {
                uid: userId,
                cid: coffeeShopId
            }
        });

        if (!favorite) {
            return res.status(404).json({ error: 'Favorite not found' });
        }

        await favorite.destroy();

        return res.json({ message: 'Favorite removed' });

    } catch (error) {
        console.error('Error removing favorite coffee shop:', error);
        return res.status(500).json({ error: error.message });
    }
};

let getListFavoriteCoffeeShop = async (req, res) => {
    try {
        let userId = req.params.id;
        let data = await db.Favorite_list.findAll({
            where: { uid: userId },
            include: [
                {
                    model: db.CoffeeShop,
                    as: 'coffeeShop'
                }
            ]
        });
        if (data) {
            return res.json({ data, errCode: 0 });
        } else {
            return res.status(404).json({ error: 'Error' });
        }
    } catch (error) {
        console.error('Error fetching users favoriting coffee shop:', error);
        return res.status(500).json({ error: error.message });
    }
};


let addCoffeeShop = async (req, res) => {
    try {

        let maxId = await db.CoffeeShop.max('id');
        let cid = maxId + 1;
        let name = req.body.name;
        let provinceId = req.body.province_id; // Sau fix cả Nhật cả Anh đều theo id này
        let address = req.body.address;
        let openHour = req.body.open_hour;
        let closeHour = req.body.close_hour;
        let minPrice = req.body.min_price;
        let maxPrice = req.body.max_price;
        let desEng = req.body.description_en;
        let desJap = req.body.description_jp;
        let style = req.body.style;
        let picture = req.body.picture;

        let newCoffeeShop = await db.CoffeeShop.create({
            cid: cid,
            name: name,
            province_vie: provinceId,
            province_jap: provinceId,
            address: address,
            open_hour: openHour,
            close_hour: closeHour,
            min_price: minPrice,
            max_price: maxPrice,
            description_eng: desEng,
            description_jap: desJap,
            style: style,
            picture: picture
        });

        return res.status(201).json(
            {
                newCoffeeShop,
                errCode: 0,
            }
        );

    } catch (error) {
        console.error('Error adding coffee shop:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

let addDrinkToCoffeeShop = async (req, res) => {
    try {

        let cid = req.body.cid;
        let did = await db.Drink.max('id') + 1;
        let name_vi = req.body.name_vi;
        let name_eng = req.body.name_eng;
        let name_ja = req.body.name_ja;
        let price = req.body.price;
        let picture = req.body.picture;

        let newDrink = await db.Drink.create({
            did: did,
            name_vi: name_vi,
            name_eng: name_eng,
            name_ja: name_ja,
            price: price,
            picture: picture,
        });

        let newIncludeDrink = await db.Include_drink.create({
            cid: cid,
            did: did,
            price: price,
        });

        return res.status(201).json(
            {
                newDrink,
                newIncludeDrink,
                errCode: 0,
            }
        );

    } catch (error) {
        console.log("Không thêm được đồ uống!!! ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

let getMaxCoffeeShopId = async (req, res) => {
    try {
        let maxId = await db.CoffeeShop.max('id');
        return res.json({ maxId });
    } catch (error) {
        console.error('Error fetching max coffee shop id:', error);
        throw error;
    }
};

let getMaxDrinkId = async () => {
    try {
        let maxId = await db.Drink.max('id');
        return maxId;
    } catch (error) {
        console.error('Error fetching max drink id:', error);
        throw error;
    }
}

module.exports = {
    getAllCoffeeShops: getAllCoffeeShops,
    getCoffeeShopById: getCoffeeShopById,
    addFavoriteCoffeeShop: addFavoriteCoffeeShop,
    getUsersFavoritingCoffeeShop: getUsersFavoritingCoffeeShop,
    isFavoriteCoffeeShop: isFavoriteCoffeeShop,
    removeFavoriteCoffeeShop: removeFavoriteCoffeeShop,
    getListFavoriteCoffeeShop: getListFavoriteCoffeeShop,
    addCoffeeShop: addCoffeeShop,
    getMaxCoffeeShopId: getMaxCoffeeShopId,
    addDrinkToCoffeeShop: addDrinkToCoffeeShop,
};