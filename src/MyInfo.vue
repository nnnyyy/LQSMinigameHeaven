<template>
    <div id="main">   
        <Top/> 
        <div style="width: 900px; margin: 20px auto;">
            현재 보유 GP : <span style="text-shadow: 1px 1px 1px red;font-size: 24px;">{{ currentGP }}</span> GP
        </div>
        <table class="tb-list">
            <template v-for="item in itemList">
                <tr>
                    <td style='width: 300px;border-bottom: 1px solid #e0e0e0;'>
                        {{getItemTypeName(item)}}
                    </td>
                    <td :style="getItemStyle(item)" style='border-bottom: 1px solid #e0e0e0;' v-html="getItemDesc(item)">                        
                    </td>
                    <td style='border-bottom: 1px solid #e0e0e0; cursor: pointer;' @click="onSellItem(item)">
                        팔기
                    </td>
                </tr>
            </template>
        </table>
    </div>
</template>
<script>
    import G from './global'
    import P from '../common/protocol'
    import $ from 'jquery'
    import Top from './components/Top.vue'     

    export default {
        data() {
            return {    
                currentGP: 0,
                itemList: []
            }
        },
        components: {   
            Top         
        },
        created() {
        },
        beforeCreate() {
            G.hget(P.http.MyInfo, data=> {
                if( data.ret === 0 ) {
                    G.hget(P.http.GetGachaPoint, this.getGachaPointRet);
                    this.itemList = data.list;
                }
            });
        },
        methods: {   
            getGachaPointRet(info) {
                this.currentGP = info.gp;
            },
            getItemTypeName(item) {
                if( item.effectid == 1 ) {
                    if( item.effectdesc == '@yellowblink' || item.effectdesc == '@rainbowblink' ) return '채팅 특수 효과';
                    return '채팅 색상';
                }
                else if( item.effectid == 2 ) {
                    if( item.effectdesc == '@rainbow' ) return '닉네임 특수 효과';
                    return '닉네임 그림자 색상';
                }
                else if( item.effectid == 3 ) {
                    return '투명 반짝이 효과';
                }
                else if( item.effectid == 4 ) {
                    return '빅 폰트 효과';
                }
                else if( item.effectid == 5 ) {                    
                    return '서체';
                }
            } ,
            getItemStyle(item) {
                let style = { 
                    'background-color': 'transparent'
                }

                if( (item.effectid == 2 ) 
                    && item.effectdesc.indexOf('@') === -1 )  {
                        style['text-shadow'] = `2px 2px 2px ${item.effectdesc}`;
                }

                return style;
            }   ,
            getItemDesc(item) {
                if( item.effectid == 3 ) return '-';
                if( item.effectid == 5 ) {
                    if( item.effectdesc === 'GungsuhChe' ) {
                        return '궁서체(진지)';
                    }
                }

                if( item.effectid === 1 ) {
                    const aColors = item.effectdesc.split('/');
                    if( aColors.length >= 1 ) {
                        let desc = '';
                        for( let i = 0 ; i < aColors.length ; ++i ) {
                            desc += `<span style="color:${aColors[i]}">${aColors[i]}</span> `;
                        }

                        return desc;
                    }
                }
                return item.effectdesc;
            } ,
            onSellItem(item) {
                const name = this.getItemTypeName(item);
                if( !confirm(name + ' 을(를) 파시겠습니까? 25GP를 얻을 수 있습니다') ) {
                    return;
                }

                G.hpost(P.http.SellItem, {sn: item.sn}, data=> {
                    if( data.ret === 0 ) {
                        G.hget(P.http.MyInfo, data=> {
                            if( data.ret === 0 ) {
                                G.hget(P.http.GetGachaPoint, this.getGachaPointRet);
                                this.itemList = data.list;
                            }
                        });
                    }
                })
            }    
        },
        mounted() {
        }
    }
</script>

<style scoped>
.tb-list {
    width: 800px;
    margin: 0 auto;
}

.tb-list td {
    text-align: center;
    height: 36px;
}

.tb-list input[type=checkbox] {
    width: 30px;
    height: 30px;
}
</style>