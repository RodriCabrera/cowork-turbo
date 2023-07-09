import { Tags, Route, Post, Body, Response } from 'tsoa'
import ContactService from './contactService'
import { BasicContactData } from './contactTypes'

@Route('contact')
@Tags('Contact')
export default class ContactController {
  /**
   *
   * @param data ContactData
   */
  @Response(200)
  @Post('/')
  static async sendContact(@Body() data: BasicContactData) {
    return ContactService.sendContactEmail(data)
  }
}
