import { useEffect } from "react";
import { createContext, useState } from "react";


export const AiContext = createContext(null)

const AIContextProvider = ({ children }) => {
    //storing interview id from InterviewDashboard
    const [interviewId, setInterviewId] = useState("")
    const [details, setDetails] = useState({
        role: '',
        experience: '',
        interviewType:''
    })
    
    useEffect(() => {
        let cand = JSON.parse(localStorage.getItem("Candidate"))
        
        if(cand)
        setDetails({ ...details, role: cand.role, experience: cand.experience, interviewType: cand.interviewType })


    },[])
    let data = {
       details,
        interviewId,
        setInterviewId
    }
 
    
    return (
        <AiContext.Provider value={data}>{children}</AiContext.Provider>
    )
}
export default AIContextProvider