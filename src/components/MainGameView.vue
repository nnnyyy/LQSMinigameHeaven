<template>
    <div id="main">
        <canvas id="cvs">

        </canvas>
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'
    
    import PixiTitle from './PixiTitleCanvas.js'

    export default {
        data: function() {
            return {
                
            }
        },
        components: {            
        },
        created: function() {            
        },
        methods: {            
        },
        mounted: function() {              
            PixiTitle.create(window.innerWidth, 400, document.getElementById('cvs'));
        }
    }
</script>

<style scoped>
#main {
    width: 100%;
    height: 400px;
}
</style>