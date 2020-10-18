import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./modules/router.js"

Vue.use(VueRouter)

const router = new VueRouter({
	routes,
  base:'',
  linkActiveClass:'active' //默认激活样式
})

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  let user = sessionStorage.getItem("user");

  if (token) {
    // 已登录
    if (to.path === "/login") {
      Vue.prototype.$message.error("请不用重复登录");
      return next({
        name: from.name ? from.name : "index"
      });
    }
    if (!user) {
      Vue.prototype.$message.error("获取用户信息失败");
      return next({
        name: from.name ? from.name : "index"
      })
    }
    next();
    // 页面权限验证
      // if (user) {
      //   user = JSON.parse(user)
        //超级管理员直接放行
        // if (user.super === 1) {
        //   return next()
        // }

      // }
      //权限认证
      // let rules = sessionStorage.getItem("rules");
      // rules = rules ? JSON.parse(rules) : [];
      // let index = rules.findIndex(item => {
      //   return item.rule_id > 0 && item.desc === to.name;
      // });
      // if (index === -1) {
      //   Message.error("你没有权限访问");
      //   return next({
      //     name: from.name ? from.name : "error_404"
      //   });
      // }
    // next();
  } else {
    // 未登录
    if (to.path === "/login") {
      return next();
    }
    next({
      path: "/login"
    });
  }
});

export default router
