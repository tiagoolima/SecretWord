import "./HomePage.css"
import Gif from "../assets/donaldPensando.gif"

const HomePage = ({startGame}) => {
  return (
    <div>
        <h1 className="titulo">Secret Word</h1>
        <img src={Gif} className="gif" alt="Pato Donald pensando" />
        <p className="instrucao">Clique no botão abaixo para iniciar o jogo</p>
        <button onClick={startGame}>Iniciar o Jogo</button>
    </div>
  )
}

export default HomePage