'use client';
import { useEffect, useState } from "react";
import firebase from '../../firebase/config'
import Layout from "@/components/template/Layout"
import { useRef } from 'react';



export default function Perfil() {

  const user = firebase.auth().currentUser;

  const inputNomeRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputSenhaRef = useRef(null);
  const inputAvatarRef = useRef(null);

  function atualizaUsuario(ref: any) {
    const element = inputNomeRef.current;
    const novoNome = element?.value
    user?.updateProfile({
      displayName: novoNome
    }).then(() => {
      // Update successful
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }

  function atualizaUsuario2(ref: any) {
    const element = inputAvatarRef.current;
    const novoAvatar = element?.value
    user?.updateProfile({
      photoURL: novoAvatar
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
      <form className="flex flex-col justify-center items-center m-2">
        <div className="flex items-center border-b w-100 mb-2 border-teal-500 py-2">
          <label htmlFor="inputNome" className="dark:text-white text-black pr-4">Nome</label>
          <input ref={inputNomeRef} className="
    appearance-none bg-transparent border-none text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text" placeholder="Nome de Exibição" id="inputNome" />
          <button className="
    flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button" onClick={atualizaUsuario}>
            Salvar
          </button>
        </div>
        <div className="flex items-center border-b w-100 mb-2 border-teal-500 py-2">
          <label htmlFor="inputEmail" className="dark:text-white text-black pr-4">Email</label>
          <input ref={inputEmailRef} className="
    appearance-none bg-transparent border-none dark:bg-gray-700 bg-gray-800 text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="email" placeholder="E-mail" id="inputEmail" />
          <button className="
    flex-shrink-0 bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-sm border-4 text-white py-1 px-2 rounded"
            type="button">
            Alterar
          </button>
        </div>
        <div className="items-center border-b w-100 mb-2 border-teal-500 py-2">
          <label htmlFor="inputSenha" className="dark:text-white text-black pr-4">Senha</label>
          <input ref={inputSenhaRef} className="
    appearance-none bg-transparent border-none bg-neutral-800 text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="password" placeholder="Senha" id="inputSenha"/>
          <button className="
    flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button">
            Salvar
          </button>
        </div>
        <div className="items-center border-b w-100 mb-2 border-teal-500 py-2">
        <label htmlFor="inputAvatar" className="dark:text-white text-black pr-4">Foto    </label>
          <input ref={inputAvatarRef} className="
    appearance-none bg-transparent border-none text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text" placeholder="http://www.suaimagem.jpg" id="inputAvatar" />
          <button className="
    flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button" onClick={atualizaUsuario2}>
            Salvar
          </button>
        </div>
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