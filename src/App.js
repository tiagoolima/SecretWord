// CSS
import "./App.css";

// React
import {useCallback, useEffect, useState} from "react"

// Data
import {wordsList} from "./data/words";

// Components
import HomePage from "./components/HomePage";
import Game from "./components/Game"
import GameOver from "./components/GameOver"

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

const guessesQty = 5

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const PickCategoriesAndWord = useCallback(() => {
    //Selecionar categoria aleatoriamente
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //Selecionar palavra aleatoriamente
    const word = words[category][Math.floor(Math.random()) * words[category].length]

    return {word, category}
  }, [words])
 
  // Iniciando o Jogo
  const startGame = useCallback(() => {
    clearLetterStage()
    const {word, category} = PickCategoriesAndWord()

      // Criando um array de letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

     //Setando os estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [PickCategoriesAndWord])

  // Verificação de palavras
  const verifyLatter = (letter) => {
    const normalizeLetter = letter.toLowerCase()

    // Verificando se a letra já foi utilizada
    if(guessedLetters.includes(normalizeLetter) || wrongLetters.includes(normalizeLetter)) {
      return
    }
    
    // Incluindo as letras
    if(letters.includes(normalizeLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizeLetter
      ])
    } else {
      setWrongLetters((actualWrongLeterrs) => [
        ...actualWrongLeterrs, normalizeLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStage = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(guesses <= 0) {
      clearLetterStage()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  // Checando condições
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      setScore((actualScore) => actualScore +=100)
  
      startGame()
    }
  }, [guessedLetters, letters, startGame, gameStage])



  // Reiniciar o Jogo
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <HomePage startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLatter={verifyLatter} pickedCategory={pickedCategory} pickedWord={pickedWord} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
