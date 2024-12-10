import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    //nơi định nghĩa các đường dẫn của trang web
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.post('/api/login', userController.handleLogin);
    //những gì ở phía React thì phân biệt bằng các thêm tiền tố /api/ vào trước các route

    //user-preference api
    router.post('/api/save-user-preference', userController.saveUserPreference);
    router.get('/api/get-data-for-select-box-user-preference-page', userController.getDataForSelectBoxUserPreferencePage);
    router.get('/api/get-coffee-shop-for-you', userController.getCoffeeShopForYou);
    router.post('/api/search-coffeshop',userController.searchCoffeShop);
    return app.use("/", router);
}
module.exports = initWebRoutes;