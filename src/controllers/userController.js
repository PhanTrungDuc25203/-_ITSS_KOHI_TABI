import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let usernameOrEmail = req.body.usernameOrEmail;
    let password = req.body.password;
    if (!usernameOrEmail || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter(s)!'
        })
    }

    let userData = await userService.handleLoginService(usernameOrEmail, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let saveUserPreference = async (req, res) => {
    try {
        let response = await userService.saveUserPreferenceService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: `Save user's preference error!`
        })
    }
}

let getDataForSelectBoxUserPreferencePage = async (req, res) => {
    try {
        let response = await userService.getDataForSelectBoxUserPreferencePageService();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: `Get user's preference error!`
        })
    }
}

let getCoffeeShopForYou = async (req, res) => {
    try {
        let response = await userService.getCoffeeShopForYouService(req.query.email);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: `Get user's favorite coffee shop error!`
        })
    }
}

let getCoffeeShopRecent = async (req, res) => {
    try {
        let response = await userService.getCoffeeShopRecentService();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: `Get recent favorite coffee shop error!`
        })
    }
}

let searchCoffeShop = async (req, res) => {
    console.log("Dit cu may");
    try {
        let name = req.query.name;
        let min_price = req.query.min_price;
        let max_price = req.query.max_price;
        let open_time = req.query.open_time;
        let end_time = req.query.end_time;
        let waiting_time = req.query.waiting_time;
        let style = req.query.style;
        let service = req.query.service;
        let amenity = req.query.amenity;



        let searchCriteria = {
            name,
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
        let coffeShops = await userService.searchCoffeShopService(searchCriteria);

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

const handleSignUp = async (req, res) => {
    try {
        let username = req.query.username;
        let password = req.query.password;
        let email = req.query.email;
        let confirmPassword = req.query.confirmPassword;
        let phone = req.query.phone;

        // Kiểm tra input cơ bản
        if (!email || !username || !password || !confirmPassword || !phone) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields!',
            });
        }

        // Kiểm tra xác nhận mật khẩu
        if (password !== confirmPassword) {
            return res.status(400).json({
                errCode: 2,
                message: 'Password and Confirm Password do not match!',
            });
        }

        // Gọi service để xử lý tạo user
        const result = await userService.createUser(username, password, email, phone);

        // Xử lý kết quả trả về từ service
        if (result.errCode !== 0) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error('Error in handleSignUp:', error);
        return res.status(500).json({
            errCode: -1,
            message: 'An error occurred while signing up. Please try again later.',
        });
    }
};


const getUserProfileData = async (req, res) => {
    try {
        let email = req.query.email;

        // Kiểm tra input cơ bản
        if (!email) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields!',
            });
        }


        // Gọi service để xử lý tạo user
        const result = await userService.getProfileData(email);

        // Xử lý kết quả trả về từ service
        if (result.errCode !== 0) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error('Error in get user data:', error);
        return res.status(500).json({
            errCode: -1,
            message: 'An error occurred while getting data. Please try again later.',
        });
    }
};

const saveUserProfileData = async (req, res) => {
    try {
        let email = req.query.email;
        let phone = req.query.phone;
        let name = req.query.name;
        let address = req.query.address;

        // Kiểm tra input cơ bản
        if (!email || !phone || !name || !address) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields!',
            });
        }


        // Gọi service để xử lý tạo user
        const result = await userService.saveProfileData(email, phone, name, address);

        // Xử lý kết quả trả về từ service
        if (result.errCode !== 0) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error('Error in get user data:', error);
        return res.status(500).json({
            errCode: -1,
            message: 'An error occurred while saving data. Please try again later.',
        });
    }
};

let adminChangePassword = async (req, res) => {
    let email = req.body.email;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    if (!email || !oldPassword || !newPassword) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter(s)!'
        })
    }

    let data = await userService.adminChangePasswordService(email, oldPassword, newPassword)
    return res.status(200).json({
        errCode: data.errCode,
        message: data.errMessage
    })
}

let getAllCoffeeShops = async (req, res) => {
    try {
        let infor = await userService.getAllCoffeeShopsService();

        if (infor.errCode !== 0) {
            return res.status(400).json({
                errCode: infor.errCode,
                errMessage: 'Get all Coffee Shop information error!'
            });
        }

        return res.status(200).json(infor);

    } catch (error) {
        console.error('Error in get user data:', error);
        return res.status(500).json({
            errCode: -1,
            message: 'An error occurred while getting data. Please try again later.',
        });
    }
}

module.exports = {
    handleLogin: handleLogin,
    saveUserPreference: saveUserPreference,
    getDataForSelectBoxUserPreferencePage: getDataForSelectBoxUserPreferencePage,
    getCoffeeShopForYou: getCoffeeShopForYou,
    searchCoffeShop: searchCoffeShop,
    handleSignUp: handleSignUp,
    getCoffeeShopRecent: getCoffeeShopRecent,
    getUserProfileData: getUserProfileData,
    saveUserProfileData: saveUserProfileData,
    adminChangePassword: adminChangePassword,
    getAllCoffeeShops: getAllCoffeeShops,
}