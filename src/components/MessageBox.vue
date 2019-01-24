<template>
    <div id="main" v-html="msg" 
    :style="{
        'width': width,
        'height': height,
        'font-size': fontsize,'background-color': bgcolor, 'text-align': align,'line-height': lineHeight, 'color': color
        }">
    </div>
</template>
<script>
    import G from '../global'
    import P from '../../common/protocol'
    import $ from 'jquery'

    export default {
        props: {
            msg: {
            type: String,
            required: true
            },
            width: {
            type: String,
            required: false,
            default: '100%'
            },
            height: {
            type: String,
            required: false,
            default: '100%'
            },
            bgcolor: {
            type: String,
            required: false,
            default: 'inherit'
            },
            color: {
            type: String,
            required: false,
            default: 'inherit'
            },
            align: {
            type: String,
            required: false,
            default: 'center'
            },
            fontsize: {
            type: String,
            required: false,
            default: '15px'
            }
        },
        data: function() {
            return {
                lineHeight: this.height                                
            }
        },
        components: {            
        },
        created: function() {            
        },
        methods: {            
        },
        mounted: function() {              
            
        }
    }
</script>

<style scoped>
#main {
}
</style>