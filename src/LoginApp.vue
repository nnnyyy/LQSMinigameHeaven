<template>
    <div id="main">
        <Top/>     
        <table class="tb-login">
            <tr>
                <td>아이디</td>
                <td><input type="text" v-model="iid"/></td>
            </tr>
            <tr>
                <td>비밀번호</td>
                <td><input type="password" v-model="ipw"/></td>
            </tr>
            <tr>
                <td colspan=2><button @click="onBtnLogin">로그인</button></td>
            </tr>
        </table>
    </div>
</template>
<script>
    import G from './global'
    import P from '../common/protocol'
    import $ from 'jquery'    

    import Top from './components/Top.vue'

    export default {
        data: function() {
            return {
                iid: '',
                ipw: ''
            }
        },
        components: {
            Top
        },
        created: function() {            
        },
        methods: {
            onCheckLoginRet(data) {
                if( data.ret === 0 ) {
                    // 다시 메인으로
                    window.location.href = '/';
                }
                else {
                    
                }
            },
            onBtnLogin() {
                const id = this.iid;
                const pw = this.ipw;                

                G.hpost(P.http.Login, {id: id, pw: pw}, this.onLoginRet);
            },
            onLoginRet(data) {                
                if( data.ret === 0 ) {
                    window.location.href = '/';
                }
                else {
                    alert('로그인 실패');
                }
            }
        },
        mounted: function() {
            G.hget(P.http.CheckLogin, this.onCheckLoginRet);
        }
    }
</script>

<style scoped>
/* 모바일 대응 */
@media screen and (max-width: 500px) {
    .tb-login {
        width: 80%;        
        margin: 0 auto;
        margin-top: 20px;
    }        
}

/* PC 대응 */
@media screen and (min-width: 501px) {
    .tb-login {
        width: 350px;
        margin: 0 auto;
        margin-top: 20px;
    }
}


.tb-login td {
    height: 36px;
    text-align: center;
}

.tb-login input {
    width: 100%;
    height: 36px;
    background-color: white;
}

.tb-login button {
    width: 100%;
    height: 48px;
}
</style>