const util = {
  phoneReg: /^1[3-9]\d{9}$/,
  emailReg: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  idCheck (value) {
    if (!value) {
      return true
    }
    const idReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (!idReg.test(value)) {
      return false
    }
    const prefix = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
    const suffix = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let wiSum = 0
    for (let i = 0; i < 17; i++) {
      wiSum += parseInt(value[i]) * prefix[i]
    }
    const wiMod = wiSum % 11
    const code = suffix[wiMod]
    const idCardLast = value[17].toUpperCase()
    if (code !== idCardLast) {
      return false
    }
    return true
  },
  dateFormat (date, format = 'yyyy-MM-dd HH:mm:ss') {
    if (!date) {
      return ''
    }
    if (typeof date === 'string') {
      if (date.indexOf('+') > -1) {
        date = date.substring(0, date.indexOf('+'))
        date = new Date(date)
        date.setHours(date.getHours() + 8)
      }
    }
    date = new Date(date)
    function plus0 (a) {
      return a * 1 < 10 ? '0' + a : a
    }
    return format.replace('yyyy', date.getFullYear()).replace('MM', plus0(date.getMonth() + 1))
      .replace('dd', plus0(date.getDate())).replace('HH', plus0(date.getHours())).replace('mm', plus0(date.getMinutes()))
      .replace('ss', plus0(date.getSeconds())).replace('SSS', date.getMilliseconds())
  },
  tableLoading (el) {
    let table = document.querySelector('.el-table')
    if (el) {
      table = el
    }
    if (!table) {
      return false
    }
    const mask = document.createElement('div')
    mask.classList.add('t-mask')
    mask.style.position = 'absolute'
    mask.style.height = '100%'
    mask.style.width = '100%'
    mask.style.top = '0'
    mask.style.left = '0'
    mask.style.background = 'rgba(255,255,255,.5)'
    mask.style.zIndex = '999'
    mask.style.display = 'flex'
    mask.style.justifyContent = 'center'
    mask.style.alignItems = 'center'
    mask.style.fontSize = '30px'
    mask.innerHTML = '<i class="el-icon-loading">'
    table.append(mask)
  },
  tableLoaded () {
    const mask = document.querySelector('.t-mask')
    if (!mask) {
      return false
    }
    mask.parentNode.removeChild(mask)
  },
  //时间格式转化
  timeFormat(time) {
    var d = new Date(time);
 
    var year = d.getFullYear();       //年  
    var month = d.getMonth() + 1;     //月  
    var day = d.getDate();            //日  
 
    var hh = d.getHours();            //时  
    var mm = d.getMinutes();          //分  
    var ss = d.getSeconds();           //秒  
 
    var clock = year + "/";
 
    if (month < 10)
        clock += "0";
 
    clock += month + "/";
 
    if (day < 10)
        clock += "0";
 
    clock += day + " ";
 
    if (hh < 10)
        clock += "0";
 
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
 
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}
}

export default util
