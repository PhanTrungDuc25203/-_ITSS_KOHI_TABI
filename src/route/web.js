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

    //user-preference api
    router.post('/api/save-user-preference', userController.saveUserPreference);
    router.post('/api/add-favorite-coffee-shop', coffeeShopController.addFavoriteCoffeeShop); // Thêm route ở đây
    router.get('/api/get-data-for-select-box-user-preference-page', userController.getDataForSelectBoxUserPreferencePage);
    router.get('/api/get-coffee-shop-for-you', userController.getCoffeeShopForYou);
    router.get('/api/search-coffeshop',userController.searchCoffeShop);
    return app.use("/", router);
}
module.exports = initWebRoutes;