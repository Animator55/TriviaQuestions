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
export const categories: categoryType[] = [
    { name: "All Categories", icon: faQuestion, index: undefined, color: "#A8A8A8" },
    { name: "General Knowledge", icon: faBook, index: 9, color: "#F4D160" },
    { name: "Entertainment: Books", icon: faBook, index: 10, color: "#D2A679" },
    { name: "Entertainment: Film", icon: faFilm, index: 11, color: "#F4A698" },
    { name: "Entertainment: Music", icon: faMusic, index: 12, color: "#A8D8EA" },
    { name: "Entertainment: Musicals & Theatres", icon: faTheaterMasks, index: 13, color: "#D8BFD8" },
    { name: "Entertainment: Television", icon: faTv, index: 14, color: "#B0E57C" },
    { name: "Entertainment: Video Games", icon: faGamepad, index: 15, color: "#F7A8B8" },
    { name: "Entertainment: Board Games", icon: faChess, index: 16, color: "#D8CFAF" },
    { name: "Science & Nature", icon: faFlask, index: 17, color: "#B5EAD7" },
    { name: "Science: Computers", icon: faLaptopCode, index: 18, color: "#A1C6EA" },
    { name: "Science: Mathematics", icon: faAtom, index: 19, color: "#F7C5CC" },
    { name: "Mythology", icon: faLandmark, index: 20, color: "#E6C0E9" },
    { name: "Sports", icon: faBasketballBall, index: 21, color: "#F9C784" },
    { name: "Geography", icon: faGlobe, index: 22, color: "#B0D9B1" },
    { name: "History", icon: faLandmark, index: 23, color: "#D6B39A" },
    { name: "Politics", icon: faGlobe, index: 24, color: "#9FC5E8" },
    { name: "Art", icon: faPalette, index: 25, color: "#FFDAC1" },
    { name: "Celebrities", icon: faHeartPulse, index: 26, color: "#EEC1C1" },
    { name: "Animals", icon: faPaw, index: 27, color: "#C3E5AE" },
    { name: "Vehicles", icon: faCar, index: 28, color: "#C5CBE3" },
    { name: "Entertainment: Comics", icon: faBook, index: 29, color: "#E8A9A9" },
    { name: "Science: Gadgets", icon: faMicrochip, index: 30, color: "#AEC6CF" },
    { name: "Entertainment: Japanese Anime & Manga", icon: faBook, index: 31, color: "#F3B0C3" },
    { name: "Entertainment: Cartoon & Animations", icon: faFilm, index: 32, color: "#F7C5A8" }
];


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
        <div className="diff-selector">
            {diffs.map(el => {
                return <button
                    key={Math.random()}
                    onClick={() => { setDiff(el) }}
                    className={difficulty === el ? "pressed" : ""}
                >
                    {el}
                </button>
            })}
        </div>
        <div className="carrousel">
            <button className="carrousel_button" onClick={() => { changeCat(-1) }}>
                <FontAwesomeIcon icon={faCaretLeft} />
            </button>
            <article onClick={() => { changeCat(1) }} className="carrousel_display" style={{backgroundColor: category.color}}>
                <FontAwesomeIcon icon={category.icon} />
                <p>{category.name}</p>
            </article>
            <button onClick={() => { changeCat(1) }}>
                <FontAwesomeIcon icon={faCaretRight} />
            </button>
        </div>

        <button className="start-trivia" onClick={() => { start() }}>
            Start Trivia
        </button>
    </>
}