<template>
    <div id="main">   
        <div class="ads-top">
            <adsense
            adClient="ca-pub-3598320494828213"
            adSlot="6063555131"
            adStyle="display:inline-block;width:320px; height:50px;"            
            >
            </adsense>
        </div>        
                                 
        <div class="title">
            랜덤 포인트 얻기
        </div>
        <msgbox
            :msg=msgRemain
            height=40px            
        />
        <GachaBox/>
        <msgbox
            v-show="resultVisible"
            :msg=msgResult            
            height=40px
            bgcolor='#9d0000'
            color='white'
        />
        <div class="ads-top">
            <adsense
            adClient="ca-pub-3598320494828213"
            adSlot="9659718043"
            adStyle="display:inline-block;width:320px; height:50px;"            
            fullWidthResponsive="true"
            >
            </adsense>
        </div>          
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    import GachaBox from './GachaBox.vue'

    export default {
        data: function() {
            return {
                msgRemain: '로드중',
                msgResult: ''    ,
                resultVisible: false            
            }
        },
        components: {  
            GachaBox          
        },
        created() {            
        },
        methods: {            
            onSetResultMsg(msg) {
                this.msgResult = msg;
                this.resultVisible = true;
            },
            onSetRemainMsg(msg) {
                this.msgRemain = msg;
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
            G.on(P.SetRemainMsg, this.onSetRemainMsg);
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

</style>