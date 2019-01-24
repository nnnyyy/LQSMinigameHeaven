<template>
    <div id="main">
        <div class="title">라이브 퀴즈 공유기 뽑기<button v-show="logined" @click="onBtnLogout">로그아웃</button></div>
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    export default {
        data: function() {
            return {
                mobile: G.isMobile(),
                logined: false
            }
        },
        components: { 
            
        },
        
        methods: {            
            onBtnLogout() {
                G.hget(P.http.Logout, data=> {
                    if( data.ret === 0 ) {
                        alert('로그아웃 되었습니다.');
                        window.location.href = '/';
                    }
                });
            },
            onCheckLoginRet(packet) {                
                if( packet.ret === 0 ) {                                 
                    this.showInfo = true;
                    G.emit(P.Login);                    
                    
                }
                else {
                    window.location.href = '/login/'
                }
            },
            onEnterUser(packet) {
                
            }
        },
        beforeCreate() {            
            G.on(P.Login, data=> {
                this.logined = true;
            });
        },
        mounted() {            
                     
        }
    }
</script>

<style scoped>
#main {
    height:78px;
    background-color:bisque;
}

@media screen and (max-width: 500px) {
    .title {
        background-color: inherit;
        width: 80%;
        height: inherit;
        line-height: 78px;
        margin: 0 auto;
        text-align: center;
        font-size: 16px;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
}

@media screen and (min-width: 501px) {
    .title {
        background-color: inherit;
        width: 400px;
        height: inherit;
        line-height: 78px;
        margin: 0 auto;
        text-align: center;
        font-size: 19px;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }    
}
</style>