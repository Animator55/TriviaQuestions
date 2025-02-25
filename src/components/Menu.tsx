import {
    faQuestion, faBook, faFilm, faGamepad, faTv, faMusic, faTheaterMasks, faFlask,
    faGlobe, faPaw, faBasketballBall, faChess, faLaptopCode, faLandmark, faPalette, faAtom,
    faMicrochip, faHeartPulse, faCar,
    faCaretRight
} from "@fortawesome/free-solid-svg-icons";
import { categoryType } from "../vite-env";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";

type Props = {
    start: Function
    setDiff: Function
    setCat: Function
    difficulty: string
    category: categoryType
}

const categories: categoryType[] = [
    { name: "All Categories", icon: faQuestion, index: undefined },
    { name: "General Knowledge", icon: faBook, index: 9 },
    { name: "Entertainment: Books", icon: faBook, index: 10 },
    { name: "Entertainment: Film", icon: faFilm, index: 11 },
    { name: "Entertainment: Music", icon: faMusic, index: 12 },
    { name: "Entertainment: Musicals & Theatres", icon: faTheaterMasks, index: 13 },
    { name: "Entertainment: Television", icon: faTv, index: 14 },
    { name: "Entertainment: Video Games", icon: faGamepad, index: 15 },
    { name: "Entertainment: Board Games", icon: faChess, index: 16 },
    { name: "Science & Nature", icon: faFlask, index: 17 },
    { name: "Science: Computers", icon: faLaptopCode, index: 18 },
    { name: "Science: Mathematics", icon: faAtom, index: 19 },
    { name: "Mythology", icon: faLandmark, index: 20 },
    { name: "Sports", icon: faBasketballBall, index: 21 },
    { name: "Geography", icon: faGlobe, index: 22 },
    { name: "History", icon: faLandmark, index: 23 },
    { name: "Politics", icon: faGlobe, index: 24 },
    { name: "Art", icon: faPalette, index: 25 },
    { name: "Celebrities", icon: faHeartPulse, index: 26 },
    { name: "Animals", icon: faPaw, index: 27 },
    { name: "Vehicles", icon: faCar, index: 28 },
    { name: "Entertainment: Comics", icon: faBook, index: 29 },
    { name: "Science: Gadgets", icon: faMicrochip, index: 30 },
    { name: "Entertainment: Japanese Anime & Manga", icon: faBook, index: 31 },
    { name: "Entertainment: Cartoon & Animations", icon: faFilm, index: 32 }
]

const diffs = ["easy", "medium", "hard"]

export default function Menu({ start, difficulty, setDiff, category, setCat }: Props) {

    const changeCat = (add: number) => {
        let newIndex: number = -1
        let indexOfCurrent = categories.indexOf(category)
        if (category.index === undefined) newIndex = add < 0 ? (categories.length - 1) : add
        else newIndex = (indexOfCurrent + add) > categories.length - 1 ? 0 : (indexOfCurrent + add)

        setCat(categories[newIndex])
    }

    return <>
        <h1>Trivia Questions</h1>
        <div>
            {diffs.map(el => {
                return <button
                    key={Math.random()}
                    onClick={() => { setDiff(el) }}
                    style={{ background: difficulty === el ? "gray" : "" }}
                >
                    {el}
                </button>
            })}
        </div>
        <div>
            <button onClick={() => { changeCat(-1) }}>
                <FontAwesomeIcon icon={faCaretLeft} />
            </button>
            <article>
                <FontAwesomeIcon icon={category.icon} />
                <p>{category.name}</p>
            </article>
            <button onClick={() => { changeCat(1) }}>
                <FontAwesomeIcon icon={faCaretRight} />
            </button>
        </div>

        <button onClick={() => { start() }}>
            Start Trivia
        </button>
    </>
}