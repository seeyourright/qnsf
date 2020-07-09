<template>
    <div style="border: 1px #000 solid;display: inline-block;vertical-align: top;user-select: none">
      <canvas ref="canvas" height="200" width="1000"></canvas>
    </div>
</template>

<script>
  export default {
    name: 'writingBoard',
    data () {
      return {
        gtx: null,
        canvas: null
      }
    },
    mounted () {
        const canvas = this.$refs.canvas;
        const gtx = canvas.getContext('2d');
        this.gtx = gtx
        this.canvas = canvas
        gtx.fillStyle = '#fff'
        gtx.fillRect(0,0, canvas.width, canvas.height)
        gtx.fill();
        canvas.addEventListener('mousedown', ev => {
          const rect = canvas.getBoundingClientRect()
          gtx.beginPath()
          gtx.moveTo(ev.clientX-rect.left,ev.clientY-rect.top);
          document.onmousemove = function(ev){
            gtx.lineTo(ev.clientX-rect.left, ev.clientY-rect.top);
            gtx.stroke();
          };
          document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
          }
        })
    },
    methods: {
      clear () {
        this.gtx.clearRect(0,0, this.canvas.width, this.canvas.height)
      },
      getImg () {
        return this.dataURLtoFile(this.canvas.toDataURL('image/png'), 'sign')
      },
      dataURLtoFile (dataurl, filename) {
        let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime})
      },
    }
  }
</script>

<style lang='stylus' scoped>

</style>
