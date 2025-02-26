import React from "react"
import { getQuestions } from "../logic/api"
import { categoryType, questionType } from "../vite-env"
import cleanText from "../logic/cleanText"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

type Props = {
    difficulty: string
    category: categoryType
    backToMenu: Function
}

export default function TriviaGame({difficulty, category, backToMenu}: Props) {
    const [trivia, setTrivia] = React.useState<undefined | questionType[]>(undefined)
    const [result, setResult] = React.useState<boolean[]>([])
    const [index, setIndex] = React.useState(0)
    const [timestamp, setTimestamp] = React.useState<number | undefined>(undefined)

    const getTrivia = async () => {
        let result = await getQuestions(category.index, difficulty)
        if (result) {
            let date = new Date().getTime()
            setTimestamp(date)
            setTrivia(result)
        }
    }

    React.useEffect(() => {
        if (!trivia) getTrivia()
    }, [])

    let answered = false  
    const answerCurrentIndex = (val: boolean, i: number) => {
        if (result[index] !== undefined || answered) return

        let button = document.getElementById("option-button_"+i)
        if(button) {
            button.style.background = val ? "#09c721" : "#ff4f4f"
            button.classList.add("pressed")
        }
        let bar = document.querySelector(".progress-bar") as HTMLDivElement
        if(bar) bar.style.width = (index*10+10)+"%"

        answered = true
        setTimeout(() => {
            setResult([...result, val])
            setIndex(index + 1)
        }, 1000)
    }

    const Options = ({ options, correct }: { options: string[], correct: string }) => {
        let sorted = options.sort(() => Math.random() - 0.5)

        const checkAnswer = (val: string) => val === correct

        return <ul className="options-list">
            {sorted.map((el,i) => {
                return <button
                    id={"option-button_"+i}
                    className="option-button"
                    key={Math.random()}
                    onClick={() => { answerCurrentIndex(checkAnswer(el), i) }}
                >
                    {cleanText(el)}
                </button>
            })}
        </ul>
    }

    const count = ()=>{
        let resultNumber = 0
        for(let i=0; i<result.length; i++){
            if(result[i])resultNumber++
        }
        return resultNumber
    }
    function formatTime(ms:number) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;
    
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(3, '0');
    
        return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    }
    const resultTime = ()=>{
        if(!timestamp) return
        let currentTime =new Date().getTime()
        let timeDif = currentTime -timestamp

        return formatTime(timeDif)
    }

    return <>
        {trivia ? trivia[index] ? <section className="trivia-game">
            <header>
                <div className="progress-container">
                    <div className="progress-bar" style={{width: index*10+"%"}}></div>
                </div>
                <div className="header-content">
                    <nav className="header-nav">
                        <p>
                            {trivia[index].difficulty}
                        </p>
                        <p>{cleanText(trivia[index].category)}</p>
                        <button onClick={()=>{backToMenu()}}>
                            <FontAwesomeIcon icon={faRightFromBracket}/>
                        </button>
                    </nav>
                    <h3 key={Math.random()} className="show-texting">{cleanText(trivia[index].question)}</h3>
                </div>
            </header>
            <Options
                options={[...trivia[index].incorrect_answers, trivia[index].correct_answer]}
                correct={trivia[index].correct_answer}
            />
        </section>
        :
            <section className="finish">
                <h2>You Finished!</h2>
                <p>Results: {count()} / 10</p>
                <p>
                    In {resultTime()}
                </p>
                <button className="start-trivia" onClick={()=>{backToMenu()}}>
                    Return to Menu
                </button>
            </section>
            :
            <section className="loading">
                <FontAwesomeIcon icon={faCircleNotch} spin/>
            </section>
        }
    </>
}