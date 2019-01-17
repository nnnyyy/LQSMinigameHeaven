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
                if( info.ret === -2 ) {
                    alert('가챠 포인트가 부족합니다.');
                    window.location.href = '/';
                    return;                    
                }
                this.isOpen = true;
                isProc = false;

                const msg = `${info.item.name}을(를) 획득하셨습니다`;
                
                G.emit(P.SetResultMsg, msg);
                G.hget(P.http.GetGachaPoint, this.getGachaPointRet);
            },
            getGachaPointRet(info) {
                const msg = `가챠포인트가 ${info.gp}포인트 남아있습니다.`;
                G.emit(P.SetRemainMsg, msg);
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
            G.hget(P.http.GetGachaPoint, this.getGachaPointRet);
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