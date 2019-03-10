/**
 * Created by nnnyy on 2018-11-24.
 */
const VueBus = {
    SOCK: {
        GachaRealtimeLog: "GachaRealtimeLog",
        AntiMacroQuiz: "AntiMacroQuiz"
    },    
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
        OpenGachaGungseo: "/gacha/gungseo",
        OpenGachaChatMultiColor: "/gacha/chatmulticolor",
        OpenGachaBlink: "/gacha/blinkopen",
        OpenGachaRand: "/gacha/randopen",
        MyInfo: "/auth/myinfo",
        SellItem: "/gacha/sellitem",
        GetFreeGachaLogRecent: "/gacha/freeGachaLogRecent"
    }
};

module.exports = VueBus;