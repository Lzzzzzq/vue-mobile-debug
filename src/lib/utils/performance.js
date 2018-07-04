export default function checkPerformance () {
  return new Promise((resolve, reject) => {
    handleAddListener('load', getTiming)

    function handleAddListener (type, fn) {
      if (window.addEventListener) {
        window.addEventListener(type, fn)
      } else {
        window.attachEvent('on' + type, fn)
      }
    }

    function getTiming () {
      try {
        let performance = window.performance;
        if (!performance) {
          reject({
            state: 0,
            msg: '不支持 performance 接口'
          })
        }
        let time = performance.timing
        let timingObj = {}

        let loadTime = (time.loadEventEnd - time.loadEventStart) / 1000

        if (loadTime < 0) {
          setTimeout(function () {
            getTiming()
          }, 200)
          return
        }
        if (performance.memory) {
          timingObj['js占用内存'] = (performance.memory.usedJSHeapSize / 1000000).toFixed(2) + 'mb'
        }
        timingObj['重定向时间'] = ((time.redirectEnd - time.redirectStart) / 1000).toFixed(2) + 's'
        timingObj['DNS解析时间'] =
          ((time.domainLookupEnd - time.domainLookupStart) / 1000).toFixed(2) + 's'
        timingObj['TCP完成握手时间'] =
          ((time.connectEnd - time.connectStart) / 1000).toFixed(2) + 's'
        timingObj['HTTP请求响应完成时间'] =
          ((time.responseEnd - time.requestStart) / 1000).toFixed(2) + 's'
        timingObj['DOM开始加载前所花费时间'] =
          ((time.responseEnd - time.navigationStart) / 1000).toFixed(2) + 's'
        timingObj['DOM加载完成时间'] = ((time.domComplete - time.domLoading) / 1000).toFixed(2) + 's'
        timingObj['DOM结构解析完成时间'] =
          ((time.domInteractive - time.domLoading) / 1000).toFixed(2) + 's'
        timingObj['脚本加载时间'] =
          ((time.domContentLoadedEventEnd - time.domContentLoadedEventStart) / 1000).toFixed(2) + 's'
        timingObj['onload事件时间'] =
          ((time.loadEventEnd - time.loadEventStart) / 1000).toFixed(2) + 's'
        timingObj['页面完全加载时间'] =
          (parseFloat(timingObj['重定向时间']) +
          parseFloat(timingObj['DNS解析时间']) +
          parseFloat(timingObj['TCP完成握手时间']) +
          parseFloat(timingObj['HTTP请求响应完成时间']) +
          parseFloat(timingObj['DOM结构解析完成时间']) +
          parseFloat(timingObj['DOM加载完成时间'])).toFixed(2) + 's'
        resolve({
          state: 1,
          timing: timingObj
        })
      } catch (e) {
        alert(e)
        reject({
          state: 0,
          msg: '获取失败'
        })
      }
    }
  })
}
