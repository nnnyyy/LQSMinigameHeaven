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
        <ItemList/>                    
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'
    import ItemList from './ItemList.vue'

    export default {
        data() {
            return {
                msgResult: '',
                resultVisible: false
            }
        },
        components: {     
            ItemList         
        },
        created() {            
        },
        methods: {
            onCheckLoginRet(data){
                if( data.ret !== 0 ) {
                    window.location.href = '/login/';
                    return;
                }                
                G.emit(P.Login, data);
            },
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
            }
        },
        mounted() {            
            G.hget(P.http.CheckLogin, this.onCheckLoginRet);
            G.on(P.SetResultMsg, this.onSetResultMsg);
        }
    }
</script>

<style scoped>
#main {
    position: relative;
    width: 100%;
    height: auto;
}

@media screen and (max-width: 500px) {
    
}

@media screen and (min-width: 501px) {
    
}
</style>