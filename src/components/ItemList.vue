<template>
<div id="main">
    <template v-if="isMobile">
        <div style="width: 100%; margin: 14px auto; text-align:center;">
            현재 보유 GP : <span style="text-shadow: 1px 1px 1px red;font-size: 16px;">{{ currentGP }}</span> GP
        </div>
        <table class="tb-list">
            <tr>
                <td>
                    <adsense
                    adClient="ca-pub-3598320494828213"
                    adSlot="2407753256"
                    adStyle="display:inline-block;width:320px;height:100px;"                        
                    fullWidthResponsive="false"
                    />
                </td>
            </tr>
            <tr>
                <td class="item-title">
                    아무거나 랜덤( 15GP )
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0;">
                    <table class="tb-prob">
                        <tr>
                            <td>포인트 얻기</td>
                            <td>80%</td>
                        </tr>
                        <tr>
                            <td>랜덤 채팅 컬러</td>
                            <td>12%</td>
                        </tr>
                        <tr>
                            <td>랜덤 닉네임 강조 색상</td>
                            <td>6%</td>
                        </tr>
                        <tr>
                            <td>채팅 깜박임 효과</td>
                            <td>2%</td>
                        </tr>
                        <tr>
                            <td>빅 폰트 효과</td>
                            <td>0.2%</td>
                        </tr>
                        <tr>
                            <td>무지개 닉네임 효과</td>
                            <td>0.1%</td>
                        </tr>
                        <tr>
                            <td>노랑 빤짝이 채팅 효과</td>
                            <td>0.1%</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="item-btn line">
                    <button class="btn-buy-item" @click="onBuyAllRandom()">구입하기</button>
                </td>
            </tr>

            <tr>
                <td>
                    <adsense
                    adClient="ca-pub-3598320494828213"
                    adSlot="5013925241"
                    adStyle="display:inline-block;width:320px;height:100px;"                        
                    fullWidthResponsive="false"
                    />
                </td>
            </tr>

            <tr>
                <td>
                    <div style="height: 40px;" class="item-title">경험치(점수) 가챠( 1GP )</div>
                    <div style="height: 40px; font-size: 13px;">1~50 포인트 중 랜덤</div>
                </td>
            </tr>            
            <tr>
                <td class="item-btn line">
                    <button class="btn-buy-item" @click="onBuyPoint()">구입하기</button>
                </td>
            </tr>

            <tr>
                <td>
                    <div style="height: 40px;" class="item-title">랜덤 채팅 색상 ( 50GP )</div>
                    <div style="height: 40px; font-size: 13px;">채팅 폰트 색상을 랜덤하게 뽑습니다</div>
                </td>
            </tr>            
            <tr>
                <td class="item-btn line">
                    <button class="btn-buy-item" @click="onBuyRandChatColor()">구입하기</button>
                </td>
            </tr>            
            <tr>
                <td>
                    <div style="height: 40px;" class="item-title">랜덤 닉네임 강조 색상 ( 100GP )</div>
                    <div style="height: 40px; font-size: 13px;">닉네임을 다양한 색으로 강조할 수 있습니다.</div>
                </td>
            </tr>            
            <tr>
                <td class="item-btn line">
                    <button class="btn-buy-item" @click="onBuyRandNickEffect()">구입하기</button>
                </td>
            </tr>
        </table>
    </template>

    <!-- PC 버젼 시작 -->

    <template v-else>
        <div style="width: 900px; margin: 20px auto;">
            현재 보유 GP : <span style="text-shadow: 1px 1px 1px red;font-size: 24px;">{{ currentGP }}</span> GP <span class="myinfoBtn" @click="onBtnMyInfo">내 아이템 정보</span>
        </div>
        <div style="border: 0.5px solid gray; margin: 20px auto; width: 900px; height: 1px;"/>
        <table class="tb-list">
            <tr>
                <td>
                    <div class="item">
                        <table class="tb-item">
                            <tr>
                                <td>
                                    <div style="height: 40px;" class="item-title">아무거나 랜덤( 15GP )</div>
                                    <div style="height: 160px;">
                                        <table class="tb-prob">
                                            <tr>
                                                <td>포인트 얻기</td>
                                                <td>80%</td>
                                            </tr>
                                            <tr>
                                                <td>랜덤 채팅 컬러</td>
                                                <td>12%</td>
                                            </tr>
                                            <tr>
                                                <td>랜덤 닉네임 강조 색상</td>
                                                <td>6%</td>
                                            </tr>
                                            <tr>
                                                <td>채팅 깜박임 효과</td>
                                                <td>2%</td>
                                            </tr>
                                            <tr>
                                                <td>빅 폰트 효과</td>
                                                <td>0.2%</td>
                                            </tr>
                                            <tr>
                                                <td>무지개 닉네임 효과</td>
                                                <td>0.1%</td>
                                            </tr>
                                            <tr>
                                                <td>노랑 빤짝이 채팅 효과</td>
                                                <td>0.1%</td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="item-btn">
                        <button class="btn-buy-item" @click="onBuyAllRandom()">구입하기</button>
                    </div>
                </td>
                <td>
                    <div class="item">
                        <table class="tb-item">
                            <tr>
                                <td>
                                    <div style="height: 40px;" class="item-title">경험치(점수) 가챠( 1GP )</div>
                                    <div style="height: 40px; font-size: 13px;">1~50 포인트 중 랜덤</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="item-btn">
                        <button class="btn-buy-item" @click="onBuyPoint()">구입하기</button>
                    </div>
                </td>
                <td>
                    <ads300x250
                        unitId="DAN-tofpljkyvq06"
                    />
                </td>                                        
            </tr>
        </table>  
        <div style="border: 0.5px solid gray; margin: 20px auto; width: 900px; height: 1px;"/>
        <div style="margin: 0 auto; width: 728px; height: 90px;">
            <adsense
            adClient="ca-pub-3598320494828213"
            adSlot="1216825049"
            adStyle="display:inline-block;width:728px;height:90px;"                        
            fullWidthResponsive="false"
            />
        </div>
        <div style="border: 0.5px solid gray; margin: 20px auto; width: 900px; height: 1px;"/>
        
        <table class="tb-list">
            <tr>
                <td>
                    <div class="item">
                        <table class="tb-item">
                            <tr>
                                <td>
                                    <div style="height: 40px;" class="item-title">랜덤 채팅 색상 ( 50GP )</div>
                                    <div style="height: 40px; font-size: 13px;">채팅 폰트 색상을 랜덤하게 뽑습니다</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="item-btn">
                        <button class="btn-buy-item" @click="onBuyRandChatColor()">구입하기</button>
                    </div>
                </td>
                <td>
                    <adsense
                        adClient="ca-pub-3598320494828213"
                        adSlot="9873210116"
                        adStyle="display:inline-block;width:300px;height:250px;"                        
                        fullWidthResponsive="false"
                        />
                </td>
                <td>
                    <div class="item">
                        <table class="tb-item">
                            <tr>
                                <td>
                                    <div style="height: 40px;" class="item-title">랜덤 닉네임 강조 색상 ( 100GP )</div>
                                    <div style="height: 40px; font-size: 13px;">닉네임을 다양한 색으로 강조할 수 있습니다.</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="item-btn">
                        <button class="btn-buy-item" @click="onBuyRandNickEffect()">구입하기</button>
                    </div>
                </td>                                        
            </tr>
        </table>              
        <div style="border: 0.5px solid gray; margin: 20px auto; width: 900px; height: 1px;"/>
    </template>
</div>
</template>

<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    export default {
        data() {
            return {
                isMobile: G.isMobile(),
                currentGP: 0,
                isProc: false
            }
        },
        components: {              
        },
        created() {            
        },
        methods: {
            onLogin(data) {
                if( data.ret === 0 ) {
                    this.init();
                }
            },
            getGachaPointRet(info) {                
                this.currentGP = info.gp;
                G.emit(P.GachaPoint, info.gp);                
            },
            init() {                
                G.hget(P.http.GetGachaPoint, this.getGachaPointRet);
            },
            isAbleProc() {
                return !this.isProc;
            },
            onBuyAllRandom() {
                if( !this.isAbleProc() ) {
                    alert('아직 처리 중인 명령이 있습니다');
                    return;
                }

                this.isProc = true;

                const GTYPE = {
                    BOX: 0,
                    FONTCOLOR: 1,
                    NICKSHADOW: 2,
                    BLINK: 3,
                    RAINBOWNICK: 4,
                    YELLOWBLINK: 5,
                    BIGFONT: 6
                }

                if( this.cnt < 15 ) {
                    alert('포인트가 부족합니다!');
                    return;
                }
                
                G.hget(P.http.OpenGachaRand, data=> {
                    if( data.ret === 0 ) {
                        this.isProc = false;
                        G.hget(P.http.GetGachaPoint, this.getGachaPointRet);

                        let msg = ''
                        switch(data.type) {
                            case GTYPE.BOX: msg=`포인트를 ${data.item.desc} 획득했습니다.`; break;
                            case GTYPE.FONTCOLOR: msg=`폰트 색상 ${data.item.desc}을 획득했습니다.`; break;
                            case GTYPE.NICKSHADOW: msg=`닉네임 효과 ${data.item.desc}를 획득했습니다.`; break;
                            case GTYPE.BLINK: msg='##채팅 깜빡임 효과##를 획득했습니다. 축하합니다!'; break;
                            case GTYPE.RAINBOWNICK: msg='@#@#@#@# !!레인보우 닉네임 효과 획득!! #@#@#@#@'; break;
                            case GTYPE.YELLOWBLINK: msg='@#@#@#@# !!노랑 빤짝이 효과 획득!! #@#@#@#@'; break;
                            case GTYPE.BIGFONT: msg='@#@#@#@# !!빅 폰트 효과 획득!! #@#@#@#@'; break;
                        }
                        
                        G.emit(P.SetResultMsg, msg);
                    }
                    else {
                        alert('알 수 없는 오류');
                    }
                })                
            },
            onBuyPoint() {
                if( !this.isAbleProc() ) {
                    alert('아직 처리 중인 명령이 있습니다');
                    return;
                }

                this.isProc = true;

                G.hget(P.http.OpenGacha, info=> {
                    if( info.ret === -2 ) {
                        alert('가챠 포인트가 부족합니다.');
                        window.location.href = '/';
                        return;                    
                    }

                    this.isProc = false;                    

                    const msg = `${info.item.name}을(를) ${info.item.desc} 획득하셨습니다`;
                    
                    G.emit(P.SetResultMsg, msg);
                    G.hget(P.http.GetGachaPoint, this.getGachaPointRet);
                })
            },
            onBuyRandChatColor() {
                if( !this.isAbleProc() ) {
                    alert('아직 처리 중인 명령이 있습니다');
                    return;
                }

                this.isProc = true;

                G.hget(P.http.OpenGachaFontColor, data=> {
                    if( data.ret === 0 ) {
                        G.hget(P.http.GetGachaPoint, this.getGachaPointRet);

                        const msg = `${data.item.desc} 색을 획득하셨습니다. 채팅에 사용 가능합니다.`;
                        G.emit(P.SetResultMsg, msg);

                        this.isProc = false;
                    }
                    else {
                        alert('알 수 없는 오류');
                    }
                })
            },
            onBuyRandNickEffect() {
                if( !this.isAbleProc() ) {
                    alert('아직 처리 중인 명령이 있습니다');
                    return;
                }

                this.isProc = true;

                G.hget(P.http.OpenGachaNickShadow, data=> {
                    if( data.ret === 0 ) {
                        G.hget(P.http.GetGachaPoint, this.getGachaPointRet);

                        const msg = `${data.item.desc} 색을 획득하셨습니다. 닉네임 꾸미기에 사용 가능합니다.`;
                        G.emit(P.SetResultMsg, msg);

                        this.isProc = false;
                    }
                    else {
                        alert('알 수 없는 오류');
                    }
                })
            },
            onBtnMyInfo() {
                window.location.href = '/myinfo';
            }
        },
        mounted() {
            G.on(P.Login, this.onLogin);
        }
    }
</script>


<style scoped>
@media screen and (max-width: 500px) {
    .tb-list {
        width: 95%;        
        margin: 0 auto;
    }

    .tb-list td {
        text-align: center;
    }

    .tb-list .item-btn {
        height: 50px;
    }

    .line {
        border-bottom: 1px solid black;
    }

    .tb-prob {
        width: 95%;
        font-size: 13px;
    }

    .item-title {
        height: 36px;
        font-size: 20px;
        text-shadow: 1px 1px 1px #f40000;
    }

    .btn-buy-item {
        width: 100%;
        height: 100%;
        border: none;  
        font-size: 17px;
    }
}

@media screen and (min-width: 501px) {    

    .tb-list {        
        width: auto;
        height: 250px;
        margin: 20px auto;
        border-collapse: collapse;
    }

    .tb-list td {
        width: 300px;
        height: 250px;
        text-align: center;
        border-left: gray 3px dotted;
        border-right: gray 3px dotted;
    }

    .tb-list .item {
        width: 100%;
        height: 200px;
        background-color: red;
    }

    .tb-list .item-btn {
        height: 50px;
    }

    .tb-item {
        width: 100%;
        height: 100%;
    }

    .tb-item td {
        border: none;
    }

    .item-title {
        font-size: 18px;
    }

    .btn-buy-item {
        width: 100%;
        height: 100%;
        border: none;  
        font-size: 17px;      
        cursor: pointer;
    }

    .btn-buy-item:hover {
        animation-duration: 0.3s;
        animation-name: btnEffect;   
        animation-fill-mode: forwards;   
    }

    @keyframes btnEffect {
        from {
            color: #000000;
            font-size: 17px;
        }   

        to {
            color: #f40000;
            font-size: 25px;   
            font-weight: bolder;            
        }     
    }

    .tb-prob {
        height: 80%;
        width: 80%;
        margin: 0 auto;
    }

    .tb-prob td {
        height: auto;
        font-size: 13px;
        text-align: center;
    }

    .tb-prob td:first-child {
        width: 80%;
    }

    .myinfoBtn {
        background-color: #6d6d6d;
        padding: 6px;
        border-bottom: 2px solid black;
        border-right: 2px solid black;
        color: white;
        cursor: pointer;
    }
}
</style>