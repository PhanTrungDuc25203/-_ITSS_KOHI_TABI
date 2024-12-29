import db from '../models/index';

let addAmenity = async (req, res) => {

    try {

        let maxId = await db.Amenity.max('id');
        let newId = maxId + 1;
        let name_eng = req.body.name_eng;
        let name_jap = req.body.name_jap;

        let newAmenity = await db.Amenity.create({
            aid: newId,
            name_eng: name_eng,
            name_jap: name_jap
        })

        return res.status(201).json({
            newAmenity,
            errCode: 0,
        })

    } catch (error) {
        console.error('Error adding amenity:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

let addAmenityToCoffeeShop = async (req, res) => {
    try {

        let cid = req.body.cid;
        let aid = req.body.aid;
        let price = req.body.price;

        let newIncludeAmenity = await db.Include_amenity.create ({
            cid: cid,
            aid: aid,
            price: price,
        })

        return res.status(201).json({
            newIncludeAmenity,
            errCode: 0,
        })

    } catch (error) {
        console.error('Error adding amenity:', error);
        res.status(500).json({ error: error.message });
    }
}

let getMaxAmenityId = async (req, res) => {
    try {
        let maxId = await db.Amenity.max('id');
        return res.json({ maxId });
    } catch(error) {
        console.error('Error fetching max amenity id:', error);
        throw error;
    }
}

module.exports = {
    addAmenity: addAmenity,
    addAmenityToCoffeeShop: addAmenityToCoffeeShop,
    getMaxAmenityId: getMaxAmenityId,
}