<template>
  <el-menu
    :collapse="collapse"
    router
    :style="{height: '100%', overflow: 'auto', width: menuWidth}"
    background-color="#555"
    active-text-color="#60a8f3"
    text-color="#fff"
    :default-active="onRoutes"
  >
    <el-menu-item index="/home/welcome">
      <i class="icon-shouye iconfont"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <template v-for="(menu1,index1) in menu">
      <el-submenu v-if="menu1.children && permissions.indexOf(menu1.permission) > -1" :key="index1" :index="menu1.path">
        <template slot="title">
          <i v-if="menu1.icon" :class="'iconfont '+ menu1.icon"></i>
          <span>{{menu1.title}}</span>
        </template>
        <template v-for="(menu2,index2) in menu1.children">
          <el-submenu v-if="menu2.children && permissions.indexOf(menu2.permission) > -1" :key="index2" :index="menu2.path">
            <template slot="title">
              <i v-if="menu2.icon" :class="menu2.icon"></i>
              <span>{{menu2.title}}</span>
            </template>
            <template v-for="(menu3,index3) in menu3.children">
              <el-menu-item v-if="permissions.indexOf(menu3.permission) > -1" :index="menu3.path" :key="index3">
                <i v-if="menu3.icon" :class="menu3.icon"></i>
                <span slot="title">{{menu3.title}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else-if="permissions.indexOf(menu2.permission) > -1" :index="menu2.path" :key="index2">
            <i v-if="menu2.icon" :class="menu2.icon"></i>
            <span slot="title">{{menu2.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else-if="permissions.indexOf(menu1.permission) > -1" :index="menu1.path" :key="index1">
        <i v-if="menu1.icon" :class="menu1.icon"></i>
        <span slot="title">{{menu1.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import menu from '../../menu'
export default {
  name: 'Sider',
  data () {
    return {
      menuWidth: '220px',
      collapse: false,
      menu: menu
    }
  },
  created () {
    if (window.innerWidth < 800) {
      this.collapse = true
      this.menuWidth = '56px'
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 800) {
        this.collapse = true
        this.menuWidth = '56px'
      } else {
        this.collapse = false
        this.menuWidth = '220px'
      }
    })
  },
  computed: {
    onRoutes () {
      return this.$route.meta.ppath || this.$route.path
    },
    permissions () {
      return this.$store.state.permission
    }
  }
}
</script>

<style lang='stylus' scoped>
   i
    color #eee
</style>
