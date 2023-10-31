//import Localimage from "../../../public/images/LOGO_APP_BRANCO.png"
import Localimage2 from "../../../public/images/LOGO 2.png"
import Image from "next/image"

export default function Logo() {
  return (
    <div>
        <Image src={Localimage2}
        width={60} height={60}
        alt={'logotipo da empresa'}
     />
    </div>
  )
}
