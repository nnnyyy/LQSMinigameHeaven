<template>
    <div id="main">        
        <msgbox
            msg="1시간에 3번씩 뽑을 수 있습니다"
            height=40px
        />
        <msgbox
            :msg=msgRemain
            height=40px
        />
        <GachaBox/>
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
                msgRemain: '-'                
            }
        },
        components: {  
            GachaBox          
        },
        created: function() {            
        },
        methods: {            
        },
        mounted: function() {            
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