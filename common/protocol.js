/**
 * Created by nnnyy on 2018-11-24.
 */
const VueBus = {
    GoLoginPage: "GoLoginPage",
    Disconnect: "disconnect",
    EnterUser: "EnterUser",
    SetResultMsg: "SetResultMsg",
    SetRemainMsg: "SetRemainMsg",
    Login: "Login",
    http: {
        CheckLogin: "/auth/checklogin",
        Login: "/auth/login",
        OpenGacha: "/gacha/open",
        GetGachaPoint: "/gacha/get",
        Logout:"/auth/logout"
    }
};

module.exports = VueBus;