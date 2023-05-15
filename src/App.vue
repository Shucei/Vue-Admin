<template>
  <router-view></router-view>
</template>

<script setup>

// 在Vue应用程序中使用ResizeObserver时，防止过多的回调触发。在这个文件中，我们定义了一个名为“debounce”的函数，它接受一个函数和一个延迟时间作为参数，并返回一个新的函数，该函数在调用时将使用setTimeout函数来延迟调用原始函数。然后，我们覆盖了window.ResizeObserver类，并在构造函数中使用debounce函数来包装回调函数，以便在调整大小时不会过于频繁地触发回调。最后，我们将覆盖后的ResizeObserver类赋值给window.ResizeObserver，以便在整个应用程序中使用。
const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}


</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
