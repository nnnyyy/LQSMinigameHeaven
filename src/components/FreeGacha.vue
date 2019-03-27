<template>
    <div id="id">
        <Top/>
        <div class="content">
            <div class="t">무료가챠 페이지가 이동되었습니다. 모바일 버젼은 곧 제작할게요. </div>
            <div class="t"><button @click="onMove">이동하기</button></div>
        </div>
    </div>       

</template>
<script>
    import Top from './Top.vue'
    import FreeGachaRealtimeLog from './FreeGachaRealtimeLog.vue'

    export default {
        data() {
            return {                  
            }
        },
        components: {
            Top
        },
        methods: {     
            onMove() {
                window.location.href = "http://databucket.duckdns.org:4700/gpshop/free";
            }       
        },
        beforeCreate() {            
        },
        mounted() {            
        }
    }
</script>

<style scoped>

.content { text-align: center; }
.content .t { padding: 15px; margin: 5px; font-size: 130%; }
.content .t button { padding: 10px 20px; cursor: pointer;}

@media screen and (max-width: 500px) {
   
}

@media screen and (min-width: 501px) {    
   
}
</style>