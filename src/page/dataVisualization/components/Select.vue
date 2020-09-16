<template>
  <div>
    <div class="select" @click="toggleShow">
      {{list[value]}}
    </div>
    <ul class="option" v-show="optionShow">
      <li v-for="item in data" @click="optionClick(item)">{{item[datalabel]}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Select',
    data () {
      return {
        optionShow: false,
      }
    },
    computed: {
      list () {
        const data = this.data
        const list = {}
        for (let i = 0; i < data.length; i++) {
          list[data[i][this.datavalue]]=data[i][this.datalabel]
        }
        return list
      }
    },
    props: {
      value: {
        default: ''
      },
      data: {
        type: Array,
        default () {
          return []
        }
      },
      datalabel: {},
      datavalue: {}
    },
    methods: {
      toggleShow () {
        this.optionShow = !this.optionShow
      },
      optionClick (obj) {
        this.$emit('input', obj[this.datavalue])
        this.optionShow = false
        if (obj[this.datavalue] !== this.value) {
          this.$emit('change', obj[this.datavalue])
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .select
    height 46px
    border #46E2FF 1px solid
    color #F5F7FF
    line-height 46px
    text-align center
    font-size 16px
    cursor pointer
  .option
    height 200px
    overflow-y auto
    border #46E2FF 1px solid
    color #F5F7FF
    li
      height 30px
      line-height 30px
      text-align center
      cursor pointer
      &:hover
        background-color: #46E2FF
</style>
