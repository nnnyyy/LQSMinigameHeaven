<template>
    <div id="main">
        <Top/>
        <Main/>        
    </div>
</template>
<script>
    import G from './global'
    import P from '../common/protocol'
    import $ from 'jquery'   
    import Top from './components/Top.vue' 
    import TopMenu from './components/TopMenuMobile.vue' 
    import MainGameView from './components/MainGameView.vue'
    import Main from './components/Main.vue'    

    export default {
        data: function() {
            return {                
            }
        },
        components: {
            Top,
            Main
        },
        created: function() {            
        },
        methods: {            
        },
        mounted() {            
        }
    }
</script>

<style scoped>
</style>