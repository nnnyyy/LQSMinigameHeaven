<template>
  <table>
    <tr v-if="dataTitleNames.length > 0">
      <template v-for="name in dataTitleNames">
          <th :style="thStyle">
            {{name}}
          </th>
        </template>
    </tr>
    <template v-for="item in data">
      <tr>
        <template v-for="name in dataVarNames">
          <td :style="tdStyle">
            {{item[name]}}
          </td>
        </template>
      </tr>
    </template>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    dataVarNames: {
      type: Array,
      required: true
    },
    dataTitleNames: {
      type: Array,
      required: false
    },
    tdStyle: {
      type: String,
      required: false
    },
    thStyle: {
      type: String,
      required: false
    }
  },
  mounted() {    
  }
}
</script>

<style scoped>
</style>
