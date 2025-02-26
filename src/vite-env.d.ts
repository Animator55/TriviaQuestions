/// <reference types="vite/client" />

import { IconDefinition } from "@fortawesome/free-solid-svg-icons"


export type questionType = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type categoryType = { name: string, icon: IconDefinition, index: undefined | number, color: string }