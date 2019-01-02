<template>
    <div id="main">
        <template v-if="mobile">
            
        </template>
        <template v-else>            
        </template>
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    export default {
        data: function() {
            return {
                mobile: G.isMobile()                
            }
        },
        components: { 
            
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
    height:78px;
    background-color:bisque;
}
</style>