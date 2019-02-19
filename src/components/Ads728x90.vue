<template>
    <div id="ads-area">
        <ins class="kakao_ad_area" style="display:none;width:100%"
             :data-ad-unit="id"
             data-ad-width   = "728"
             data-ad-height  = "90"></ins>
        <div v-el:scriptHolder></div>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        props: ['unitId'],
        data: function () {
            return {
                id: this.unitId
            };
        },
        methods: {},
        created: function () {

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
    #ads-area {
        min-width: 728px;
        height: 90px;
        padding: 0;
    }
</style>