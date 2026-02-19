import UserCard from './UserCard.jsx'
import Footer from './Footer.jsx'
import profilePic from './assets/profile_pic.jpg'
import genericPfp from './assets/generic_pfp.jpg'

const userData = [
  {
    id: 1,
    name: 'Francisco Saukas dos Reis',
    role: 'Desenvolvedor Full-Stack Jr. | Soluções Web | Inglês | ADS @UDESC',
    image: profilePic,
    bio: 'Algumas curiosidades sobre mim: já toquei flauta doce, contralto, alemã, baixo e transversal, além de cielo e viola. Futebol nunca deu certo pra mim, então ganhei algumas competições de natação quando menor. Pretendo ganhar corridas! Adoro calistenia e qualquer outra forma de exercício, e eu jogo vôlei e danço também. Sou ex-militar e estou a procura do meu primeiro emprego assalariado na área. Mais informações profissionais no meu LinkedIn.'
  },
  {
    id: 2,
    name: 'Fulano da Silva',
    role: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image: genericPfp,
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae dolorum ipsum animi dolores quod tenetur sequi esse, dicta fugit, voluptatibus voluptatem veritatis, nesciunt id excepturi neque perspiciatis. A, nobis quas.'

  },
  {
    id: 3,
    name: 'Ciclano da Costa',
    role: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image: genericPfp,
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae dolorum ipsum animi dolores quod tenetur sequi esse, dicta fugit, voluptatibus voluptatem veritatis, nesciunt id excepturi neque perspiciatis. A, nobis quas.'

  }
]

function App() {
  return(
    <div className='cards-container'>
      {userData.map((user) => (
      <UserCard 
        key={user.id}
        name={user.name}
        role={user.role}
        image={user.image}
        bio={user.bio}
      />
      ))}
      <Footer />
    </div>
    
  )
}

export default App
