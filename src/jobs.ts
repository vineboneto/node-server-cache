import mail from './mailer'

export const SendMail = {
  key: 'SendEmail',
  async handler(data) {
    const { email } = data.data
    await mail.sendMail({
      to: email,
      subject: 'Testing Email',
      from: 'Queue Teste',
      html: '<p>Hello World</p>',
    })
  },
}
