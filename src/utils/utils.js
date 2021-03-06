// fn是我们需要包装的事件回调, delay是时间间隔的阈值
export function throttle(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0
  let timer = null
  // 将throttle处理结果当作函数返回
  return function() {
    const that = this
    // 保留调用时的this上下文
    const context = that
    // 保留调用时传入的参数
    const args = arguments
    // 记录本次触发回调的时间
    const now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer)
      timer = setTimeout(function() {
        last = now
        fn.apply(context, args)
      }, delay)
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now
      fn.apply(context, args)
    }
  }
}
// 防抖函数
export function debounce(func, delay) {
  let timeout = null
  return function() {
    const context = this
    const args = arguments
    timeout ? clearTimeout(timeout) : null
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}

// 获取QueryString的数组
export function getQueryString() {
  const result = window.location.search.match(
    new RegExp("[?&][^?&]+=[^?&]+", "g")
  )
  if (result == null) {
    return ""
  }
  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].substring(1)
  }
  return result
}
// 根据 QueryString 参数名称获取值
export function getQueryStringByName(name) {
  const result = window.location.search.match(
    new RegExp("[?&]" + name + "=([^&]+)", "i")
  )
  if (result == null || result.length < 1) {
    return ""
  }
  return result[1]
}
// 获取页面顶部被卷起来的高度
export function getScrollTop() {
  return Math.max(
    // chrome
    document.body.scrollTop,
    // firefox/IE
    document.documentElement.scrollTop
  )
}
// 获取页面文档的总高度
export function getDocumentHeight() {
  // 现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  )
}
// 页面浏览器视口的高度
export function getWindowHeight() {
  return document.compatMode === "CSS1Compat"
    ? document.documentElement.clientHeight
    : document.body.clientHeight
}
// // 时间 格式化成 2018-12-12 12:12:00
export function timestampToTime(timestamp, dayMinSecFlag) {
  const date = new Date(timestamp)
  const Y = date.getFullYear() + "-"
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-"
  const D =
    date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " "
  const h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":"
  const m =
    date.getMinutes() < 10
      ? "0" + date.getMinutes() + ":"
      : date.getMinutes() + ":"
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  if (!dayMinSecFlag) {
    return Y + M + D
  }
  return Y + M + D + h + m + s
}

// 判断是移动端还是 pc 端 ，true 表示是移动端，false 表示是 pc 端
export function isMobileOrPc() {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}
