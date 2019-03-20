<template>
<div id="main">
    <template v-if="G.isMobile()">
        <div style="width: 320px; margin: 0 auto;">
        <adsense
                adClient="ca-pub-3598320494828213"
                adSlot="2407753256"
                adStyle="display:inline-block;width:320px;height:100px;"                        
                fullWidthResponsive="false"
                />
        </div>
    </template>
    <template v-else>
        <div style="width: 970px; margin: 0 auto;">
            <adsense
                adClient="ca-pub-3598320494828213"
                adSlot="9714459258"
                adStyle="display:inline-block;width:970px;height:250px;"                        
                fullWidthResponsive="false"
            />
        </div>   
    </template>                              
</div>
</template>

<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    export default {
        data() {
            return {
            }
        },
        components: {              
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