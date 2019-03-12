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
                <br/>
                <div style="font-size:30px; margin-bottom: 10px;">{{amquiz.q}}</div>
                <button class="btnFreeGacha" @click="onBtnFreeGacha(0)">1. {{amquiz.a[0]}}</button>
                <button class="btnFreeGacha" @click="onBtnFreeGacha(1)">2. {{amquiz.a[1]}}</button>
                <button class="btnFreeGacha" @click="onBtnFreeGacha(2)">3. {{amquiz.a[2]}}</button>
                <div style="margin-top: 15px;">정답을 입력하면 자동으로 무료가챠에 응모 됩니다.</div>
                <div style="margin-top: 3px; color: red;">같은 문제 2회 이상 오답 클릭 시 1시간동안 참여 불가능합니다.</div>
            </template>
            <template v-else>
                <div style="font-size: 30px;">현재 아이템이 다 소진되었습니다! 다음에 다시 도전 해주세요!</div>
            </template>
            <div style="margin:20px;">
                <ads728x90
                        unitId="DAN-1k25krkvdtr8z"
                    />                
            </div>
            <div class="remainItem">
                <span style="font-size: 24px;">남은 아이템 목록</span>
                <table class="tb-remain-item">
                    <tr>
                        <th>아이템명</th>
                        <th>남은 갯수</th>
                    </tr>         
                    <template v-for="item in freeGachaList">
                        <tr v-show="item.gtype !== -1">
                            <td>{{getTypeName(item)}}</td>
                            <td>{{item.remain}}</td>
                        </tr>         
                    </template>                             
                </table>
            </div>
            <div style="margin-top: 30px;margin-bottom: 30px;">해당 아이템이 소진 될 때까지 계속 시도할 수 있습니다</div>
            
            <span style="font-size: 24px;">최근 당첨자 목록</span>
            <table class="tb-earn-item" style="margin-bottom: 30px;">
                <tr>
                    <th>닉네임</th>
                    <th>상품명</th>
                    <th>날짜</th>
                </tr>         
                <template v-for="item in freeGachaLogRecent">
                    <tr>
                        <td>{{item.nick}}</td>
                        <td>{{getName(item.gtype)}}</td>
                        <td>{{getDate(item.regdate)}}</td>
                    </tr>         
                </template>                             
            </table>
        </div>
        <FreeGachaRealtimeLog/>
    </div>
</template>
<script>
    import Top from './Top.vue'
    import FreeGachaRealtimeLog from './FreeGachaRealtimeLog.vue'

    export default {
        data() {
            return {  
                freeGachaList: [],
                freeGachaLogRecent: [],
                isRemainItem: false,
                amquiz: {
                    q: '',
                    a: []
                }
            }
        },
        components: {
            Top,
            FreeGachaRealtimeLog
        },
        methods: {
            onBtnFreeGacha(idx) {
                this.$G.hpost('/gacha/freeGacha', {idx: idx}, data=> {
                    if( data.ret === 0 ) {
                        if( data.type === -1 ) {
                            //  꽝
                            alert('아쉽게도 꽝입니다! 15초 후에 다시 도전 해주세요');                            
                        }
                        else {
                            alert('축하합니다!! 당첨 되었습니다!!! 인벤토리를 확인 해보세요~');                            
                            //this.getFreeGachaList();
                            //this.getFreeGachaLog();
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

                            case -3:
                            {
                                alert('순위에 밀려 아이템 획득에 실패 했습니다.');

                                window.location.href = '/free';
                            }
                            break;

                            case -4:
                            {
                                alert('1시간 이내에 2회의 당첨 이력이 있습니다. 나중에 다시 시도 해주세요.');

                                window.location.href = '/free';
                            }
                            break;

                            case -5: 
                            {
                                alert('당첨 된 이력이 10분 이내에 존재합니다. 10분이 지난 후에 도전 해주세요');
                                window.location.href = '/free';
                            }
                            break;
                            case -6:
                            {
                                alert('최근 2회의 당첨 이력이 있습니다. 나중에 다시 시도 해주세요.');

                                window.location.href = '/free';
                            }
                            break;
                            case -14: 
                            {
                                alert('아이템이 모두 소진되었습니다');
                            }
                            break;
                            case -17: 
                            {
                                alert('1시간 동안 차단된 아이디 입니다.');
                                window.location.href = '/free';
                            }
                            break;
                            case -18: 
                            {
                                alert('오답입니다.');
                                window.location.href = '/free';
                            }
                            break;
                            case -200: 
                            {
                                alert('20:50 ~ 21:20은 잼라이브 퀴즈 집중 시간대입니다. 그 이후에 도전 해주세요.');
                                window.location.href = '/free';
                            }
                            break;
                        }                       
                    }
                })
            },
            getTypeName(item) {
                let msg = this.$G.getGachaTypeName(item.gtype);
                if( item.description ) {
                    msg += `( ${item.description} )`;
                }
                return msg;
            },
            getFreeGachaList() {
                this.$G.hget('/gacha/freeGachaList', data=> {
                    if( data.ret === 0 ) {
                        data.list.forEach(item=> {
                            if( item.gtype != -1 && item.remain > 0 ) {
                                this.isRemainItem = true;
                            }
                        });
                        this.freeGachaList = data.list;
                    }
                });
            },
            getFreeGachaLog() {
                this.$G.hget(this.$P.http.GetFreeGachaLogRecent, data=> {
                    if( data.ret === 0 ) {
                        this.freeGachaLogRecent = data.list;
                    }
                })
            },
            getDate(dateStr) {
                const newStr = new Date(dateStr).toLocaleString();
                return newStr;
            },
            getName(idx) { return this.$G.getGachaTypeName(idx); },
            onAntiMacroQuiz(data) {
                this.amquiz = data;
            }
        },
        beforeCreate() {            
        },
        mounted() {
            this.getFreeGachaList();
            this.getFreeGachaLog();
            this.$G.on(this.$P.SOCK.AntiMacroQuiz, this.onAntiMacroQuiz);
        }
    }
</script>

<style scoped>
table           {    border-collapse: collapse;}
.conetent       {    width: 1000px;    margin: 0 auto;       text-align: center; }
.btnFreeGacha   {    width: 25%;    height: 80px;    font-size: 18px;}
.remainItem     {    margin-top: 24px;}
.tb-remain-item {    margin: 0 auto; width: 800px;    margin-top: 24px;}
.tb-remain-item th,td {    text-align: center;    width: 50%;    height: 60px;}
.tb-remain-item th {    background-color: #5b5454;    color: white;    border-top: 1px solid gray;    border-bottom: 1px solid gray;}
.tb-remain-item td {    border-bottom: 1px solid gray;    }
.tb-remain-item td:first-child, th:first-child {    border-right: 1px solid gray;    }

.tb-earn-item {    margin: 0 auto; width: 800px;    margin-top: 24px;}
.tb-earn-item th,td {    text-align: center;    width: 33%;    height: 45px;}
.tb-earn-item th {    background-color: #5b5454;    color: white;    border-top: 1px solid gray;    border-bottom: 1px solid gray;}
.tb-earn-item td {    border-bottom: 1px solid gray;    }
.tb-earn-item td:first-child, th:first-child {    border-right: 1px solid gray;    }
@media screen and (max-width: 500px) {
    
}

@media screen and (min-width: 501px) {    
}
</style>