/**
 * 匹配规则：views根目录直接写组件名称
 * 模块路由规则 模块名/组件名称 name=组件名称
 */
let routes = [
  {
    path: "/",
    redirect: { name: "Home" },
    component:"layout",
    children: [
      {
        meta: { title: "后台首页" },
        component: "home/Home"
      },
      {
        meta: { title: "" },
        component: "abort/Abort"
      },
    ]
  },
  {
    meta: { title: "登录页" },
    path:"/login",
    component: "login/Login"
  },
  {
    path: "*",
    redirect: { name: "login" }
  },
];

// 获取路由信息方法
let getRoutes = function() {
  // 自动生成路由
  createRoute(routes);
  return routes;
};

// 自动生成路由 name属性跟component一直 单个直接用  带/的换成“_”
function createRoute(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return;
    // // 去除index name属性
    let path = arr[i].component;
    let val = getValue(path);
    // 生成name
    arr[i].name = arr[i].name || val.replace(/\//g, "_");
    // 生成path
    arr[i].path = arr[i].path || `/${path}`;
    // 自动生成component
    let componentFun = import(`../../views/${path}`);
    console.log(`../../views/${path}`);
    arr[i].component = () => componentFun;
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children);
    }
  }
}

// 去除index
function getValue(str) {
  // 获取最后一个/的索引
  let index = str.lastIndexOf("/");
  // 获取最后一个/后面的值
  let val = str.substring(index + 1, str.length);
  return val;
}
export default getRoutes();
