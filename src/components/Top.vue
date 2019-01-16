<template>
    <div id="main">
        <div class="title">라이브 퀴즈 공유기 뽑기</div>
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

.title {
    background-color: inherit;
    width: 400px;
    height: inherit;
    line-height: 78px;
    margin: 0 auto;
    text-align: center;
    font-size: 19px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>