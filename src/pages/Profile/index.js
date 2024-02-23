import './profile.css'
import Header from '../../components/Header/header'
import Title from '../../components/Title'
import avatar from '../../assets/avatar.png'

import { AuthContext } from '../../contexts/auth'
import { useContext, useState } from 'react'

import { FiSettings, FiUpload } from 'react-icons/fi'
import { toast } from 'react-toastify'

import { db, storage } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, downloadURL } from 'firebase/storage'

export default function Profile() {
  const { user, setUser, storageUser, logout } = useContext(AuthContext)
  const [imageAvatar, setImageAvatar] = useState(null)
  const [nome, setNome] = useState(user && user.nome)
  const [email, setEmail] = useState(user && user.email)

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0]

      if (image.type === 'image/jpeg' || image.type === 'image.png') {
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      } else {
        toast.error('Envie um arquivo do tipo JPEG/PNG')
        setImageAvatar(null)
        return
      }
    }
  }

  //função para realizar o UPLOAD dos arquivos no storage (bando de dados)
  async function handleUpload() {
    const currentUid = user.uid

    //criando a refencia do nosso db passando os atribuitos e valores
    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

    //criando função que vai ser responsavel por fazer alteração no DB com os dados novos, como foto e nome...
    const uploadTask = uploadBytes(uploadRef, imageAvatar).then(snapshot => {
      //aqui fazemos atraves do GETDONWLOADURL o snapshot (monitoramento) das mudanças realizadas, ele vai ser responsavel por sobrescrever os dados atualizados....
      getDownloadURL(snapshot.ref).then(async downloadURL => {
        let urlFoto = downloadURL
        //aqui definimos uma const de refencia acessando db, nossa case, e nossos uid
        const docRef = doc(db, 'users', user.uid)
        //aqui passamos no update para atualizar no banco os parametros e valores
        await updateDoc(docRef, {
          avatarUrl: urlFoto,
          nome: nome
        }).then(() => {
          let data = {
            ...user,
            nome: nome,
            avatarUrl: urlFoto
          }
          setUser(data)
          storageUser(data)
          toast.success('Atualizado com sucesso')
        })
      })
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (imageAvatar === null && nome !== '') {
      const docRef = doc(db, 'users', user.uid)

      await updateDoc(docRef, {
        nome: nome
      }).then(() => {
        let data = {
          ...user,
          nome: nome
        }
        setUser(data)
        storageUser(data)
        toast.success('Nome alterado com sucesso')
      })
    } else if (nome !== '' && imageAvatar !== null) {
      handleUpload()
    }
  }

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Minha Conta">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              <br />
              {avatarUrl === null ? (
                <img
                  src={avatar}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />

            <label>Email</label>
            <input type="text" value={email} disabled={true} />
            <button type="submit"> Salvar</button>
          </form>
        </div>

        <div className="container">
          <button onClick={() => logout()} className="logout-btn">
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}
