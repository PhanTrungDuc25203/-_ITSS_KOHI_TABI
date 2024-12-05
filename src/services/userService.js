import db from "../models/index";
import bcrypt from "bcryptjs";

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

module.exports = {
    handleLoginService: handleLoginService,
    saveUserPreferenceService: saveUserPreferenceService,
    getDataForSelectBoxUserPreferencePageService: getDataForSelectBoxUserPreferencePageService,
}