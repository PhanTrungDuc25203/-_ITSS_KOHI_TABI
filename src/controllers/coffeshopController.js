import coffeshopService from "../services/coffeshopService";

let searchCoffeShop = async (req, res) => {
    console.log("Dit cu may");
    try {
        let name = req.body.name;
        let province = req.body.province;
        let min_price = req.body.min_price;
        let max_price = req.body.max_price;
        let open_time = req.body.open_time;
        let end_time = req.body.end_time;
        let waiting_time = req.body.waiting_time;
        let style = req.body.style;
        let service = req.body.service;
        let amenity = req.body.amenity;

        if (!name || !province || !min_price || !max_price || !open_time || !end_time || !waiting_time || !style || !service || !amenity) {
            return res.status(400).json({
                errCode: 1,
                message: 'All search parameters are required and cannot be empty!'
            });
        }

        let searchCriteria = {
            name, 
            province, 
            min_price, 
            max_price, 
            open_time, 
            end_time, 
            waiting_time, 
            style, 
            service, 
            amenity
        };

        // Xử lý tìm kiếm quán cà phê thông qua service
        let coffeShops = await coffeshopService.searchCoffeShopService(searchCriteria);
        
        if (coffeShops.length === 0) {
            return res.status(404).json({
                errCode: 2,
                message: 'No matching coffee shops found.'
            });
        }

        return res.status(200).json({
            errCode: 0,
            message: 'Success',
            coffeShops
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Server error while searching coffee shops!'
        });
    }
}

module.exports = {
    searchCoffeShop: searchCoffeShop,
};
