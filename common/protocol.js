/**
 * Created by nnnyy on 2018-11-24.
 */
const VueBus = {
    GoLoginPage: "GoLoginPage",
    Disconnect: "disconnect",
    EnterUser: "EnterUser",
    SetResultMsg: "SetResultMsg",
    SetRemainPoint: "SetRemainPoint",
    GachaPoint: "GachaPoint",
    Login: "Login",
    http: {
        CheckLogin: "/auth/checklogin",
        Login: "/auth/login",
        OpenGacha: "/gacha/open",
        GetGachaPoint: "/gacha/get",
        Logout:"/auth/logout",
        OpenGachaFontColor: "/gacha/fontcoloropen",
        OpenGachaNickShadow: "/gacha/nickshadowopen",
        OpenGachaBlink: "/gacha/blinkopen",
        OpenGachaRand: "/gacha/randopen",
        MyInfo: "/auth/myinfo",
        SellItem: "/gacha/sellitem",
        GetFreeGachaLogRecent: "/gacha/freeGachaLogRecent"
    }
};

module.exports = VueBus;