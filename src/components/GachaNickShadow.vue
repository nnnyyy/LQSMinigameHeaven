<template>
    <div id="GachaBox">            
        <div style="text-align: center; margin: 10px 0;">
            <button style="height: 40px; width: 100px;" @click="onBuyFontColor">구입하기</button>
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
            onBuyFontColor() {
                if( this.cnt < 100 ) {
                    alert('포인트가 부족합니다!');
                    return;
                } 
                
                G.hget(P.http.OpenGachaNickShadow, data=> {
                    if( data.ret === 0 ) {
                        G.hget(P.http.GetGachaPoint, this.getGachaPointRet);

                        const msg = `${data.item.desc} 색을 획득하셨습니다. 닉네임 꾸미기에 사용 가능합니다.`;
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
        mounted: function() {
            G.hget(P.http.GetGachaPoint, this.getGachaPointRet);
            G.on(P.GachaPoint, pt=> this.cnt = pt);
        }
    }
</script>

<style scoped>

@media screen and (max-width: 500px) {
    #GachaBox {
        position: relative;
        width: 60%;
        height: 10%;    
        margin: 0 auto;
        text-align: center;
    }    
}

@media screen and (min-width: 501px) {
    #GachaBox {
        position: relative;
        width: 100%;
        height: 80px;    
        text-align: center;
    }
}
</style>