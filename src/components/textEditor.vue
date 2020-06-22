<template>
  <div ref="editor"></div>
</template>

<script>
import Editor from 'wangeditor'
export default {
  name: 'textEditor',
  data () {
    return {
      html: '',
      editor: null
    }
  },
  props: {
    text: String,
    menus: Array
  },
  async mounted () {
    const el = this.$refs.editor
    this.editor = new Editor(el)
    // 图片上传
    // let params = {}
    // this.$http.get(this.url.QiNiuCustomToken).then(res => {
    //   params.token = res.uptoken
    // })
    // this.editor.customConfig.uploadImgServer = this.url.QiNiuUpload
    // this.editor.customConfig.uploadFileName = 'file'
    // this.editor.customConfig.uploadImgParams = params
    // this.editor.customConfig.uploadImgHooks = {
    //   customInsert: (insertImg, result, editor) => {
    //     insertImg(this.$store.state.qnyPath + result.key)
    //   }
    // }
    // 触发change事件
    this.editor.customConfig.onchange = html => {
      this.$emit('update:text', html)
    }
    // 菜单控制
    if (this.menus) {
      this.editor.customConfig.menus = this.menus
    }
    // 粘贴过滤
    this.editor.customConfig.pasteFilterStyle = true
    this.editor.customConfig.pasteIgnoreImg = true
    this.editor.customConfig.pasteTextHandle = function (content) {
      if (content === '' && !content) return ''
      var str = content
      str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
      str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
      str = str.replace(/<\/?[^>]*>/g, '')
      str = str.replace(/[ | ]*\n/g, '\n')
      str = str.replace(/&nbsp;/ig, '')
      return str
    }
    this.editor.create()
    this.editor.txt.html(this.text)
  },
  watch: {
    // text (newVal) {
    //   this.editor.txt.html(newVal)
    // }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
