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
            <button class="btnFreeGacha" @click="onBtnFreeGacha">무료 가챠 뽑기 ( 클릭 )</button>
            <div class="remainItem">
                <span style="font-size: 24px;">남은 아이템 목록</span>
                <table class="tb-remain-item">
                    <tr>
                        <th>아이템명</th>
                        <th>남은 갯수</th>
                    </tr>                                      
                </table>
            </div>
            <div>해당 아이템이 소진 될 때까지 계속 시도할 수 있습니다</div>
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
            }
        },
        beforeCreate() {

        },
        mounted() {            
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