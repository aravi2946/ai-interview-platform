import Groq from "groq-sdk"
import { ENV } from "../lib/env.js"

const client = new Groq({
    apiKey: ENV.AIAPIKEY// ✅ safely loaded from .env
})

const AiController = async (req, res) => {
    const { history } = req.body;

    const cleanMessages = history.map(m => ({
        role: m.role,
        content:m.content
    }))
     
    let role = "frontend"
    let experience = "intern"
    let interviewType = "HR"

    const systemPrompt = {
        role: "system",
        content: `You are an expert technical interviewer.
    
    Candidate Profile:
    - Role: ${role}
    - Experience Level: ${experience}        
    - Interview Type: ${interviewType}      
    
    Adjust your questions based on experience:
    - Junior: fundamentals, basic concepts
    - Mid: problem solving, real scenarios  
    - Senior: architecture, tradeoffs, leadership
    
    STRICT RULES:
    - Ask exactly ONE question at a time
    - After each answer give:
      SCORE: X/10
      FEEDBACK: what was good, what was missing
      NEXT QUESTION: your next question
    - Ask exactly 5 questions total
    - After 5th answer give final report with overall score`
    }
    const messages = cleanMessages.length == 0 ?
        [
            systemPrompt,
            {
                role: "assistant",
                content: `Welcome [Candidate Name]!  
You are interviewing for the role of ${role}.
Type "OK" and let’s start this.`
            }

        ] : [systemPrompt, ...cleanMessages]
    try {
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages
        })

        const aiMessage = response.choices[0].message.content
        res.json({ message: aiMessage }) // ✅ only return the text
        console.log("AI Message", aiMessage);

    } catch (err) {
        console.error("Backend", err)
        res.status(500).json({ message: "Error at AI Controller" })
    }
}

export default AiController
