/**
 * Created by nnnyy on 2018-11-24.
 */
const VueBus = {
    GoLoginPage: "GoLoginPage",
    Disconnect: "disconnect",
    EnterUser: "EnterUser",
    SetResultMsg: "SetResultMsg",
    SetRemainMsg: "SetRemainMsg",
    http: {
        CheckLogin: "/auth/checklogin",
        Login: "/auth/login",
        OpenGacha: "/gacha/open",
        GetGachaPoint: "/gacha/get"
    }
};

module.exports = VueBus;