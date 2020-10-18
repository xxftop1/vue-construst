var fake = false
var serverUrl = "/api/v1"
var projectID = "5b72a8ff6157e72acc8a3fbd"
var mockUrl = "/mock/" + projectID + "/api/v1"
var url = fake ? mockUrl : serverUrl
const apis = {
	api_login:"/sys/sysUser/login",//登录接口
	api_captchaCode:url+"",//验证码接口
  getUserList: "/sys/sysUser/list", // 获取用户信息
};

export {
  apis
}
