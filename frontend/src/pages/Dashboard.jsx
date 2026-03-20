import { useContext } from "react";
import ConfigureInterview from "./ConfigureInterview";
import { AiContext } from "../Context/AI-Context";



const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const {} = useContext(AiContext)
    return (
        <div className="">
            
            <ConfigureInterview/>



        </div>

    )
}

export default Dashboard
