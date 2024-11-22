import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    //nơi định nghĩa các đường dẫn của trang web
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);


    //những gì ở phía React thì phân biệt bằng các thêm tiền tố /api/ vào trước các route
    return app.use("/", router);
}
module.exports = initWebRoutes;