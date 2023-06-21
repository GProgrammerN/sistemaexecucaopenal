'use client';
import firebase from '../../firebase/config'
import Layout from "@/components/template/Layout"
import Conteudo from "@/components/template/Conteudo"
import { useRef } from 'react';
import { IconeInformacao } from '@/components/icons';
import { useState } from 'react';
import CampoPerfil from '@/components/template/CampoPerfil';


export default function Perfil() {

  const user = firebase.auth().currentUser;

  const inputNomeRef = useRef<any>(null);
  const inputEmailRef = useRef<any>(null);
  const inputSenhaRef = useRef<any>(null);
  const inputAvatarRef = useRef<any>(null);
  const [erro, setErro] = useState(null);
  const [muda, setMuda] = useState(false)
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')

  function exibirErro(msg: any, tempoSegundos = 5, atencao: boolean) {
    if (atencao) {
      setMuda(true)
    } else {
      setMuda(false)
    }

    setErro(msg)
    setTimeout(() => setErro(null), tempoSegundos * 1000)
  }


  function atualizaUsuario() {
    //    const element = inputNomeRef.current
    //    const novoNome = element.value
    console.log(nome)
    user?.updateProfile({
      displayName: nome
    }).then(() => {
      //
      exibirErro('Alterado com sucesso', 3, false)
      //
    }).catch((error) => {
      //
      exibirErro('Erro desconhecido', 3, true)
      //
    });
  }

  function atualizaUsuario2(ref: any) {
    const element = inputAvatarRef.current;
    const novoAvatar = element?.value
    user?.updateProfile({
      photoURL: novoAvatar
    }).then(() => {
      //
      exibirErro('Alterado com sucesso', 3, false)
      //
    }).catch((error) => {
      //
      exibirErro('Erro desconhecido', 3, true)
      //
    });
  }

  function atualizaSenha() {
    
    user?.updatePassword(senha).then(() => {
      //
      exibirErro('Alterado com sucesso', 3, false)
      //
    }).catch((error) => {
      //
      exibirErro('Erro desconhecido', 3, true)
      //
    });
  }

  function alterarEmail(ref: any) {
    const element = inputEmailRef.current;
    const novoEmail = element?.value

    user?.updateEmail(novoEmail).then(() => {
      // Update successful
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    })
  }

  return (
    <Layout titulo="Perfil do Usuário"
      subtitulo="Administre suas informações de usuário.">
      <Conteudo />
      <form className="flex flex-col justify-center items-center m-2" method='post' autoComplete='off'>
        <CampoPerfil campo='Nome' placeholder='Coloque seu Nome' id='inputNome' type='text' botaovalor={true} funcao={atualizaUsuario} funcaoInput={event => setNome(event.target.value)}/>
        <CampoPerfil campo='Email' placeholder='exemplo@gmail.com' id='inputEmail' type='email' botaovalor={false}/>
        <CampoPerfil campo='Senha' placeholder='Senha 6 caracteres ou mais' id='inputSenha' type='password' botaovalor={false} funcao={atualizaSenha} funcaoInput={event => setSenha(event.target.value)}/>
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
        {erro ? (
          <div className={`flex items-center text-white py-3 px-5 my-2 border-2 rounded-lg
            ${muda ? 'bg-red-400 border-red-700' : 'bg-blue-400  border-blue-700'}
             `}>
            {IconeInformacao}
            <span className={`ml-3`}>{erro}</span>
          </div>
        ) : false}
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