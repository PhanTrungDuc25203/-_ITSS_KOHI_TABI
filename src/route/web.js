import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import coffeeShopController from "../controllers/coffeeShopController";

let router = express.Router();

let initWebRoutes = (app) => {
    //nơi định nghĩa các đường dẫn của trang web
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.post('/api/login', userController.handleLogin);
    //những gì ở phía React thì phân biệt bằng các thêm tiền tố /api/ vào trước các route

    //get-all-coffee-shop api
    router.get('/api/get-all-coffee-shop', coffeeShopController.getAllCoffeeShops);
    router.get('/api/get-coffee-shop/:id', coffeeShopController.getCoffeeShopById);
    router.get('/api/get-users-favoriting-coffee-shop/:id', coffeeShopController.getUsersFavoritingCoffeeShop);
    router.get('/api/is-favorite-coffee-shop', coffeeShopController.isFavoriteCoffeeShop);
    router.put('/api/remove-favorite-coffee-shop', coffeeShopController.removeFavoriteCoffeeShop);
    router.get('/api/get-list-favorite-coffee-shop/:id', coffeeShopController.getListFavoriteCoffeeShop);

    //user-preference api
    router.post('/api/save-user-preference', userController.saveUserPreference);
    router.post('/api/add-favorite-coffee-shop', coffeeShopController.addFavoriteCoffeeShop); // Thêm route ở đây
    router.get('/api/get-data-for-select-box-user-preference-page', userController.getDataForSelectBoxUserPreferencePage);
    router.get('/api/get-coffee-shop-for-you', userController.getCoffeeShopForYou);
    router.get('/api/search-coffeshop', userController.searchCoffeShop);
    router.get('/api/get-coffee-shop-recent', userController.getCoffeeShopRecent);
    router.get('/api/signup', userController.handleSignUp);

    router.get('/api/getuserdata', userController.getUserProfileData);
    router.get('/api/saveuserdata', userController.saveUserProfileData);

    //admin
    router.post('/api/admin-change-password', userController.adminChangePassword);
    router.get('/api/get-all-coffee-shops', userController.getAllCoffeeShops);
    router.post('/api/delete-coffee-shop-by-admin', userController.deleteCoffeeShopByAdmin);
    router.get('/api/get-most-favorite-shop', userController.getMostFavoriteShop);

    return app.use("/", router);
}
module.exports = initWebRoutes;