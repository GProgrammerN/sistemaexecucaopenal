import { db } from "../../../firebase/firebase-admin-config";
import { NextResponse } from "next/server";
import { differenceInDays } from "date-fns";
import axios from 'axios';

const serviceId = process.env.EMAILJSSERVICEID as string
const templateId = process.env.EMAILJSTEMPLATEID as string
const userId = process.env.EMAILJSPUBLICKEY as string


var clientes2 = [{}];
clientes2.shift();

function formatDate2(Ref: Date) {
  var d = new Date(Ref);
  if (!isNaN(d.getTime())) {
    d.setDate(d.getDate() + 1);

    var month = "" + (d.getMonth() + 1);
    var day = "" + d.getDate();
    var year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  } else {
    return ["//"];
  }
}

export async function GET(req: Request) {
  const clientesRef = db.collection("usuario");
  const snapshot = await clientesRef.where("email", "!=", "").get();

  if (snapshot.empty) {
    return new Response(JSON.stringify({ message: "Nenhum cliente encontrado." }), { status: 200 });
  }

  let usuarios = [];

  snapshot.forEach((doc) => {
    usuarios.push({
      email: doc.data().email,
      expira: doc.data().expira,
      assinatura: doc.data().assinatura,
      user: doc.data().user,
    });
  });

  for (const usuario of usuarios) {
    const { user, email } = usuario;
    let mail = email;

    try {
      const querySnapshot = await db.collection("usuario/" + user + "/clientes/").get();

      let clientes = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const { dataprogressao, dataprogressao2, datacondicional } = data;
        const datar1 = new Date(dataprogressao);
        const datar2 = new Date(dataprogressao2);
        const datarc = new Date(datacondicional);
        const dataAtual = new Date();

        let d1 = differenceInDays(datar1, dataAtual);
        let d2 = differenceInDays(datar2, dataAtual);
        let d3 = differenceInDays(datarc, dataAtual);

        if ((d1 <= 60 && d1 >= 0) || (d2 <= 60 && d2 >= 0) || (d3 <= 60 && d3 >= 0)) {
          clientes.push(data);
        }
      });

      let xmessage = "";
      clientes.forEach((cliente) => {
        xmessage +=
          `${cliente.nome} ${cliente.presidio} ${cliente.matricula} ${cliente.processo} ` +
          `1ª Progressão: ${formatDate2(cliente.dataprogressao)} ` +
          `2ª Progressão: ${formatDate2(cliente.dataprogressao2)} ` +
          `Condicional: ${formatDate2(cliente.datacondicional)}\n`;
      });

      if (xmessage !== "") {
        console.log("mandou email para", mail, xmessage);
        const response = await axios.post(
          "https://api.emailjs.com/api/v1.0/email/send",
          {
            service_id: serviceId,
            template_id: templateId,
            user_id: userId,
            template_params: {
              email: mail,
              message: xmessage,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Você pode adicionar alguma lógica aqui para lidar com a resposta da API, se necessário.
      }
    } catch (error) {
      // Aqui você pode tratar o erro, por exemplo, registrando-o em um arquivo de log.
      console.error("Erro ao processar o usuário:", user, error);
    }
  }
  return new Response(JSON.stringify({ message: "Processamento concluído." }), { status: 200 });
}

