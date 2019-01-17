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
            }
        },
        mounted() {
            G.on(P.SetResultMsg, this.onSetResultMsg);
            G.on(P.SetRemainMsg, this.onSetRemainMsg);
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