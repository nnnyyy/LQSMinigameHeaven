<template>
    <div id="freeGachaRealtimeLog">
        <div style="text-align: center; height: 30px; line-height: 30px;">무료가챠 시도 로그</div>
        <TableTemplate
            class="tb-logs"
            tdStyle="background-color: transparent; text-align: center; border-bottom: 1px solid #323232; border-top: 1px solid #323232; font-size: 16px;"
            thStyle="background-color: #323232; color: white;"
            :data=aLogs
            :dataTitleNames=aLogColumnTitles
            :dataVarNames=aLogColumns
            title='무료가챠 시도 로그'        >
        </TableTemplate>        
    </div>
</template>
<script>    

    export default {
        data() {
            return {                  
                aLogs: [],
                aLogColumns: ['nick', 'regdate'],
                aLogColumnTitles: ['닉네임', '시간']
            }
        },
        components: {            
        },
        methods: {            
            getDate(dateStr) {
                const newStr = new Date(dateStr).toLocaleString();
                return newStr;
            },
            getName(idx) { return this.$G.getGachaTypeName(idx); }
        },
        beforeCreate() {            
        },
        mounted() {
            this.$G.on(this.$P.SOCK.GachaRealtimeLog, packet=>  {
                packet.forEach(item=> {
                    item.regdate = this.getDate(item.regdate);
                })
                this.aLogs = packet;
            });
        }
    }
</script>

<style scoped>
#freeGachaRealtimeLog { position: fixed; width: 300px; height: 500px; left: 0; top:80px; border-radius: 6px; border: 2px dotted #323232; }
.tb-logs { width: 100%; background-color: green; text-align: center; border-collapse: collapse; }
@media screen and (max-width: 500px) {
    
}

@media screen and (min-width: 501px) {    
}
</style>