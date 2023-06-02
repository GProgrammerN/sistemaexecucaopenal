import Localimage from "./img/LOGO_APP_BRANCO.png"
import Image from "next/image"
export default function Logo() {
  return (
    <div>
        <Image src={Localimage}
        width={60} height={60}
        alt={'logotipo da empresa'}
     />
    </div>
  )
}
