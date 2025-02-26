import React from "react"
import TriviaGame from "./components/TriviaGame"
import Menu from "./components/Menu"
import { categoryType } from "./vite-env"
import { faQuestion } from "@fortawesome/free-solid-svg-icons"

import "./App.css"

export default function App() {
  const [page, setPage] = React.useState("menu")
  const [difficulty, setDiff] = React.useState("easy")
  const [category, setCat] = React.useState<categoryType>(
    { name: "All Categories", icon: faQuestion, index: undefined, color: "#A8A8A8"},
  )

  return <main>
    {page === "menu" ?
      <Menu
        start={() => { setPage("game") }}
        difficulty={difficulty}
        setDiff={setDiff}
        category={category}
        setCat={setCat}
      />
      :
      <TriviaGame 
        difficulty={difficulty}
        category={category}
        backToMenu={()=>{setPage("menu")}}
      />
    }
  </main>
}