const config = require('config')
const WizardScene = require('telegraf/scenes/wizard')

const chooseDirectionHandler = require('../../../utils/chooseDirectionHandler')
const userService = require('../../../service/user')

const scene = new WizardScene(config.scenes.home.otherMentors,
  chooseDirectionHandler('Вибери порядковий номер напряму', { hasMentors: true }),
  async ctx => {
    if (ctx.message.text === config.buttons.back) {
      return ctx.home('👌')
    }
    const num = parseInt(ctx.message.text, 10)
    const direction = ctx.scene.state.directions[num - 1]
    if (!direction) {
      return ctx.reply('Щось не той номер, спробуй ще разок')
    }
    const ops = { format: true }
    const answer = await userService.getMentorsByDirections([{ id: direction._id }], ops)
    return answer
      ? ctx.replyWithHTML(answer)
      : ctx.home('Не знайшов жодного ментора. Скоріш за все список оновився, спробуй ще раз')
  })

module.exports = scene
