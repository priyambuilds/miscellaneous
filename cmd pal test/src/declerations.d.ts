declare module '*.css'
declare module '*.css?inline' {
  const css: string
  export default css
}
declare module '*.scss'
declare module '*.scss?inline' {
  const scss: string
  export default scss
}
