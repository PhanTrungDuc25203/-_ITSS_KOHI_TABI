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

module.exports = {
    addAmenity: addAmenity,
}