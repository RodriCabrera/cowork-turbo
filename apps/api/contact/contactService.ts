import MailService from '../mail/mailService'
import config from '../config/config'
import { ContactData } from './contactController'

export default class ContactService {
  static async sendContactEmail(data: ContactData) {
    const mailService = MailService.getInstance()
    await mailService.sendMail({
      from: data.from.email,
      to: config.gmail.user,
      subject: `Contact from ${data.from.name}`,
      text: data.message
    })
  }
}
