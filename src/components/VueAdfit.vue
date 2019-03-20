<template>
    <div id="ads-area">
        <ins class="kakao_ad_area" style="display:none;width:100%"
             :data-ad-unit    = "unitId"
             :data-ad-width   = "adsWidth"
             :data-ad-height  = "adsHeight"></ins>
        <div v-el:scriptHolder></div>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        props: {
            unitId: {
                type: String,
                required: true
            },
            adsWidth: {
                type: String,
                required: true
            },
            adsHeight: {
                type: String,
                required: true
            }
        },
        data: function () {
            return {
                
            };
        },
        methods: {},
        created: function () {
            console.log('adfit ads now loading', this.unitId, this.adsWidth, this.adsHeight);
        },
        mounted: function() {
            const v = this;
            $(document).ready(function() {
                let scriptEl = document.createElement('script');
                scriptEl.setAttribute('src', '//t1.daumcdn.net/adfit/static/ad.min.js');
                scriptEl.async = true;
                document.head.appendChild(scriptEl);
                document.body.appendChild(scriptEl);
            });
        },
        components: {}
    }
</script>

<style>
</style>

<style scoped>
    #ads-area { padding: 0; }
</style>