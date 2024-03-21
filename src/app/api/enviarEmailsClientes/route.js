// pages/api/enviarEmailsClientes.js
import { db } from '../../../firebase/firebase-admin-config'
import nodemailer from 'nodemailer';

export async function POST(req) {

    const clientesRef = db.collection("usuario")
    const snapshot = await clientesRef.where('email', '!=', '').get()

    if (snapshot.empty) {
        return res.status(404).json({ message: 'Nenhum cliente encontrado.' });
    }

    let clientes = [];
    snapshot.forEach(doc => {
        clientes.push({ email: doc.email, ...doc.data() });
    });

    console.log(clientes)

    await enviarEmailsParaClientes(clientes);

    res.status(200).json({ message: 'E-mails enviados com sucesso.' });
}

async function enviarEmailsParaClientes(clientes) {
    let transporter = nodemailer.createTransport({
        // Substitua com a configuração do seu serviço de e-mail
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAILADRESS,
            pass: process.env.MAILPASS
        }
    });

    for (let cliente of clientes) {
        const mailOptions = {
            from: `<Sistema Execução Penal> ` + process.env.MAILADRESS,
            to: 'guilherme.programador12@gmail.com', // cliente.email, // Certifique-se de que o documento do cliente tenha um campo 'email'
            subject: 'Notificação',
            text: 'Prezado cliente, temos uma notificação importante para você. Por favor, entre em contato conosco para mais informações.'
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Email enviado para: ${cliente.email}`);
        } catch (error) {
            console.error(`Erro ao enviar email para ${cliente.email}: ${error}`);
        }
    }
}

