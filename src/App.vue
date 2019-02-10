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
    import Main from './components/Main.vue'    

    export default {
        data() {
            return {                
            }
        },
        components: {
            Top,
            Main
        },
        created() {
        },
        methods: {            
        },
        mounted() {
        }
    }
</script>

<style scoped>
</style>