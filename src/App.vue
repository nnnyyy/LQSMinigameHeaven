<template>
    <div id="main" v-if="showInfo">
        <Top/>
        <Main/>        
    </div>
</template>
<script>
    import G from './global'
    import P from '../common/protocol'
    import $ from 'jquery'   
    import TopMenu from './components/TopMenuMobile.vue' 
    import MainGameView from './components/MainGameView.vue'
    import Main from './components/Main.vue'    

    export default {
        data: function() {
            return {
                showInfo: false
            }
        },
        components: {
            Main
        },
        created: function() {            
        },
        methods: {
            onCheckLoginRet(packet) {
                if( packet.ret === 0 ) {
                    G.connectSocket();
                    G.on(P.EnterUser, this.onEnterUser);
                }
                else {
                    window.location.href = '/login/'
                }
            },
            onEnterUser(packet) {
                this.showInfo = true;
            }
        },
        mounted: function() {            
            G.hget(P.http.CheckLogin, this.onCheckLoginRet);
        }
    }
</script>

<style scoped>
</style>