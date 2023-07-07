import { Tags, Route, Post, Body } from 'tsoa'
import ContactService from './contactService'

export type ContactData = {
  from: {
    email: string
    name: string
  }
  message: string
}

@Route('contact')
@Tags('Contact')
export default class ContactController {
  /**
   *
   * @param data ContactData
   */
  @Post('/')
  static async sendContact(@Body() data: ContactData) {
    return ContactService.sendContactEmail(data)
  }
}
