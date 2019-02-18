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
            <button class="btnFreeGacha">무료 가챠 뽑기 ( 클릭 )</button>
            <div class="remainItem">
                <span style="font-size: 24px;">남은 아이템 목록</span>
                <table class="tb-remain-item">
                    <tr>
                        <th>아이템명</th>
                        <th>남은 갯수</th>
                    </tr>
                    <tr>
                        <td>노랑 빤짝이</td>
                        <td>1개</td>
                    </tr>
                    <tr>
                        <td>무지개 닉네임</td>
                        <td>1개</td>
                    </tr>                    
                </table>
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
            }
        },
        components: {
            Top
        },
        methods: {            
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