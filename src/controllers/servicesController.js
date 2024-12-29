import db from '../models/index';

let addService = async (req, res) => {

    try {

        let maxId = await db.Service.max('id');
        let newId = maxId + 1;
        let name_eng = req.body.name_eng;
        let name_jap = req.body.name_jap;

        let newService = await db.Service.create({
            sid: newId,
            name_eng: name_eng,
            name_jap: name_jap
        })

        return res.status(201).json({
            newService,
            errCode: 0,
        })

    } catch (error) {
        console.error('Error adding service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

let addServiceToCoffeeShop = async (req, res) => {
    try {

        let cid = req.body.cid;
        let sid = req.body.sid;
        let price = req.body.price;

        let newIncludeService = await db.Include_service.create ({
            cid: cid,
            sid: sid,
            price: price,
        })

        return res.status(201).json({
            newIncludeService,
            errCode: 0,
        })

    } catch (error) {
        console.error('Error adding service:', error);
        res.status(500).json({ error: error.message });
    }
}

let getMaxServiceId = async (req, res) => {
    try {
        let maxId = await db.Service.max('id');
        return res.json({ maxId });
    } catch(error) {
        console.error('Error fetching max service id:', error);
        throw error;
    }
}

module.exports = {
    addService: addService,
    addServiceToCoffeeShop: addServiceToCoffeeShop,
    getMaxServiceId: getMaxServiceId,
}