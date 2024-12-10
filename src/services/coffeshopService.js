import db from "../models";

let searchCoffeShopService = async (criteria) => {
    try {
        const {
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
        } = criteria;

        // Xây dựng truy vấn dựa trên các tiêu chí tìm kiếm
        let coffeShops = await db.CoffeShop.findAll({
            where: {
                name: {
                    [db.Sequelize.Op.like]: `%${name}%`
                },
                [db.Sequelize.Op.or]: [
                    { province_vie: province },
                    { province_jap: province }
                ],
                min_price: {
                    [db.Sequelize.Op.gte]: min_price
                },
                max_price: {
                    [db.Sequelize.Op.lte]: max_price
                },
                open_time: {
                    [db.Sequelize.Op.lte]: open_time
                },
                end_time: {
                    [db.Sequelize.Op.gte]: end_time
                },
                waiting_time,
                style
            },
            include: [
                {
                    model: db.Include_service,
                    where: { sid: service },
                    required: true // Bắt buộc phải có service phù hợp
                },
                {
                    model: db.Include_amenity,
                    where: { aid: amenity },
                    required: true // Bắt buộc phải có amenity phù hợp
                }
            ],
            attributes: ['cid', 'name', 'province_vie', 'province_jap', 'min_price', 'max_price', 'open_time', 'end_time', 'waiting_time', 'style']
        });

        return coffeShops;
    } catch (error) {
        console.error("Error in searchCoffeShopService: ", error);
        throw error;
    }
};

module.exports = {
    searchCoffeShopService: searchCoffeShopService
};
