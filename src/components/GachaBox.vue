<template>
    <div id="GachaBox">    
        <img :class="{gachaImg: isProc}" :src=getImgUrl(isOpen) @click="onOpenGacha"/>
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'    

    export default {
        data: function() {
            return {
                isOpen: false,
                isProc: false,
                cnt: 0
            }
        },
        components: {
        },
        created: function() {            
        },
        methods: {
            onOpenGacha() {
                if( this.isOpen && !this.isProc ) {
                    alert('이미 오픈이 완료되었습니다. 기회가 남았으면 새로고침 후 다시 시도해주세요.');
                    return;
                }

                if( this.cnt <= 0 ) {
                    alert('GP가 부족합니다. GP를 모아오세요.');
                    return;
                }

                if( !this.isOpen && !this.isProc ){
                    this.isProc = true;
                    setTimeout(()=> G.hget(P.http.OpenGacha, this.openGachaRet), 3000);                    
                }
            },
            openGachaRet(info) {                
                if( info.ret === -2 ) {
                    alert('가챠 포인트가 부족합니다.');
                    window.location.href = '/';
                    return;                    
                }
                this.isOpen = true;
                this.isProc = false;

                console.log(info);

                const msg = `${info.item.name}을(를) ${info.item.desc} 획득하셨습니다`;
                
                G.emit(P.SetResultMsg, msg);
                G.hget(P.http.GetGachaPoint, this.getGachaPointRet);
            },
            getGachaPointRet(info) {
                const msg = `기회가 ${info.gp}회 남아있습니다.`;
                this.cnt = info.gp;
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
#GachaBox img {
    background-color: inherit;
}

@media screen and (max-width: 500px) {
    #GachaBox {
        position: relative;
        width: 60%;
        height: 40%;    
        margin: 0 auto;
        text-align: center;
    }

    #GachaBox img {
        width: 100%;
    }
}

@media screen and (min-width: 501px) {
    #GachaBox {
        position: relative;
        width: 100%;
        height: 300px;    
        text-align: center;
    }
}

.gachaImg {
    /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s; 

  /* When the animation is finished, start again */
  animation-iteration-count: infinite; 
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>