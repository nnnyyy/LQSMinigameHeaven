<template>
    <div id="main">
        <div style="position:fixed; top:0; width: 100%; z-index: 400000;" v-show="resultVisible">
            <msgbox                
                :msg=msgResult            
                height=40px
                bgcolor='#9d0000'
                color='white'
            />   
        </div>        
        <div class="ads-top">
            <adsense
            adClient="ca-pub-3598320494828213"
            adSlot="6063555131"
            adStyle="display:inline-block;width:320px; height:50px;"            
            >
            </adsense>
        </div>        

        <msgbox
            :msg=msgRemain
            height=40px
            fontsize=20px
        />            
        <div class="title">
            랜덤 뽑기 ( 25GP )
        </div>
        <div class="subtitle">
            확률            
        </div>        
        <GachaRand/>
        <div class="line"></div>  
        <div class="title">
            포인트 얻기 ( 1 ~ 50 )
        </div>        
        <GachaBox/>        
        <div class="ads-top">
            <adsense
            adClient="ca-pub-3598320494828213"
            adSlot="9659718043"
            adStyle="display:inline-block;width:320px; height:50px;"            
            fullWidthResponsive="true"
            >
            </adsense>
        </div>  
        <div class="line"></div>   
        <div class="title">
            랜덤 폰트 컬러 구입 ( 50GP )
        </div>
        <GachaFontColor/>        

        <div class="line"></div>  

        <div class="title">
            랜덤 닉네임 강조 색상 ( 100GP )
        </div>
        <GachaNickShadow/>       
        <div class="line"></div>  
        <div class="title">
            채팅 깜빡이기 아이템 ( 800GP )
        </div>
        <div class="subtitle">
            한번 구입하면 다시 구입 안하셔도 됩니다.
        </div>
        <GachaBlink/>
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    import GachaBox from './GachaBox.vue'
    import GachaFontColor from './GachaFontColor.vue'
    import GachaNickShadow from './GachaNickShadow.vue'
    import GachaBlink from './GachaBlink.vue'
    import GachaRand from './GachaRand.vue'

    export default {
        data() {
            return {
                msgRemain: '로드중',
                msgResult: ''    ,
                resultVisible: false,
                lastTimeoutIdx: -1
            }
        },
        components: {  
            GachaBox,
            GachaFontColor,
            GachaNickShadow,
            GachaBlink,
            GachaRand
        },
        created() {            
        },
        methods: {            
            onSetResultMsg(msg) {
                this.msgResult = msg;
                this.resultVisible = true;
                if( this.lastTimeoutIdx ) {
                    clearTimeout( this.lastTimeoutIdx );
                    this.lastTimeoutIdx = -1;
                }
                
                this.lastTimeoutIdx = setTimeout(()=> {
                    this.resultVisible = false;
                },7000);
            },
            onSetRemainGacha(msg) {
                this.msgRemain = `남은 GP : ${msg}GP`;
            },
            onBtnLogout() {
                G.hget(P.http.Logout, data=> {
                    if( data.ret === 0 ) {
                        alert('로그아웃 되었습니다.');
                        window.location.href = '/';
                    }
                });
            },
            onCheckLoginRet(packet) {                
                if( packet.ret === 0 ) {                                 
                    this.showInfo = true;
                    G.emit(P.Login);                    
                    
                }
                else {
                    window.location.href = '/login/'
                }
            }
        },
        mounted() {
            G.on(P.SetResultMsg, this.onSetResultMsg);
            G.on(P.GachaPoint, this.onSetRemainGacha);
            G.hget(P.http.CheckLogin, this.onCheckLoginRet);   
        }
    }
</script>

<style scoped>
#main {
    position: relative;
    width: 100%;
    height: calc(100vh - 78px);    
}

.ads-top {
    margin: 0 auto;        
}

.title {
    margin: 0 auto;
    text-align: center;
    color: #9d0000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bolder;
}

.subtitle {
    margin: 0 auto;
    text-align: center;
    color: gray;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;    
    font-size: 14px;
}

@media screen and (max-width: 500px) {
    .ads-top {
        position: relative;
        width: 80%;
        height: 50px;
    }

    .title {
        width: 80%;
    }
}

@media screen and (min-width: 501px) {
    .ads-top {
        width: 800px;
        text-align: center;
    }

    .title {
        width: 800px;
        font-size: 20px;
    }
}

.line {
    height: 1px;
    width: 80%;
    border-top: 1px dotted gray;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>