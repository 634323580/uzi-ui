import Sidebar from './sidebar.vue'

export interface SidebarItemProps {
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
    activeMenu?: string;
    // 当路由设置了该属性，则会高亮相对应的侧边栏。
    // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
    // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    [propName: string]: any;
  };
  children?: Array<SidebarItemProps>; // 嵌套路由
  [propName: string]: any;
}

export default Sidebar