<template>
  <div id="app">
    <img src="./assets/logo.png" class="img" :class="{'active': active}">
    <div>
      <button @click="moveImg" class="btn" ref="btn">move</button>
      1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>
      1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1
      <img src="//gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="">
      <br/>1<br/>1<br/>1<br/>1<br/>1<br/>
      1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>
      1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>
      1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>
      1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>1<br/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      active: false
    }
  },
  methods: {
    moveImg: function () {
      // let btn = document.getElementsByClassName('btn')[0]
      // console.log(btn.clientHeight)
      // let btn = this.$refs.btn
      this.$log(123)
      this.$log('123')
      this.$log([1, 2, 3])
      this.$log({a: 1, b: 2, c: 3, d: '这是个啥', e: '超出长度了的话会发生什么情况呢aaaaaaa'}, true)
      this.$log(function tst () {})
      this.active = true
    }
  },
  mounted: function () {
    // this.$log(123)
  }
}
</script>

<style>
.img {
  position: absolute;
  top: 100px;
  left: 0;
  transition: all 0.3s;
}
.active {
  left: 100px;
}
</style>
