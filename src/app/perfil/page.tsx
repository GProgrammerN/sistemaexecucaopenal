'use client';
import { useEffect } from "react";

import Layout from "@/components/template/Layout"


export default function Perfil() {
     return (
      <Layout titulo="Perfil do Usuário" 
        subtitulo="Administre suas informações de usuário.">
          <h1>Perfil de Usuário</h1>
      </Layout>
    )
}

/*
const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Update successful
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});
*/