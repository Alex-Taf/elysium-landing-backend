import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const { EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_RECEIVER, EMAIL_PORT } = process.env

class Mailer {
    #transporter = null

    constructor() {
        this.#transporter = this.#getTransporter()
    }

    #getTransporter() {
        return nodemailer.createTransport({
            service: EMAIL_HOST,
            port: EMAIL_PORT,
            secure: false,
            auth: {
                user: EMAIL_HOST_USER,
                pass: EMAIL_HOST_PASSWORD
            }
        })
    }

    async send(message) {
        try {
            const info = await this.#transporter.sendMail({
                from: EMAIL_HOST_USER,
                to: EMAIL_RECEIVER,
                subject: 'PeekTime Elysium verification',
                text: `${message.nameAndSurname}
                        ${message.email}
                        ${message.country}
                        ${message.symbolicSum}
                        ${message.birthDate}
                        ${message.phone}
                        ${message.address}
                        ${message.exchange}`,
                html: `<b>Name: ${message.nameAndSurname}</b><br>
                        <b>Email: ${message.email}</b><br>
                        <b>Country: ${message.country}</b><br>
                        <b>Symbolic sum: ${message.symbolicSum}</b><br>
                        <b>Date of birth: ${message.birthDate}</b><br>
                        <b>Phone: ${message.phone}</b><br>
                        <b>Address: ${message.address}</b><br>
                        <b>Exchange: ${message.exchange}</b><br>`,
            })
            
            return info.messageId
        } catch(e) {
            return e
        }
    }
}

export default new Mailer()
