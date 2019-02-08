<template>
    <div id="GachaBox">            
        <div style="margin: 8px 0; position: relative;">
            <table class="tb-prob">
                <tr>
                    <td>포인트 얻기</td>
                    <td>80%</td>
                </tr>
                <tr>
                    <td>랜덤 폰트 컬러</td>
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
                    <td>무지개 닉네임 효과</td>
                    <td>0.1%</td>
                </tr>
            </table>
        </div>
        <div style="text-align: center; margin: 10px 0;">
            <button style="height: 40px; width: 100px;" @click="onBuy">구입하기</button>
        </div> 
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'    

    export default {
        data: function() {
            return {
                cnt: 0
            }
        },
        components: {
        },
        methods: {
            onBuy() {
                const GTYPE = {
                    BOX: 0,
                    FONTCOLOR: 1,
                    NICKSHADOW: 2,
                    BLINK: 3,
                    RAINBOWNICK: 4
                }

                if( this.cnt < 15 ) {
                    alert('포인트가 부족합니다!');
                    return;
                }
                
                G.hget(P.http.OpenGachaRand, data=> {
                    if( data.ret === 0 ) {
                        G.hget(P.http.GetGachaPoint, this.getGachaPointRet);

                        let msg = ''
                        switch(data.type) {
                            case GTYPE.BOX: msg=`포인트를 ${data.item.desc} 획득했습니다.`; break;
                            case GTYPE.FONTCOLOR: msg=`폰트 색상 ${data.item.desc}을 획득했습니다.`; break;
                            case GTYPE.NICKSHADOW: msg=`닉네임 효과 ${data.item.desc}를 획득했습니다.`; break;
                            case GTYPE.BLINK: msg='##채팅 깜빡임 효과##를 획득했습니다. 축하합니다!'; break;
                            case GTYPE.RAINBOWNICK: msg='@#@#@#@# !!레인보우 닉네임 효과 획득!! #@#@#@#@'; break;
                        }
                        
                        G.emit(P.SetResultMsg, msg);
                    }
                    else {
                        alert('알 수 없는 오류');
                    }
                })
            },
            getGachaPointRet(info) {                
                this.cnt = info.gp;
                G.emit(P.GachaPoint, info.gp);                
            }
        },
        mounted() {
            G.hget(P.http.GetGachaPoint, this.getGachaPointRet);
            G.on(P.GachaPoint, pt=> this.cnt = pt);
        }
    }
</script>

<style scoped>
.tb-prob {
    border-collapse: collapse;
    border: 1px solid black;    
}

.tb-prob td {
    text-align: center;
    width: 50%;    
    height: 36px;
    border: 1px solid black;
    font-size: 14px;
}

@media screen and (max-width: 500px) {
    #GachaBox {
        position: relative;
        width: 90%;            
        margin: 0 auto;
        text-align: center;
    }    

    .tb-prob {
        width: 90%;
        margin: 0 auto;
    }

    .tb-prob td {
        font-size: 12px;
    }
}

@media screen and (min-width: 501px) {
    #GachaBox {
        position: relative;
        width: 100%;          
        text-align: center;
    }

    .tb-prob {
        width: 400px;
        margin: 0 auto;
    }
}
</style>