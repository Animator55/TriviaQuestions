import axios from "axios"
import { questionType } from "../vite-env"


export const getQuestions = async (cat: number | undefined, diff: string)=>{
    let params = {
        amount: 10,
        category: cat,
        difficulty: diff, 
        type: "multiple",
    }
    
    return await axios.get("https://opentdb.com/api.php", {params}).then((res):questionType[]=>{
        return res.data.results
    }).catch((err)=>{
        alert(err)
    })
}