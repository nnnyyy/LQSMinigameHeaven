<template>
    <div id="HomeMain">        
        <GachaMsgBox :msg=msgResult v-show="resultVisible" />        
        <TopAds/>
        <div class="myinfo mat alcenter"><span class="btnBuy" @click="onBtnFree">무료가챠 페이지</span> | <span class="btnBuy" @click="onBtnMyInfo">내 인벤토리</span></div>
        <div class="myinfo mat alcenter">남은 GP : {{curGP}} GP</div>
        <ItemList/>
    </div>
</template>
<script>    
    import P from '../../common/protocol'
    import $ from 'jquery'
    import TopAds from './TopAds.vue'
    import ItemList from './ItemList.vue'
    import GachaMsgBox from './GachaMsgBox.vue'

    export default {
        data() {
            return {
                msgResult: '',
                resultVisible: false,
                curGP: 0
            }
        },
        components: { 
            GachaMsgBox,
            TopAds,    
            ItemList         
        },
        created() {
            this.G.on(P.GachaPoint, gp=> this.curGP = gp);
        },
        methods: {
            onCheckLoginRet(data){
                if( data.ret !== 0 ) {
                    window.location.href = '/login/';
                    return;
                }                
                this.G.emit(P.Login, data);
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
                },3000);
            },
            onBtnMyInfo() {
                window.location.href = '/myinfo';
            },
            onBtnFree() {
                window.location.href = '/free';
            } 
        },
        mounted() {            
            this.G.hget(P.http.CheckLogin, this.onCheckLoginRet);
            this.G.on(P.SetResultMsg, this.onSetResultMsg);            
        }
    }
</script>

<style scoped>
#HomeMain {    position: relative;    width: 100%;    height: auto;}
.myinfo  { margin: 20px; font-size: 120%; }

@media screen and (max-width: 500px) {
    
}

@media screen and (min-width: 501px) {
    
}
</style>