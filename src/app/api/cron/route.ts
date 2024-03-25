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
    return NextResponse.json({ message: "Nenhum cliente encontrado." });
  } else {
//    console.log(snapshot);
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

  var tamanho = usuarios?.length;
  for (let contador = 0; contador < tamanho; contador++) {
    var { user, email } = usuarios[contador];

    let mail = email;

    db.collection("usuario/" + user + "/clientes/")
      .get()
      .then(async (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var y = doc.data();
          const obj = JSON.parse(JSON.stringify(y));
          var datap1 = obj.dataprogressao;
          var datap2 = obj.dataprogressao2;
          var datalc = obj.datacondicional;
          var datar1 = new Date(datap1);
          var datar2 = new Date(datap2);
          var datarc = new Date(datalc);
          var dataAtual = new Date();

          let d1 = differenceInDays(datar1, dataAtual);
          let d2 = differenceInDays(datar2, dataAtual);
          let d3 = differenceInDays(datarc, dataAtual);

          if (
            (d1 <= 60 && d1 >= 0) ||
            (d2 <= 60 && d2 >= 0) ||
            (d3 <= 60 && d3 >= 0)
          ) {
            clientes2.push(y);
          }
        });
        var xmessage = "";
        const obj = JSON.parse(JSON.stringify(clientes2));
//        console.log(mail, obj);
        obj?.forEach((ob) => {
          xmessage =
            xmessage +
            ob.nome +
            " " +
            ob.presidio +
            " " +
            ob.matricula +
            " " +
            ob.processo +
            " 1ª Progressão: " +
            formatDate2(ob.dataprogressao) +
            " 2ª Progressão: " +
            formatDate2(ob.dataprogressao2) +
            " Condicional: " +
            formatDate2(ob.datacondicional) +
            "\n";
        });
        if (xmessage != "") {

//          console.log("mandou email para",mail, xmessage);
          
          const { data } = await axios.post(
            "https://api.emailjs.com/api/v1.0/email/send",
            {
              service_id: serviceId,
              template_id: templateId,
              user_id: userId,
              template_params: {
                email: mail,
                message: xmessage,
              }
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
        clientes2 = [];
      });
  }
}
