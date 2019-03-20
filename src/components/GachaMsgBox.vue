<template>
    <div id="GachaMsgBox">
        <table class="tb-msg">
            <tr>
                <td v-html="msg">                    
                </td>
            </tr>
        </table>
    </div>
</template>
<script>    
    import P from '../../common/protocol'
    import $ from 'jquery'    

    export default {
        props: {
            msg: {
                type: String,
                required: true
            }            
        },
        data() {
            return {                
            }
        },
        components: {                  
        },
        created() {            
        },
        methods: {                        
        },
        computed: {            
        },
        mounted() {
        }
    }
</script>

<style scoped>
#GachaMsgBox { position: fixed; left: 0; width: 100vw; height: 200px; top: calc( 50% - 100px ); background-color: #323232; animation: 0.4s slidein; -webkit-animation-fill-mode: forwards; z-index: 4000000; }
.tb-msg { margin: 0 auto; background-color: #323232;; height: 100%; }
.tb-msg td { text-align: center; color: white; background-color: #323232; }
@keyframes slidein { from { opacity: 0; } to { opacity: 1; } }

@media screen and (max-width: 500px) {
    .tb-msg { width: 90%; }
}

@media screen and (min-width: 501px) {
    .tb-msg { width: 500px; }
}
</style>