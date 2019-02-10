<template>
    <div id="main">
        <div class="title">라이브 퀴즈 공유기 상점</div>
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
    height:80px;    
    background:
    radial-gradient(circle, transparent 20%, white 20%, white 80%, transparent 80%, transparent),
    radial-gradient(circle, transparent 20%, white 20%, white 80%, transparent 80%, transparent) 50px 50px,
    linear-gradient(gray 8px, transparent 8px) 0 -4px,
    linear-gradient(90deg, gray 8px, transparent 8px) -4px 0;
    background-color: white;
    background-size:100px 100px, 100px 100px, 50px 50px, 50px 50px;
}

@media screen and (max-width: 500px) {
    .title {
        background: transparent;
        width: 80%;
        height: inherit;
        line-height: 80px;
        margin: 0 auto;
        text-align: center;
        font-weight: bolder;        
        font-size: 20px;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        text-shadow: 
        1px 2px 1px white,
        1px 2px 2px white,
        1px 2px 4px white,
        1px 2px 8px white;
    }
}

@media screen and (min-width: 501px) {
    .title {        
        background: transparent;
        width: 400px;
        height: inherit;
        line-height: 80px;
        margin: 0 auto;
        text-align: center;
        font-size: 25px;
        font-weight: bolder;        
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        text-shadow: 
        1px 2px 1px white,
        1px 2px 2px white,
        1px 2px 4px white,
        1px 2px 8px white;
    }    
}
</style>