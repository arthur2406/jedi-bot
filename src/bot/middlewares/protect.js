const { adminChatId } = require('config')
const env = require('node-env-manager')

const hasUserRole = require('../utils/hasUserRole')

const protect = (...roles) => (ctx, next) => hasUserRole(ctx.state.user, ...roles) && next()

protect.chat = (chatId = adminChatId) => (ctx, next) => (env.isDev()
  || ctx.chat.id === chatId) && next()

module.exports = protect
