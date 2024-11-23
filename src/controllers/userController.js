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

module.exports = {
    handleLogin: handleLogin,
}