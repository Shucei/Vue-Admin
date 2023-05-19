/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'path-browserify' // nodejs path
declare module 'css-color-function' // css颜色函数
declare module 'js-audio-recorder' // 录音

// declare module '*.scss' {
//   const content: { [className: string]: string };
//   export default content;
// }
