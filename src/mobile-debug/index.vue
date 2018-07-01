<template>
  <div class="mobileDebugWrap" @touchmove.stop="">
    <div
      class="mobileDebugSwitch"
      :class="{'mobileDebugSwitchActive': show}"
      :style="{
        width: `${side}px`,
        height: `${side}px`,
        lineHeight: `${side}px`,
        left: `${left}px`,
        top: `${top}px`
      }"
      @touchstart.stop="handleTouchStart"
      @touchmove.stop.prevent="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="show = !show"
    >
      D
    </div>
    <div class="mobileDebugModal" v-show="show">
      <div class="mobileDebugNav clearfix">
        <div
          class="mobileDebugNavItem"
          :class="{'mobileDebugNavItemActive': navIndex === index}"
          v-for="(item, index) in nav"
          :key="index"
          :style="{
            'width': `${100 / nav.length}%`
          }"
          @click="handleSelectNav(index)"
        >
          {{item.name}}
        </div>
      </div>
      <div class="mobileDebugContWrap">
        <!-- log框 -->
        <div class="mobileDebugCont" v-show="navIndex === 0">
          <div class="mobileDebugLogItem clearfix" v-for="(log, index) in log" :key="index">
            <div class="mobileDebugLogItemCont">{{log.cont || undefined}}</div>
            <div class="mobileDebugLogItemComponent">{{log.component || 'unset'}}</div>
          </div>
        </div>
        <!-- 操作框 -->
        <div class="mobileDebugCont" v-show="navIndex === 1">
          caozuo
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileDebug',
  data () {
    return {
      show: false, // 调试框显示状态
      touch: false, // 手指是否接触开关
      left: 30, // 开关距离左边距离
      top: 10, // 开关距离右边距离
      offsetX: 0, // 横向偏移量
      offsetY: 0, // 纵向偏移量
      side: 50, // 开关的边长
      nav: [{ // 导航
        name: 'log'
      }, {
        name: '操作'
      }],
      navIndex: 0, // 导航选中的索引值
      log: []
    }
  },
  methods: {
    handleTouchStart: function (e) { // 手指触碰后
      this.touch = true
      let touch = e.targetTouches[0]
      let clientX = touch.clientX
      let clientY = touch.clientY
      this.offsetX = clientX - this.left
      this.offsetY = clientY - this.top
    },
    handleTouchMove: function (e) { // 手指拖动
      if (!this.touch) return false
      let touch = e.targetTouches[0]
      let clientX = touch.clientX
      let clientY = touch.clientY
      this.left = clientX - this.offsetX
      this.top = clientY - this.offsetY
    },
    handleTouchEnd: function () { // 手指停止拖动
      this.touch = false
    },
    handleSelectNav: function (index) { // 切换导航
      this.navIndex = index
    }
  }
}
</script>

<style>
.clear {
  width: 0;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.clearfix {
   content: "";
   display: table;
   clear: both;
}
.mobileDebugWrap {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 14px;
}
.mobileDebugSwitch {
  position: fixed;
  z-index: 1000;
  border-radius: 50%;
  background-color: black;
  opacity: 0.8;
  color: #fff;
  text-align: center;
  font-size: 30px;
}
.mobileDebugSwitchActive {
  box-shadow: 0 0 10px green;
}
.mobileDebugModal {
  position: fixed;
  z-index: 999;
  top: 20px;
  left: 5%;
  box-sizing: border-box;
  padding: 0 20px;
  border-radius: 4px;
  height: 50%;
  width: 90%;
  background-color: grey;
  opacity: 0.6;
}
.mobileDebugNav {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.mobileDebugNavItem {
  position: relative;
  float: left;
  text-align: center;
  color: #fff;
}
.mobileDebugNavItemActive:after {
  content: '';
  position: absolute;
  left: 50%;
  top: 8px;
  margin-left: -30px;
  display: inline-block;
  width: 60px;
  height: 24px;
  background-color: #fff;
  opacity: 0.3;
  border-radius: 4px;
}
.mobileDebugContWrap {
  position: absolute;
  top: 50px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
.mobileDebugCont {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
.mobileDebugLogItem {
  position: relative;
  color: #fff;
  width: 100%;
  margin-top: 10px;
  line-height: 40px;
}
.mobileDebugLogItem:before {
  content: '';
  position: absolute;
  height: 1px;
  width: 60%;
  left: 20%;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
}
.mobileDebugLogItem:first-child {
  margin-top: 0;
}
.mobileDebugLogItemCont {
  float: left;
  width: 75%;
}
.mobileDebugLogItemComponent {
  float: right;
  width: 25%;
}
</style>
