<template>
    <div id="main">                
        <msgbox
            :msg=msgRemain
            height=40px
        />
        <GachaBox/>
        <msgbox
            :msg=msgResult
            height=40px
        />
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
                msgResult: ''                
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
</style>