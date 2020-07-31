<template>
  <div style="position: relative">
    <div ref="editor"></div>
    <div class="mask" v-if="maskShow">
      <div>视频上传中</div>
      <el-progress :percentage="percent"></el-progress>
    </div>
  </div>
</template>

<script>
import Editor from '../assets/js/wangEditor'
export default {
  name: 'textEditor',
  data () {
    return {
      html: '',
      editor: null,
      percent: 0,
      maskShow: false
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
    this.editor.customConfig.zIndex = 100
    this.editor.customConfig.customUploadImg = async (files, insert) => {
      for (let i = 0; i < files.length; i++) {
        const key = 'editor' + new Date().getTime()
        await this.$ObsClient.putObject({
          Bucket: 'zhsf',
          Key: key,
          SourceFile: files[i],
        })
        insert(this.$url.OBS_Path + key)
      }
    }
    // 视频上传
    this.editor.customConfig.customUploadVideo = (files, insert) => {
      const key = 'editor' + new Date().getTime()
      this.$ObsClient.putObject({
        Bucket: 'zhsf',
        Key: key,
        SourceFile: files[0],
        ProgressCallback: (transferredAmount, totalAmount, totalSeconds) => {
          // speed.innerHTML = transferredAmount * 1.0 / totalSeconds / 1024;
          this.maskShow = true
          this.percent = transferredAmount * 100 / totalAmount
        }
      }).then(res => {
        insert(this.$url.OBS_Path + key)
      }).finally(res => {
        this.maskShow = false
      })
    }
    // 触发change事件
    this.editor.customConfig.onchange = html => {
      this.$emit('update:text', html)
      this.$emit('change', html)
    }
    // 菜单控制
    if (this.menus) {
      this.editor.customConfig.menus = this.menus
    }
    // 粘贴过滤
    this.editor.customConfig.pasteFilterStyle = true
    this.editor.customConfig.pasteIgnoreImg = false
    this.editor.customConfig.pasteTextHandle = function (content) {
      if (content === '' && !content) return ''
      var str = content
      str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
      str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
      str = str.replace(/<(?!img)\/?[^>]*>/g, '')
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

<style lang="stylus" scoped>
  .mask
    position absolute
    top: 0
    left 0
    height 100%
    width 100%
    background-color: rgba(255,255,255,.5)
    text-align center
    z-index 1000
    padding-top 100px
</style>
