import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const ProtectInterviewRoute = ({ children }) => {
    const interviewId = localStorage.getItem("InterviewId");
    const [isValid, setIsValid] = useState(null); // null = loading, true/false = result
    const { id } = useParams()
    
    localStorage.setItem("InterviewId",id)
    
    useEffect(() => {
        async function ValidateFun() {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/interviews/${interviewId}/validate`
                );
                setIsValid(res.status === 200);
            } catch (err) {
                console.log(err, "Error at protectedInterview Route");
                setIsValid(false);
            }
        }

        if (interviewId) {
            ValidateFun();
        } else {
            setIsValid(false);
        }
    }, [interviewId]);

    // Show loading until validation finishes
    if (isValid === null) {
        return <div>Loading interview validation...</div>;
    }

    // Redirect if invalid
    if (!isValid) {
        return <Navigate to="/dashboard" />;
    }

    // Render children if valid
    return children;
};

export default ProtectInterviewRoute;
