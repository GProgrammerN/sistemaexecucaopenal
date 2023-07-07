import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'

const email = process.env.MAILADRESS


const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.API_KEY
        }
    })
)

export async function POST(req: NextRequest, res: NextResponse) {
//        const { clienteId } = req
        const message = {
            from: email, //'enio.perfil@gmail.com',
            to: email, //'enio.perfil@gmail.com',
            subject: "Alterações no Cliente",
            text: `O Cliente, fez alteração na forma de pagamento, verificar!`
        }
        transporter.sendMail(message)
        return //res.json()

}