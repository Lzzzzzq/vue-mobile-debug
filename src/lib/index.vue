<template>
  <div class="mobileDebugWrap" @touchmove.stop="" v-if="enabled">
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
        <div class="mobileDebugLogOperate" v-show="navIndex === 0">
          <div class="mobileDebugLogOperateItem" @click="handleCleanAllLog">清空</div>
        </div>
        <div class="mobileDebugCont" ref="logWrap" v-show="navIndex === 0" :style="{'margin-top': '20px'}">
          <div
            class="mobileDebugLogItem clearfix"
            :class="{mobileDebugLogItemErr: log.type === 'error'}"
            v-for="(log, index) in log"
            :key="index"
          >
            <div class="mobileDebugLogItemCont"><pre>{{log.cont || undefined}}</pre></div>
            <div class="mobileDebugLogItemComponent">{{log.component || 'unset'}}</div>
          </div>
        </div>
        <!-- 操作框 -->
        <div class="mobileDebugCont clearfix" v-show="navIndex === 1">
          <div class="mobileDebugOperateBtn" @click="handleClearLocalStorage">清空 LocalStorage</div>
          <div class="mobileDebugOperateBtn" @click="handleClearCookies">清空 Cookies</div>
          <div class="mobileDebugOperateBtn" @click="handleRefreshPage">刷新页面</div>
        </div>
        <!-- 数据框 -->
        <div class="mobileDebugCont" v-show="navIndex === 2">
          <div class="mobileDebugDataBtnWrap clearfix">
            <div
              class="mobileDebugDataBtn"
              :class="{mobileDebugDataBtnActive: dataIndex === index}"
              v-for="(item, index) in dataBtn"
              :key="index"
              @click="handleSelectDataBtn(index)"
            >
              {{item.name}}
            </div>
          </div>
          <div class="mobileDebugDataCont">
            <pre>{{!dataCont ? '毛都没有' : dataCont}}</pre>
          </div>
        </div>
        <!-- 性能框 -->
        <div class="mobileDebugCont" v-show="navIndex === 3">
          <div class="mobileDebugPerformanceWrap">
            <div class="mobileDebugPerformanceText" v-show="performanceState === 0 || performanceErr">
              {{performanceMsg}}
            </div>
            <div class="mobileDebugPerformanceDataWrap" v-show="performanceState === 1 && !performanceErr">
              <div 
                class="mobileDebugPerformanceData clearfix"
                v-for="(value, key) in performanceObj"
              >
                <div class="mobileDebugPerformanceDataKey">{{key}}</div>
                <div class="mobileDebugPerformanceDataValue">{{value}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCookies, clearCookies, clearLocalStorage, getLocalStorage} from './utils/common'
import getPerformance from './utils/performance'

export default {
  name: 'MobileDebug',
  data () {
    return {
      enabled: false,
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
      }, {
        name: '数据'
      }, {
        name: '性能'
      }],
      navIndex: 0, // 导航选中的索引值
      log: [], // log列表
      dataBtn: [ // 数据框内的按钮
        {
          name: 'Cookies'
        }, {
          name: 'LocalStorage'
        }
      ],
      dataIndex: -1, // 数据框内选择的按钮
      dataCont: '', // 数据框内容
      performanceState: 0, // 性能获取状态
      performanceObj: {}, // 性能数据
      performanceErr: false, // 性能获取是否出错
      performanceMsg: '正在获取性能数据' // 性能框提示框  
    }
  },
  watch: {
    log: function () {
      setTimeout(() => {
        this.$refs.logWrap.scrollTop = this.$refs.logWrap.scrollHeight
      })
    },
    navIndex: function () {
      this.changeDataCont(this.dataIndex)
    }
  },
  mounted: function () {
    this.handleSelectDataBtn(0)
    this.getPerformance()
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
      if (!this.touch) return false
      this.touch = false
    },
    handleSelectNav: function (index) { // 切换导航
      this.navIndex = index
    },
    handleCleanAllLog: function () { // 清空log
      this.log = []
    },
    handleRefreshPage: function () { // 刷新页面
      location.reload(true)
    },
    handleSelectDataBtn: function (index) { // 选择数据项
      this.dataCont = ''
      this.dataIndex = index
      this.changeDataCont(index)
    },
    changeDataCont: function (type) { // 修改dataCont为cookies
      switch (type) {
        case 0:
          this.dataCont = JSON.stringify(getCookies(), null, 2)
          break
        case 1:
          this.dataCont = JSON.stringify(getLocalStorage(), null, 2)
          break
        default:
          return
      }
    },
    handleClearCookies: function () { // 清空 cookies
      clearCookies()
    },
    handleClearLocalStorage: function () { // 清空 localstorage
      clearLocalStorage()
    },
    getPerformance: function () { // 获取性能数据
      getPerformance()
        .then(data => {
          this.performanceState = 1
          this.performanceErr = false
          this.performanceMsg = ''
          this.performanceObj = data.timing
        })
        .catch(e => {
          this.performanceState = 1
          this.performanceErr = true
          this.performanceMsg = e.msg
        })
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
