import db from "../models/index";
import bcrypt from "bcryptjs";
import { Sequelize } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

let handleLoginService = (usernameOrEmail, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(usernameOrEmail);
            if (isExist) {

                let user = await db.User.findOne({
                    attributes: ['email', 'role', 'password', 'name'],
                    where: { email: usernameOrEmail },
                    raw: true,

                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login successfully';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = `User not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `User not found`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail,
                    password: { [db.Sequelize.Op.ne]: '' }
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let saveUserPreferenceService = (userPreferenceData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!userPreferenceData || !userPreferenceData.email) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!',
                });
            } else {
                let user = await db.User.findOne({
                    where: {
                        email: userPreferenceData.email,
                    },
                });

                if (user) {
                    console.log("Check: ", userPreferenceData);
                    let { stylePreference, servicePreference, amenityPreference, drinkPreference, distancePreference, timePreference } = userPreferenceData;

                    await db.Favorite_style.destroy({ where: { uid: user.id } });
                    await db.Favorite_service.destroy({ where: { uid: user.id } });
                    await db.Favorite_amenity.destroy({ where: { uid: user.id } });
                    await db.Favorite_drink.destroy({ where: { uid: user.id } });
                    await db.Favorite_distance.destroy({ where: { uid: user.id } });
                    await db.Favorite_time.destroy({ where: { uid: user.id } });

                    if (Array.isArray(stylePreference) && stylePreference.length > 0) {
                        await db.Favorite_style.bulkCreate(
                            stylePreference.map((style) => ({
                                uid: user.id,
                                style: style,
                            }))
                        );
                    }

                    if (Array.isArray(servicePreference) && servicePreference.length > 0) {
                        await db.Favorite_service.bulkCreate(
                            servicePreference.map((service) => ({
                                uid: user.id,
                                sid: service,
                            }))
                        );
                    }

                    if (Array.isArray(amenityPreference) && amenityPreference.length > 0) {
                        await db.Favorite_amenity.bulkCreate(
                            amenityPreference.map((amenity) => ({
                                uid: user.id,
                                aid: amenity,
                            }))
                        );
                    }

                    if (Array.isArray(drinkPreference) && drinkPreference.length > 0) {
                        await db.Favorite_drink.bulkCreate(
                            drinkPreference.map((drink) => ({
                                uid: user.id,
                                did: drink,
                            }))
                        );
                    }

                    if (distancePreference !== undefined) {
                        await db.Favorite_distance.create({
                            uid: user.id,
                            distance: distancePreference,
                        });
                    }

                    if (Array.isArray(timePreference) && timePreference.length > 0) {
                        await db.Favorite_time.bulkCreate(
                            timePreference.map((time) => ({
                                uid: user.id,
                                time: time,
                            }))
                        );
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save preferences for user successfully!',
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDataForSelectBoxUserPreferencePageService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let services = await db.Service.findAll();
            let amenities = await db.Amenity.findAll();
            let drinks = await db.Drink.findAll();

            let data = {
                services: services,
                amenities: amenities,
                drinks: drinks,
            };

            resolve({
                errCode: 0,
                errMessage: 'Successfully fetched data!',
                data: data,
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getCoffeeShopForYouService = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!email) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!',
                });
            } else {
                let user = await db.User.findOne({
                    where: {
                        email: email,
                    },
                    include: [
                        {
                            model: db.Favorite_amenity, as: 'favoriteAmenity',
                            attributes: ['aid'],
                            include: [
                                {
                                    model: db.Include_amenity, as: 'shopIncludeFavoriteAmenity',
                                    attributes: ['cid'],
                                },
                            ]
                        },
                        {
                            model: db.Favorite_drink, as: 'favoriteDrink',
                            attributes: ['did'],
                            include: [
                                {
                                    model: db.Include_drink, as: 'shopIncludeFavoriteDrink',
                                    attributes: ['cid'],
                                },
                            ]
                        },
                        {
                            model: db.Favorite_style, as: 'favoriteStyle',
                            attributes: ['style'],
                            include: [
                                {
                                    model: db.CoffeeShop, as: 'shopIncludeFavoriteStyle',
                                    attributes: ['cid'],
                                },
                            ]
                        },
                        {
                            model: db.Favorite_service, as: 'favoriteService',
                            attributes: ['sid'],
                            include: [
                                {
                                    model: db.Include_service, as: 'shopIncludeFavoriteService',
                                    attributes: ['cid'],
                                },
                            ]
                        },
                        {
                            model: db.Favorite_time, as: 'favoriteTime',
                            attributes: ['time'],
                        },
                    ]
                });

                if (user) {
                    // Lấy coffeeShopByAmenity
                    let coffeeShopByAmenity = [];
                    user.favoriteAmenity.forEach(favorite => {
                        favorite.shopIncludeFavoriteAmenity.forEach(shop => {
                            if (!coffeeShopByAmenity.includes(shop.cid)) {
                                coffeeShopByAmenity.push(shop.cid);
                            }
                        });
                    });

                    // Lấy coffeeShopByDrink
                    let coffeeShopByDrink = [];
                    user.favoriteDrink.forEach(favorite => {
                        favorite.shopIncludeFavoriteDrink.forEach(shop => {
                            if (!coffeeShopByDrink.includes(shop.cid)) {
                                coffeeShopByDrink.push(shop.cid);
                            }
                        });
                    });

                    //lấy dữ liệu các coffeeShopByStyle
                    let coffeeShopByStyle = [];
                    user.favoriteStyle.forEach(favorite => {
                        favorite.shopIncludeFavoriteStyle.forEach(shop => {
                            if (!coffeeShopByStyle.includes(shop.cid)) {
                                coffeeShopByStyle.push(shop.cid);
                            }
                        });
                    });

                    //lấy dữ liệu các coffeeShopByService
                    let coffeeShopByService = [];
                    user.favoriteService.forEach(favorite => {
                        favorite.shopIncludeFavoriteService.forEach(shop => {
                            if (!coffeeShopByService.includes(shop.cid)) {
                                coffeeShopByService.push(shop.cid);
                            }
                        });
                    });

                    let favoriteTime = [];
                    user.favoriteTime.forEach(time => {
                        if (!favoriteTime.includes(time.time)) {
                            favoriteTime.push(time.time);
                        }
                    });

                    let coffeeShopsByTimeQueried = await db.CoffeeShop.findAll({
                        where: {
                            [Sequelize.Op.or]: favoriteTime.map((time) => ({
                                open_hour: { [db.Sequelize.Op.lte]: time },
                                close_hour: { [db.Sequelize.Op.gte]: time },
                            })),
                        },
                        attributes: ['cid'],
                    })

                    let coffeeShopsByTime = [];
                    coffeeShopsByTimeQueried.forEach(shop => {
                        if (!coffeeShopsByTime.includes(shop.cid)) {
                            coffeeShopsByTime.push(shop.cid);
                        }
                    });

                    let coffeeShopIntersection = coffeeShopByDrink;  // Bắt đầu với coffeeShopByDrink

                    // Kiểm tra nếu coffeeShopIntersection không rỗng
                    if (coffeeShopIntersection.length === 0) {
                        coffeeShopIntersection = coffeeShopByAmenity;  // Nếu rỗng, tiếp tục với coffeeShopByAmenity
                    }

                    if (coffeeShopIntersection.length === 0) {
                        coffeeShopIntersection = coffeeShopByDrink.filter(cid => coffeeShopByAmenity.includes(cid)); // Giao coffeeShopByDrink và coffeeShopByAmenity
                    }

                    if (coffeeShopIntersection.length === 0) {
                        coffeeShopIntersection = coffeeShopIntersection.filter(cid => coffeeShopByService.includes(cid)); // Giao với coffeeShopByService
                    }

                    if (coffeeShopIntersection.length === 0) {
                        coffeeShopIntersection = coffeeShopIntersection.filter(cid => coffeeShopByStyle.includes(cid)); // Giao với coffeeShopByStyle
                    }

                    if (coffeeShopIntersection.length === 0) {
                        coffeeShopIntersection = coffeeShopIntersection.filter(cid => coffeeShopsByTime.includes(cid)); // Giao với coffeeShopsByTime
                    }

                    const coffeeShops = await db.CoffeeShop.findAll({
                        where: {
                            cid: coffeeShopIntersection,
                        }
                    })

                    resolve({
                        // user: user,
                        // coffeeShopByDrink: coffeeShopByDrink,
                        // coffeeShopByAmenity: coffeeShopByAmenity,
                        // coffeeShopByStyle: coffeeShopByStyle,
                        // coffeeShopByService: coffeeShopByService,
                        // data: coffeeShopIntersection,
                        // coffeeShopsByTime: coffeeShopsByTime,
                        coffeeShops: coffeeShops,
                        errCode: 0,
                        errMessage: 'Fetched coffee shops successfully!',
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'User not found!',
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let searchCoffeShopService = async (criteria) => {
    return new Promise(async (resolve, reject) => {
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
            let coffeShops = await db.CoffeeShop.findAll({
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
                    open_hour: {
                        [db.Sequelize.Op.lte]: open_time
                    },
                    close_hour: {
                        [db.Sequelize.Op.gte]: end_time
                    },
                    waiting_time,
                    style
                },
                include: [
                    {
                        model: db.Include_service,
                        where: { sid: service },
                        required: true, // Bắt buộc phải có service phù hợp
                        as: 'includeService'
                    },
                    {
                        model: db.Include_amenity,
                        where: { aid: amenity },
                        required: true, // Bắt buộc phải có amenity phù hợp
                        as: 'includeAmenity'
                    }
                ],
                attributes: ['cid', 'name', 'province_vie', 'province_jap', 'min_price', 'max_price', 'open_hour', 'close_hour', 'waiting_time', 'style']
            });

            // Resolve với kết quả tìm kiếm
            resolve(coffeShops);
        } catch (error) {
            console.error("Error in searchCoffeShopService: ", error);
            // Reject với lỗi nếu có
            reject(error);
        }
    });
}


const createUser = async (username, password, email, phone) => {
    try {

        // Kiểm tra xem email đã tồn tại hay chưa
        const existingEmail = await db.User.findOne({ where: { email } });
        if (existingEmail) {
            return {
                errCode: 3,
                message: 'Email is already in use.',
            };
        }

        // Kiểm tra xem username đã tồn tại hay chưa
        const existingUsername = await db.User.findOne({ where: { userName: username } });
        if (existingUsername) {
            return {
                errCode: 4,
                message: 'Username is already taken.',
            };
        }

        // Hash mật khẩu
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Tạo user mới trong cơ sở dữ liệu
        await db.User.create({
            userName: username,
            password: hashedPassword,
            email: email,
            phoneNumber: phone,
            role: 1,
        });

        return {
            errCode: 0,
            message: 'Sign up successful!',
        };
    } catch (error) {
        console.error('Error in createUser:', error);
        return {
            errCode: -1,
            message: 'An error occurred while creating the user.',
        };
    }
};

let getCoffeeShopRecentService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let recentShop = await db.CoffeeShop.findAll({
                order: [
                    ['updatedAt', 'DESC']
                ],
                limit: 10
            })

            if (recentShop) {
                resolve({
                    recentShop: recentShop,
                    errCode: 0,
                    errMessage: 'Get recently favorite coffee shop successfully!',
                })
            } else {
                resolve({
                    recentShop: [],
                    errCode: 0,
                    errMessage: 'No recently favorite coffee shop!',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleLoginService: handleLoginService,
    saveUserPreferenceService: saveUserPreferenceService,
    getDataForSelectBoxUserPreferencePageService: getDataForSelectBoxUserPreferencePageService,
    getCoffeeShopForYouService: getCoffeeShopForYouService,
    searchCoffeShopService: searchCoffeShopService,
    createUser: createUser,
    getCoffeeShopRecentService: getCoffeeShopRecentService,
}