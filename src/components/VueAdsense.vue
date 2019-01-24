<template>
  <ins class="adsbygoogle"
    :class="adClass"
    :data-ad-client="adClient"
    :data-ad-slot="adSlot"
    :data-ad-format="adFormat"
    :style="adStyle"
    :data-full-width-responsive="fullWidthResponsive"
    ></ins>
</template>

<script>
export default {
  props: {
    adClass: {
      type: String,
      required: false
    },
    adClient: {
      type: String,
      required: true
    },
    adSlot: {
      type: String,
      required: true
    },
    adFormat: {
      type: String,
      required: false
    },
    adStyle: {
      type: String,
      required: false,
      default: 'display: block'
    },
    fullWidthResponsive: {
      type: String,
      required: false,
      default: 'true'
    }
  },
  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }
}
</script>

