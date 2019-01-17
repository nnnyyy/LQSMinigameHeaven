<template>
    <div id="GachaBox">    
        <img :src=getImgUrl(isOpen) @click="onOpenGacha"/>
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    let isProc = false;    

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
                if( this.isOpen && !isProc ) {
                    alert('이미 오픈이 완료되었습니다. 기회가 남았으면 새로고침 후 다시 시도해주세요.');
                    return;
                }

                if( !this.isOpen && !isProc ){
                    isProc = true;
                    G.hget(P.http.OpenGacha, this.openGachaRet);
                }
            },
            openGachaRet(info) {
                console.log(info);
                this.isOpen = true;
                isProc = false;
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
    text-align: center;
}

#GachaBox img {
    background-color: inherit;
}
</style>