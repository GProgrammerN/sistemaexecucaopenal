import { db } from '../../../firebase/firebase-admin-config'
import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';


export async function POST(req: Request) {
    const clientesRef = db.collection("usuario")
    const snapshot = await clientesRef.where('email', '!=', '').get()

    if (snapshot.empty) {
        return NextResponse.json({ message: 'Nenhum cliente encontrado.' });
    }else{
        console.log(snapshot)
    }
    let usuarios = [];
    snapshot.forEach(doc => { 
        usuarios.push({ email: doc.data().email, expira: doc.data().expira, assinatura: doc.data().assinatura, user: doc.data().user });
    });
    
    console.log(usuarios)
}
/*

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
*/

