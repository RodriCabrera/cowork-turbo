/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
import nodemailer, { Transporter } from 'nodemailer'
import MailInterface from './MailInterface'

export default class MailService {
  private static instance: MailService
  private transporter?: Transporter

  private constructor() {}
  static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService()
    }
    return this.instance
  }

  async createConnection() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      },
      pool: true
    })
    console.log('Connected to test SMTP')
  }

  async sendMail(options: MailInterface) {
    const sent = await this.transporter?.sendMail({
      ...options
    })
    if (Object.hasOwn(sent, 'accepted') && sent.accepted instanceof Array) {
      return sent.accepted.length !== 0
    }
    return false
  }

  async getTransporter() {
    return this.transporter
  }

  async verifyConnection() {
    return this.transporter?.verify()
  }
}
