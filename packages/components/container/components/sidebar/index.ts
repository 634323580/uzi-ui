import Sidebar from './sidebar.vue'

export interface Sidebar {
  name: string;
  path: string;
  // 如果设置为true，项目将不会显示在侧栏中（默认值为false）
  hidden?: boolean;
  // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
  alwaysShow?: boolean;
  meta: {
    title: string;
    icon?: string;
    [propName: string]: any;
  };
  children?: Array<Sidebar>; // 嵌套路由
  [propName: string]: any;
}

export default Sidebar