<template>
    <div id="id">
        <Top/>
        <div class="conetent">
            <adsense
            adClient="ca-pub-3598320494828213"
            adSlot="6583538077"
            adStyle="display:inline-block;width:970px;height:250px;"                        
            fullWidthResponsive="false"
            />
            <template v-if="isRemainItem">
                <button class="btnFreeGacha" @click="onBtnFreeGacha">무료 가챠 뽑기 ( 클릭 )</button>
            </template>
            <template v-else>
                <div style="font-size: 30px;">현재 아이템이 다 소진되었습니다! 다음에 다시 도전 해주세요!</div>
            </template>
            <div class="remainItem">
                <span style="font-size: 24px;">남은 아이템 목록</span>
                <table class="tb-remain-item">
                    <tr>
                        <th>아이템명</th>
                        <th>남은 갯수</th>
                    </tr>         
                    <template v-for="item in freeGachaList">
                        <tr v-show="item.gtype !== -1">
                            <td>{{getTypeName(item.gtype)}}</td>
                            <td>{{item.remain}}</td>
                        </tr>         
                    </template>                             
                </table>
            </div>
            <div style="margin-top: 30px;margin-bottom: 30px;">해당 아이템이 소진 될 때까지 계속 시도할 수 있습니다</div>
            <div>
                <ads728x90
                        unitId="DAN-1k25krkvdtr8z"
                    />                
            </div>
        </div>
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    import Top from './Top.vue'

    export default {
        data() {
            return {  
                freeGachaList: [],
                isRemainItem: false           
            }
        },
        components: {
            Top
        },
        methods: {
            onBtnFreeGacha() {
                G.hget('/gacha/freeGacha', data=> {
                    if( data.ret === 0 ) {
                        if( data.type === -1 ) {
                            //  꽝
                            alert('아쉽게도 꽝입니다! 15초 후에 다시 도전 해주세요');
                        }
                        else {
                            alert('축하합니다!! 당첨 되었습니다!!! 인벤토리를 확인 해보세요~');
                            this.getFreeGachaList();
                        }
                    }
                    else { 
                        switch(data.ret) {
                            case -2:
                            {
                                alert('잠시 후에 다시 도전 해주세요');
                                window.location.href = '/free';
                            }
                            break;
                        }                       
                    }
                })
            },
            getTypeName(gtype) {
                return G.getGachaTypeName(gtype);
            },
            getFreeGachaList() {
                G.hget('/gacha/freeGachaList', data=> {
                    if( data.ret === 0 ) {
                        data.list.forEach(item=> {
                            if( item.gtype != -1 && item.remain > 0 ) {
                                this.isRemainItem = true;
                            }
                        });
                        this.freeGachaList = data.list;
                    }
                });
            }
        },
        beforeCreate() {            
        },
        mounted() {
            this.getFreeGachaList();
        }
    }
</script>

<style scoped>
table {
    border-collapse: collapse;
}
.conetent {
    width: 1000px;
    margin: 0 auto;   
    text-align: center; 
}

.btnFreeGacha {
    width: 100%;
    height: 80px;
    font-size: 35px;
}

.remainItem {
    margin-top: 24px;
}

.tb-remain-item {
    margin: 0 auto; width: 800px;
    margin-top: 24px;
}

.tb-remain-item th,td {
    text-align: center;
    width: 50%;
    height: 60px;
}

.tb-remain-item th {
    background-color: #5b5454;
    color: white;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
}

.tb-remain-item td {
    border-bottom: 1px solid gray;    
}

.tb-remain-item td:first-child, th:first-child {
    border-right: 1px solid gray;    
}

@media screen and (max-width: 500px) {
    
}

@media screen and (min-width: 501px) {    
}
</style>