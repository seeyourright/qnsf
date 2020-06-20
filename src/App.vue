<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/*reset*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
/*滚动条*/
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  border-radius: 3px;
  background: rgba(0,0,0,0.06);
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.08);
}
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(0,0,0,0.12);
  -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
}
/*a标签*/
a{
  text-decoration: none;
}
input:-webkit-autofill { box-shadow: 0 0 0px 1000px white inset !important;}

/*表格*/
  .el-table th.gutter {
  display: table-cell !important;
}

.el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: rgba(190, 190, 190, 0.5);
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: rgba(190, 190, 190, 0.5);
}

/deep/ .el-table--border td,
/deep/ .el-table--border th,
/deep/
  .el-table__body-wrapper
  .el-table--border.is-scrolling-left
  ~ .el-table__fixed {
  border-right: 1px solid rgba(190, 190, 190, 0.5);
}

/deep/ .el-table td,
/deep/ .el-table th.is-leaf {
  border-bottom: 1px solid rgba(190, 190, 190, 0.5);
}
</style>
