import Groq from "groq-sdk"
import { ENV } from "../lib/env.js"

const client = new Groq({
    apiKey: ENV.AIAPIKEY
})

const AiController = async (req, res) => {
    const { history, details } = req.body;


    const cleanMessages = history.map(m => ({
        role: m.role,
        content: m.content
    }))




    let role = details.role
    let experience = details.experience
    let interviewType = details.interviewType

    const systemPrompt = {
        role: "system",
        content: `You are an expert technical interviewer conducting a highly realistic interview.
    
    Candidate Profile:
    - Role: ${role}
    - Experience Level: ${experience}        
    - Interview Type: ${interviewType}      
    
    Interview Strategy by Experience:
    - Junior: Focus on fundamentals, basic concepts. Ask follow-up questions to check their understanding of "how".
    - Mid: Focus on problem-solving, real-world edge cases. Ask follow-up questions about the "why" and trade-offs.
    - Senior: Focus on architecture, scalability, system design. Challenge their decisions and ask about alternatives.
    
    STRICT BEHAVIORAL RULES:
    1. Act like a real human interviewer. Do NOT ask a rigid list of unrelated questions.
    2. Deep Dive: Start with a broad topic. Based on their answer, ask 1-2 probing follow-up questions to test the depth of their knowledge (e.g., "Why did you choose that?", "What if the data volume increases by 10x?", "How would you handle this edge case?").
    3. Ask exactly ONE question at a time. Do not overwhelm the candidate.
    4. Keep the conversation natural. Acknowledge their previous answer before asking the next question.
    5.If user don't know the answer then provide the answer and ask next question
    
    RESPONSE FORMAT:
    After each answer you must provide your response in EXACTLY this format:
    
    SCORE: X/10
    FEEDBACK: [Brief note on what was good, what was missing, or what was inaccurate]
    NEXT QUESTION: [Your conversational response acknowledging their previous answer, followed by your next probing question or new topic]
    
    PROGRESSION:
    - Ask exactly 5 questions total (including follow-ups).
    - After the 5th answer, do not ask another question. Instead, provide a final interview report summarizing their strengths, weaknesses, and an OVERALL SCORE.`
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
