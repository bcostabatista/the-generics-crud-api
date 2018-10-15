import * as nodemailer from 'nodemailer'
import * as pug from 'pug'
import AWS from 'aws-sdk'
const path = require('path')

const ACCESS_KEY_ID = 'XXXXXXXXXXX'
const SECRET_ACCESS_KEY = 'XXXXXXXXXXX'

AWS.config.update({ 
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: 'us-east-1'
})

var transporter = nodemailer.createTransport({
    SES: new AWS.SES({
        apiVersion: '2010-12-01'
    })
})

export const Mailer = transporter
export const SendEmail = (to, subject, text, cb) => {
    transporter.sendMail({
        from: '"Email" <no-reply@example.com>',
        to, subject, text
    }, cb)
}

export const RenderEmail = (to, subject, htmlName, template, cb) => {
    const file = path.resolve(process.cwd(), `views/${htmlName}.pug`)
    const html = pug.renderFile(file, template)
    let attachments = []
    if(template.file) {
        let attachment = {
            filename: template.file.name,
            path: template.file.path,
            contentType: 'application/pdf'
        }
        attachments.push(attachment)
    }
    return transporter.sendMail({
        from: '"Email" <no-reply@example.com>',
        to, subject, html, attachments
    }, cb)
}
