import type { App, Plugin } from "vue";
import { each } from "lodash-es";

// 定义一个类型 SFCWithInstall，它是 T 和 Plugin 的交集类型
type SFCWithInstall<T> = T & Plugin;

// 定义一个函数 makeInstaller，接受一个组件数组作为参数
export function makeInstaller(component: Plugin[]) {
  // 定义一个安装器函数，接受一个 Vue 应用实例作为参数
  const installer = (app: App) => each(component, (c) => app.use(c));

  // 返回安装器函数，并将其类型断言为 Plugin
  return installer as Plugin;
}

// 定义一个函数 withInstall，接受一个组件作为参数
export const withInstall = <T>(component: T) => {
  // 为组件添加 install 方法，用于在 Vue 应用中注册组件
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name;
    app.component(name, component as Plugin);
  };
  // 返回添加了 install 方法的组件
  return component as SFCWithInstall<T>;
};
