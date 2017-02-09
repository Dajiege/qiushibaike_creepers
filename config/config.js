module.exports = {
  //数据库连接
  MONGODB_STR: 'mongodb://localhost:27017/mongotest',
  //定时任务 晚上一点开始
  CRON: '1 1 22 * * * ',
  //数据表
  data: 'tb3',
  // 邮箱配置
  mail_opts: {
    host: "smtp.qq.com", // 主机
    port: 465,
    auth: {
      user: "522428268@qq.com", // 账号
      pass: "" // 密码
    },
    ignoreTLS: true,
  },
  LISTEN_MAIL:"5175248@qq.com",
  debug:"test"
};