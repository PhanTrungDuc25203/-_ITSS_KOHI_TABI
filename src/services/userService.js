import db from "../models/index";
import bcrypt from "bcryptjs";
import { name } from "ejs";
import { Sequelize } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

let handleLoginService = (usernameOrEmail, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(usernameOrEmail);
            if (isExist) {

                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'role', 'password', 'name'],
                    where: { email: usernameOrEmail },
                    raw: true,

                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login succesfully';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = 'Wrong pasword';
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

            const times = [
                "00:00:00", "02:00:00", "04:00:00", "06:00:00",
                "08:00:00", "10:00:00", "12:00:00", "14:00:00",
                "16:00:00", "18:00:00", "20:00:00", "22:00:00"
            ];

            data.time = times;

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

                    let coffeeShopIntersection = coffeeShopByAmenity.filter(cid =>
                        coffeeShopByDrink.includes(cid) && coffeeShopByStyle.includes(cid) &&
                        coffeeShopByService.includes(cid) && coffeeShopsByTime.includes(cid)
                    )

                    // Kiểm tra nếu giao rỗng và giảm số mảng giao theo thứ tự ưu tiên
                    if (coffeeShopIntersection.length === 0) {
                        coffeeShopIntersection = coffeeShopByDrink.filter(cid =>
                            coffeeShopByAmenity.includes(cid) &&
                            coffeeShopByStyle.includes(cid) &&
                            coffeeShopsByTime.includes(cid)
                        )
                    }

                    if (coffeeShopIntersection.length === 0) {
                        coffeeShopIntersection = coffeeShopByDrink.filter(cid =>
                            coffeeShopByAmenity.includes(cid) &&
                            coffeeShopsByTime.includes(cid)
                        )
                    }

                    if (coffeeShopIntersection.length === 0) {
                        coffeeShopIntersection = coffeeShopByDrink.filter(cid =>
                            coffeeShopsByTime.includes(cid)
                        )
                    }

                    if (coffeeShopIntersection.length === 0) {
                        coffeeShopIntersection = coffeeShopByDrink;
                    }

                    const coffeeShops = await db.CoffeeShop.findAll({
                        where: {
                            cid: coffeeShopIntersection,
                        }
                    })

                    resolve({
                        // user: user,
                        coffeeShopByDrink: coffeeShopByDrink,
                        coffeeShopByAmenity: coffeeShopByAmenity,
                        coffeeShopByStyle: coffeeShopByStyle,
                        coffeeShopByService: coffeeShopByService,
                        coffeeShopsByTime: coffeeShopsByTime,
                        data: coffeeShopIntersection,
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
                min_price,
                max_price,
                open_time,
                end_time,
                waiting_time,
                style,
                service,
                amenity,
                uid
            } = criteria;

            // Xây dựng điều kiện where dựa trên các thuộc tính được truyền vào
            let whereClause = {};

            if (name) whereClause.name = { [db.Sequelize.Op.like]: `%${name}%` };
            if (min_price) whereClause.min_price = { [db.Sequelize.Op.gte]: min_price };
            if (max_price) whereClause.max_price = { [db.Sequelize.Op.lte]: max_price };
            if (open_time) whereClause.open_hour = { [db.Sequelize.Op.lte]: open_time };
            if (end_time) whereClause.close_hour = { [db.Sequelize.Op.gte]: end_time };
            if (waiting_time) whereClause.waiting_time = waiting_time;
            if (style) whereClause.style = style;

            // Xây dựng điều kiện include cho các bảng quan hệ
            let includeClause = [];
            if (service) {
                includeClause.push({
                    model: db.Include_service,
                    where: { sid: service },
                    required: true,
                    as: 'includeService'
                });
            }

            if (amenity) {
                includeClause.push({
                    model: db.Include_amenity,
                    where: { aid: amenity },
                    required: true,
                    as: 'includeAmenity'
                });
            }

            // Thực hiện truy vấn
            let coffeShops = await db.CoffeeShop.findAll({
                where: whereClause,
                include: includeClause,
                attributes: [
                    'cid', 'name', 'province_vie', 'province_jap',
                    'min_price', 'max_price', 'open_hour',
                    'close_hour', 'waiting_time', 'style', 'picture'
                ]
            });

            if (coffeShops.length > 0) {
                // Chuẩn bị dữ liệu để thêm vào bảng Searches
                let searchRecords = coffeShops.map(shop => ({
                    uid: uid,
                    cid: shop.cid,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }));

                // Thêm dữ liệu vào bảng Searches
                await db.Search.bulkCreate(searchRecords);
            }

            resolve(coffeShops);
        } catch (error) {
            console.error("Error in searchCoffeShopService: ", error);
            reject(error);
        }
    });
};



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

let getProfileData = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: email
                }
            });

            resolve({
                errCode: 0,
                errMessage: 'Successfully fetched data!',
                user,
            });
        } catch (e) {
            reject(e);
        }
    })
}


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

let saveProfileData = (email, phone, name, address) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm người dùng với email đã cho
            let user = await db.User.findOne({
                where: {
                    email: email
                }
            });

            if (user) {
                // Cập nhật các thông tin mới
                user.phoneNumber = phone;
                user.name = name;
                user.address = address;
                await user.save(); // Lưu thay đổi vào database

                resolve({
                    errCode: 0,
                    errMessage: 'Profile updated successfully!',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!',
                });
            }
        } catch (e) {
            reject({
                errCode: 500,
                errMessage: 'Internal server error!',
                error: e
            });
        }
    });
};

let adminChangePasswordService = async (email, oldPassword, newPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Fetch user by email
            let user = await db.User.findOne({
                where: { email: email },
            });

            if (!user) {
                return resolve({
                    errCode: 1,
                    errMessage: "User not found!"
                });
            } else {
                // Check if the old password matches the stored hashed password
                let isMatch = await bcrypt.compareSync(oldPassword, user.password);

                if (!isMatch) {
                    return resolve({
                        errCode: 2,
                        errMessage: "Old password is incorrect"
                    })
                } else {
                    // Hash the new password
                    const hashedPassword = await bcrypt.hash(newPassword, salt);

                    // Update the password in the database
                    user.password = hashedPassword;
                    await user.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Password updated successfully"
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCoffeeShopsService = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let shop = await db.CoffeeShop.findAll({})

            if (shop) {
                resolve({
                    shop: shop,
                    errCode: 0,
                    errMessage: 'Get all coffee shop successfully!',
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

let deleteCoffeeShopByAdminService = async (cid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let shop = await db.CoffeeShop.findOne({
                where: { cid: cid },
                raw: false,
            })
            if (!shop) {
                resolve({
                    errCode: 2,
                    errMessage: 'Coffee shop is not exist!'
                })
            } else {
                await shop.destroy();
                resolve({
                    errCode: 0,
                    message: 'Coffee shop has been deleted successfully'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getMostFavoriteShopService = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let favoriteIdIdShop = await db.Favorite_list.findOne({
                attributes: [
                    'cid',
                    [db.sequelize.fn('COUNT', db.sequelize.col('cid')), 'count']
                ],
                group: ['cid'],
                order: [[db.sequelize.literal('count'), 'DESC']],
                limit: 1
            })

            if (favoriteIdIdShop) {
                let favoriteShop = await db.CoffeeShop.findOne({
                    where: { cid: favoriteIdIdShop.cid },
                    attributes: ['name']
                })

                if (favoriteShop) {
                    resolve({
                        favoriteShop: favoriteShop,
                        errCode: 0,
                        errMessage: 'Get most favorite coffee shop successfully!',
                    })
                } else {
                    resolve({
                        favoriteShop: '',
                        errCode: 0,
                        errMessage: 'No most favorite coffee shop!',
                    })
                }
            } else {
                resolve({
                    favoriteShop: '',
                    errCode: 0,
                    errMessage: 'No most favorite coffee shop!',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getUserPreferenceService = (email) => {
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
                    attributes: {
                        exclude: ['id', 'userName', 'name', 'address', 'phoneNumber', 'role', 'avatar', 'password'] // Loại trừ cột email khỏi kết quả trả về
                    },
                    include: [
                        {
                            model: db.Favorite_amenity, as: 'favoriteAmenity',
                            attributes: ['aid']
                        },
                        {
                            model: db.Favorite_drink, as: 'favoriteDrink',
                            attributes: ['did']
                        },
                        {
                            model: db.Favorite_style, as: 'favoriteStyle',
                            attributes: ['style']
                        },
                        {
                            model: db.Favorite_service, as: 'favoriteService',
                            attributes: ['sid']
                        },
                        {
                            model: db.Favorite_time, as: 'favoriteTime',
                            attributes: ['time'],
                        },
                        {
                            model: db.Favorite_distance,
                            attributes: {
                                exclude: ['id', 'uid', 'createdAt', 'updatedAt']
                            },
                        },
                    ]
                });

                if (user) {

                    let amenityDetails = await db.Amenity.findAll({
                        where: { aid: user.favoriteAmenity.map(a => a.aid) },
                        attributes: ['aid', 'name_eng', 'name_jap']
                    })

                    let drinkDetails = await db.Drink.findAll({
                        where: { did: user.favoriteDrink.map(d => d.did) },
                        attributes: ['did', 'name_eng', 'name_ja']
                    })

                    let serviceDetails = await db.Service.findAll({
                        where: { sid: user.favoriteService.map(s => s.sid) },
                        attributes: ['sid', 'name_eng', 'name_jap']
                    })

                    resolve({
                        user: {
                            email: user.email,
                            favoriteStyle: user.favoriteStyle,
                            favoriteService: serviceDetails,
                            favoriteAmenity: amenityDetails,
                            favoriteDrink: drinkDetails,
                            favoriteDistance: user.Favorite_distance.distance,
                            favoriteTime: user.favoriteTime,

                        },
                        errCode: 0,
                        errMessage: 'Get user preference successfully!',
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

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: { exclude: ['password'] } // Loại bỏ trường password khỏi kết quả
            });

            if (users && users.length > 0) {
                resolve({
                    users: users,
                    errCode: 0,
                    errMessage: 'Get all users successfully!'
                });
            } else {
                resolve({
                    users: [],
                    errCode: 0,
                    errMessage: 'No users found!'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getRecentService = async (uid) => {
    return new Promise(async (resolve, reject) => {
        try {
            
        
            let searchResults = await db.Search.findAll({
                where: { uid: uid },
                attributes: ['cid'] // Chỉ lấy trường cid
            });

            // Lấy danh sách cid từ kết quả truy vấn
            let cids = searchResults.map(search => search.cid);

            // Lấy thông tin chi tiết của các cửa hàng cà phê từ bảng CoffeeShop
            let coffeeShops = await db.CoffeeShop.findAll({
                where: {
                    cid: cids // Chỉ lấy các cửa hàng có cid trong danh sách cids
                }
            });




            resolve({
                coffeeShops: coffeeShops,
                errCode: 0,
                errMessage: 'Get recent successfully!'
            });


        } catch (error) {
            reject(error);
        }
    });
};



module.exports = {
    handleLoginService: handleLoginService,
    saveUserPreferenceService: saveUserPreferenceService,
    getDataForSelectBoxUserPreferencePageService: getDataForSelectBoxUserPreferencePageService,
    getCoffeeShopForYouService: getCoffeeShopForYouService,
    searchCoffeShopService: searchCoffeShopService,
    createUser: createUser,
    getCoffeeShopRecentService: getCoffeeShopRecentService,
    getProfileData: getProfileData,
    saveProfileData: saveProfileData,
    adminChangePasswordService: adminChangePasswordService,
    getAllCoffeeShopsService: getAllCoffeeShopsService,
    deleteCoffeeShopByAdminService: deleteCoffeeShopByAdminService,
    getMostFavoriteShopService: getMostFavoriteShopService,
    getUserPreferenceService: getUserPreferenceService,
    getAllUser: getAllUser,
    getRecentService: getRecentService,
}