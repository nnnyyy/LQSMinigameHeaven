<template>
    <div id="main">
        <canvas id="cvs"/>        
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'
    
    import PixiTitle from './PixiGameRenderer.js'

    export default {
        data: function() {
            return {
                
            }
        },
        components: {            
        },
        created() {            
        },
        methods: {            
            onResize() {
                const windowW = window.innerWidth;
                const windowH = window.innerHeight;
                PixiTitle.resize(windowW, 400);
            }
        },
        mounted() {              
            $(window).resize(this.onResize);
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