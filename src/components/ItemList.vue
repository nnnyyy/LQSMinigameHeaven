<template>
<div id="main">
    <ItemCardRandom reqGP=15 />
    <ItemCardChatEffect reqGP=50 />
    <div class="mat alcenter mgtb8">
        <template v-if="G.isMobile()">
            <adsense
            adClient="ca-pub-3598320494828213"
            adSlot="2407753256"
            adStyle="display:inline-block;width:320px;height:100px;"                        
            fullWidthResponsive="false"
            />
        </template>
        <template v-else>
            <adsense
            adClient="ca-pub-3598320494828213"
            adSlot="1216825049"
            adStyle="display:inline-block;width:728px;height:90px;"                        
            fullWidthResponsive="false"
            />
        </template>        
    </div>    
    <ItemCardRandomFontOnly reqGP=500 />
    <div class="mat alcenter mgtb8">
        <template v-if="G.isMobile()">
            <adsense
            adClient="ca-pub-3598320494828213"
            adSlot="5013925241"
            adStyle="display:inline-block;width:320px;height:100px;"                        
            fullWidthResponsive="false"
            />
        </template>
        <template v-else>
            <adfit
            unitId="DAN-tofpljkyvq06"
            adWidth="300"
            adHeight="250"
                    />
        </template> 
    </div>    
    <ItemCardChatMultiEffect reqGP=300 />
    <div class="mat alcenter mgtb8">
        <template v-if="G.isMobile()">
            <adsense
                        adClient="ca-pub-3598320494828213"
                        adSlot="9873210116"
                        adStyle="display:inline-block;width:300px;height:250px;"                        
                        fullWidthResponsive="false"
                        />            
        </template>
        <template v-else>
            <adsense
            adClient="ca-pub-3598320494828213"
            adSlot="1216825049"
            adStyle="display:inline-block;width:728px;height:90px;"                        
            fullWidthResponsive="false"
            />
        </template> 
    </div>  
    
    <ItemCardNickEffect reqGP=100 />
    <!--

    <template v-else>
        <div style="width: 970px; margin: 0 auto;">
            <adsense
                adClient="ca-pub-3598320494828213"
                adSlot="9714459258"
                adStyle="display:inline-block;width:970px;height:250px;"                        
                fullWidthResponsive="false"
            />
        </div>        
        <div style="width: 900px; margin: 20px auto;">
            현재 보유 GP : <span style="text-shadow: 1px 1px 1px red;font-size: 24px;">{{ currentGP }}</span> GP <span class="myinfoBtn" @click="onBtnMyInfo">내 아이템 정보</span> <span class="myinfoBtn" @click="onBtnFree">무료 가챠 페이지</span>
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
                                    <div style="height: 180px;">
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
                                            <tr>
                                                <td>고양이 서체</td>
                                                <td>0.05%</td>
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
                                    <div style="height: 40px;" class="item-title"><span style="color: red">랜덤</span> <span style="color: blue">멀티</span> <span style="color: green">채팅</span>  색상 ( 300GP )</div>
                                    <div style="height: 40px; font-size: 13px;">2~4개의 색상이 섞여서 나옵니다</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="item-btn">
                        <button class="btn-buy-item" @click="onBuyChatMultiColor()">구입하기</button>
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

        <table class="tb-list">
            <tr>
                <td>
                    <div class="item">
                        <table class="tb-item">
                            <tr>
                                <td>
                                    <div style="height: 40px; font-family: '궁서'" class="item-title">궁서체 구입 ( 2000GP )</div>
                                    <div style="height: 40px; font-size: 13px; font-family: '궁서'">진지한 폰트입니다. ( 2월말까지 )</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="item-btn">
                        <button class="btn-buy-item" @click="onBuyGungseo()">구입하기</button>
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
                    <div class="item">
                        <table class="tb-item">
                            <tr>
                                <td>
                                    <div>폰트 랜덤( 500GP )</div>
                                    <div style="height: 40px; font-size: 13px; ">
                                        랜덤 폰트 당첨률 20%<br/>
                                        실패확률 80%<br/>
                                        ( 고양체, 궁서체, 푸딩체 )
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="item-btn">
                        <button class="btn-buy-item" @click="onBuyFontRandom()">구입하기</button>
                    </div>                                
                </td>                                        
            </tr>
        </table>          
    </template>
    -->
</div>
</template>

<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    import ItemCardRandom from './ItemCardRandom.vue'
    import ItemCardRandomFontOnly from './ItemCardRandomFontOnly.vue'
    import ItemCardChatEffect from './ItemCardChatEffect.vue'
    import ItemCardChatMultiEffect from './ItemCardChatMultiEffect.vue'
    import ItemCardNickEffect from './ItemCardNickEffect.vue'

    export default {
        data() {
            return {                
                currentGP: 0,
                isProc: false
            }
        },
        components: {
            ItemCardRandom,
            ItemCardRandomFontOnly,
            ItemCardChatEffect,
            ItemCardChatMultiEffect,
            ItemCardNickEffect
        },
        created() {            
        },
        methods: {
            onLogin(data) {
                if( data.ret === 0 ) {
                    this.init();
                }
            },            
            init() {                
                this.G.reloadGP();
            },            
            onBuyAllRandom() {
                if( !this.isAbleProc() ) {
                    alert('아직 처리 중인 명령이 있습니다');
                    return;
                }

                this.isProc = true;                

                if( this.currentGP < 15 ) {
                    alert('포인트가 부족합니다!');
                    return;
                }
                
                G.hget(P.http.OpenGachaRand, data=> {
                    if( data.ret === 0 ) {
                        this.isProc = false;
                        G.hget(P.http.GetGachaPoint, this.getGachaPointRet);

                        this.SetTypeMsg(data.type, data.item.desc);
                    }
                    else {
                        alert('알 수 없는 오류');
                    }
                });
            },
            onBuyFontRandom() {
                if( !this.isAbleProc() ) {
                    alert('아직 처리 중인 명령이 있습니다');
                    return;
                }

                this.isProc = true;                

                if( this.currentGP < 500 ) {
                    alert('포인트가 부족합니다!');
                    return;
                }

                G.hget(P.http.OpenFontGachaRand, data=> {
                    if( data.ret === 0 ) {
                        console.log(data);
                        this.isProc = false;
                        G.hget(P.http.GetGachaPoint, this.getGachaPointRet);

                        this.SetTypeMsg(data.type, data.item.desc);
                    }
                    else {
                        alert('알 수 없는 오류');
                    }
                });
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
            onBuyGungseo() {
                if( !this.isAbleProc() ) {
                    alert('아직 처리 중인 명령이 있습니다');
                    return;
                }

                this.isProc = true;

                G.hget(P.http.OpenGachaGungseo, data=> {
                    if( data.ret === 0 ) {
                        G.hget(P.http.GetGachaPoint, this.getGachaPointRet);

                        const msg = `궁서체를 획득 했습니다. 저는 진지합니다.`;
                        G.emit(P.SetResultMsg, msg);

                        this.isProc = false;
                    }
                    else {
                        if( data.ret === -100 ) {
                            alert('판매가 일시적으로 중단되었습니다');
                        }
                        else {
                            alert('알 수 없는 오류');
                        }                        
                    }                    
                })
            },
            onBuyChatMultiColor() {
                if( this.cnt < 300 ) {
                    alert('가챠 포인트가 부족합니다');
                    return;
                }

                if( !this.isAbleProc() ) {
                    alert('아직 처리 중인 명령이 있습니다');
                    return;
                }

                this.isProc = true;
                
                G.hget(P.http.OpenGachaChatMultiColor, data=> {
                    if( data.ret === 0 ) {
                        G.hget(P.http.GetGachaPoint, this.getGachaPointRet);
                        
                        const msg = `${data.item.desc} 구입 성공!`;
                        G.emit(P.SetResultMsg, msg);

                        this.isProc = false;
                    }
                    else {
                        if( data.ret === -100 ) {
                            alert('판매가 일시적으로 중단되었습니다');
                        }
                        else {
                            alert('알 수 없는 오류');
                        }                        
                    }                    
                })
            },
            onBtnMyInfo() {
                window.location.href = '/myinfo';
            },
            onBtnFree() {
                window.location.href = '/free';
            }            
        },
        mounted() {
            G.on(P.Login, this.onLogin);
        }
    }
</script>


<style scoped>
</style>