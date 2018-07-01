<template>
  <div id="app">
    <img src="./assets/logo.png" class="img" :class="{'active': active}">
    <div>
      <button @click="moveImg" class="btn" ref="btn">move</button>
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
