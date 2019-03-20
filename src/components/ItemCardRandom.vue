<template>
    <div id="ItemCardRandom">
        <div class="title pdtb8 reverse-color">랜덤 아이템 {{reqGP}} GP</div>
        <div class="botline"/>
        <div class="mgtb8 fs90">
            아래의 아이템 중 랜덤하게 한가지 아이템이 나온다.            
        </div>
        <div class="topline"/>
        <div class="mgtb8" style="height: 180px; text-align: center; overflow-y: scroll;">
            <table class="mat tb-list">
                <tr>
                    <td>포인트 얻기</td>
                    <td>80%</td>
                </tr>
                <tr>
                    <td>랜덤 채팅 컬러</td>
                    <td>12%</td>
                </tr>
                <tr>
                    <td>랜덤 닉네임 강조 색상</td>
                    <td>6%</td>
                </tr>
                <tr>
                    <td>채팅 깜박임 효과</td>
                    <td>2%</td>
                </tr>
                <tr>
                    <td>빅 폰트 효과</td>
                    <td>0.2%</td>
                </tr>
                <tr>
                    <td>무지개 닉네임 효과</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>노랑 빤짝이 채팅 효과</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>고양이 서체</td>
                    <td>0.05%</td>
                </tr>
            </table>
        </div>
        <div class="topline"/>
        <div class="btnBuy mat mgtb8" @click="onBuy">구입</div>
    </div>
</template>
<script>    
    import P from '../../common/protocol'
    import $ from 'jquery'    

    export default {
        props: {
            reqGP: {
                type: Number,
                required: true
            }
        },
        data() {
            return {                
            }
        },
        components: {                  
        },
        created() {            
        },
        methods: {            
            onBuy() {
                if( this.G.isProcBuy() ) {
                    alert('아직 처리 중인 명령이 있습니다');
                    return;
                }
                
                if( this.G.getCurGP() < this.reqGP ) {
                    alert('GP가 부족합니다.');
                    return;
                }

                this.G.setProcBuy( true );

                 this.G.hget(P.http.OpenGachaRand, data=> {
                    if( data.ret === 0 ) {
                        this.G.setProcBuy( false );
                        this.G.reloadGP();                        

                        this.SetTypeMsg(data.type, data.item.desc);
                    }
                    else {                     
                        alert(data.ret);   
                        alert('알 수 없는 오류');
                    }
                });
            },
            SetTypeMsg(type, desc) {
                let msg = ''
                switch(type) {
                    case this.G.GTYPE.BOX: msg=`포인트를 ${desc} 획득했습니다.`; break;
                    case this.G.GTYPE.FONTCOLOR: msg=`폰트 색상 ${desc}을 획득했습니다.`; break;
                    case this.G.GTYPE.NICKSHADOW: msg=`닉네임 효과 ${desc}를 획득했습니다.`; break;
                    case this.G.GTYPE.BLINK: msg='##채팅 깜빡임 효과##를 획득했습니다. 축하합니다!'; break;
                    case this.G.GTYPE.RAINBOWNICK: msg='@#@#@#@# !!레인보우 닉네임 효과 획득!! #@#@#@#@'; break;
                    case this.G.GTYPE.YELLOWBLINK: msg='@#@#@#@# !!노랑 빤짝이 효과 획득!! #@#@#@#@'; break;
                    case this.G.GTYPE.BIGFONT: msg='@#@#@#@# !!빅 폰트 효과 획득!! #@#@#@#@'; break;
                    case this.G.GTYPE.FONT_FAMILY: msg=`@#@#@#@# ${desc} 서체 획득!!!! #@#@#@#@`; break;
                    case this.G.GTYPE.FAILED: msg=`아쉽게도 획득에 실패했습니다..`; break;
                }
                
                this.G.emit(P.SetResultMsg, msg);
            }
        },
        computed: {            
        },
        mounted() {
        }
    }
</script>

<style scoped>
#ItemCardRandom { margin: 0 auto; text-align: center; border-radius: 10px; border: 2px solid #323232; margin-bottom: 15px; }
@media screen and (max-width: 500px) {
    #ItemCardRandom { width: 90%; }    
    #ItemCardRandom .title { font-size: 120%; }    
    .tb-list td { font-size: 80%; }
}

@media screen and (min-width: 501px) {
    #ItemCardRandom { width: 600px; }        
    #ItemCardRandom .title { font-size: 120%; }    
    .tb-list td { font-size: 80%; }
}
</style>