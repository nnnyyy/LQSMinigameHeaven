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

    const maxWidth = 800;

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
                PixiTitle.resize(window.innerWidth >= maxWidth ? maxWidth : window.innerWidth, 400);
            }
        },
        mounted() {              
            $(window).resize(this.onResize);
            PixiTitle.create(window.innerWidth >= maxWidth ? maxWidth : window.innerWidth, 400, document.getElementById('cvs'));
        }
    }
</script>

<style scoped>
#main {
    width: 800px;
    height: 400px;
    margin: 0 auto;
}
</style>