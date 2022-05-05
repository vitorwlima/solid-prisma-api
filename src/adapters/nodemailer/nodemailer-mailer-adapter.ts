import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '0fa562426248c1',
    pass: 'c689f227d7434b'
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Vitor Lima <vitorwlima13@gmail.com>',
      subject,
      html: body
    })
  }
}
