import "./Game.css"
import "./GameResponsivo.css"
import { useState, useRef } from "react"

const Game = ({verifyLatter, pickedCategory, pickedWord, letters, guessedLetters, wrongLetters, guesses, score}) => {

  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    verifyLatter(letter)
    setLetter("")
    letterInputRef.current.focus()
  }
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">Dica sobre a palavra: <span>{pickedCategory}</span></h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>OBS: O SISTEMA DIFERE LETRAS COM ACENTOS DE LETRAS NORMAIS</p>
        <p>EX: <span>A</span> e <span>Ã</span> SÃO CONSIDERADAS LETRAS DIFERENTES</p>
        <p>Tente adivinhar uma letra da palavra: </p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength={1} required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letras já utilizadas: </p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game