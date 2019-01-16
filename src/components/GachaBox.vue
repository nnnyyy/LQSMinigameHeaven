<template>
    <div id="GachaBox">    
        <img :src=getImgUrl(isOpen) @click="onOpenGacha"/>
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    export default {
        data: function() {
            return {
                isOpen: false
            }
        },
        components: {
        },
        created: function() {            
        },
        methods: {
            onOpenGacha() {
                this.isOpen = true;
            },
            getImgUrl(isOpen) {
                if( isOpen ) {
                    return '/images/box_opened.png';
                }
                else {
                    return '/images/box_closed.png';
                }
            }
        },
        mounted: function() {
        }
    }
</script>

<style scoped>
#GachaBox {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: red;
    text-align: center;
}

#GachaBox img {
    background-color: inherit;
}
</style>