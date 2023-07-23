import MailService from '../mail/mailService'
import config from '../config/config'
import { BasicContactData } from './contactTypes'
import { contactTemplate } from '../mail/templates'

export default class ContactService {
  static async sendContactEmail(data: BasicContactData) {
    const mailService = MailService.getInstance()
    return await mailService.sendMail({
      from: data.from.email,
      to: config.gmail.user,
      subject: `Contact from ${data.from.name}`,
      html: contactTemplate(data)
    })
  }
}
