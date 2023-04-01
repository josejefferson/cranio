import styles from '@/styles/Footer.module.css'
import { Avatar, AvatarGroup, Divider } from '@chakra-ui/react'

export default function Footer() {
  return (
    <footer className={styles.footer} style={{ color: 'white' }}>
      <div className={styles.avatars}>
        {/* <AvatarGroup size="md" max={2}> */}
        <Avatar name="Jefferson Dantas" src="https://github.com/josejefferson.png?size=64" />
        <Avatar name="Kayo Ronald" src="https://github.com/kayoronald.png?size=64" />
        {/* </AvatarGroup> */}
      </div>
      <div className={styles.developedBy}>
        Desenvolvido por <b>Jefferson Dantas</b> &amp; <b>Kayo Ronald</b> com o professor{' '}
        <b>Marcos</b> para os estudantes do IFPB Campus Picuí
      </div>
      <Divider orientation="vertical" height="2vh" />
      <div className={styles.formText}>
        Problemas, sugestões, elogios? Acesse o formulário no QRCode ao lado
      </div>
      <div className={styles.formQRCode}>
        <img src="/img/qr-code.png" alt="QRCode" />
      </div>
    </footer>
  )
}
