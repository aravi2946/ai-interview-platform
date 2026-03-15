import ConfigureInterview from "./ConfigureInterview";



const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="">
           
            <ConfigureInterview/>



        </div>

    )
}

export default Dashboard
