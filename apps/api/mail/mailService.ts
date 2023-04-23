/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
import nodemailer, { Transporter } from 'nodemailer'
import MailInterface from './MailInterface'

export default class MailService {
  private static instance: MailService
  private transporter: Transporter

  private constructor() {}
  static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService()
    }
    return this.instance
  }

  // TODO use real host
  async createConnection() {
    //    const account = await nodemailer.createTestAccount()
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
      // ...account.smtp,
      // auth: {
      //   user: account.user,
      //   pass: account.pass
      // }
    })
    console.log('Connected to test SMTP')
  }

  async sendMail(options: MailInterface) {
    return this.transporter.sendMail({
      ...options
    })
  }

  async getTransporter() {
    return this.transporter
  }

  async verifyConnection() {
    return this.transporter.verify()
  }
}
