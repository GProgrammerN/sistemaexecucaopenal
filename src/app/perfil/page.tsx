'use client';
import { useEffect, useState } from "react";
import firebase from '../../firebase/config'
import Layout from "@/components/template/Layout"




export default function Perfil() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function atualizaUsuario() {
    const user = firebase.auth().currentUser;
    user?.updateProfile({
    displayName: nome
    }).then(() => {
      // Update successful
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }
  
  return (
      <Layout titulo="Perfil do Usuário" 
        subtitulo="Administre suas informações de usuário.">
          <h1>Perfil de Usuário</h1>

          <form className="flex justify-center p-2 m-2">
              <div className="flex flex-col justify-center text-gray-500 py-3 px-5 my-2">
                <input type="text" placeholder="Nome de exibição" onChange={event => setNome(event.target.value)}></input>
                <input type="email" placeholder="Email" onChange={event => setEmail(event.target.value)}></input>
                <input type="password" placeholder="Senha" onChange={event => setSenha(event.target.value)}></input>
              </div>
              <button onClick={atualizaUsuario}>Atualizar</button>
          </form>

      </Layout>
    )
}

/* ATUALIZAR PERFIL DO USUÁRIO
const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: nome,
  photoURL: avatar
}).then(() => {
  // Update successful
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});
*/

/* MUDAR / ATUALIZAR EMAIL
const user = firebase.auth().currentUser;

user.updateEmail("user@example.com").then(() => {
  // Update successful
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});
*/

/* MANDAR EMAIL DE VERIFICAÇÃO
firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    // Email verification sent!
    // ...
  });
*/

/* MUDAR SENHA DO USUARIO
const user = firebase.auth().currentUser;
const newPassword = getASecureRandomPassword();

user.updatePassword(newPassword).then(() => {
  // Update successful.
}).catch((error) => {
  // An error ocurred
  // ...
});
*/

/* EXCLUIR USUÁRIO
const user = firebase.auth().currentUser;

user.delete().then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
});
*/

/* DESCONECTAR / LOGOUT USUÁRIO
firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
*/