import db from '../models/index'
let getHomePage = async (req, res) => {
    // ở đây không cần ghi đường dẫn tới file homePage.ejs vì trong file
    // viewEngine ở thư mục config, tôi đã định nghĩa tất cả các file view thì tìm
    // trong thư mục .src/views rồi
    try {
        //tìm tất cả dữ liệu trong bảng user
        let data = await db.User.findAll();
        //in ra màn hình console các dữ liệu
        console.log('-------------');
        console.log(data);
        console.log('-------------');
        // lí do trong file config.json ở thư mục config phần development có thêm thuộc tính
        // "logging": false vì mỗi lần chương trình truy vấn thì nó lại ghi ra câu lệnh 
        // truy vấn, câu lệnh trên sẽ làm nó không in ra câu lệnh truy vấn nữa
        return res.render('homePage.ejs', {
            //trả lại thêm đối tượng data ra file view
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }

}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

module.exports = {
    // câu lệnh export ra nhiều đối tượng hàm
    // một đối tượng hàm cần có key:value
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
}