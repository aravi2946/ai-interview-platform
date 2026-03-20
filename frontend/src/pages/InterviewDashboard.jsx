import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { AiContext } from "../Context/AI-Context";
const BotIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <line x1="12" y1="7" x2="12" y2="11" />
        <circle cx="8.5" cy="16" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
);

const UserIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

const FeedbackIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
        hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
    });



const renderContent = (text) =>
    text.split(/(`[^`]+`)/g).map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`")) {
            return (
                <code
                    key={i}
                    style={{ fontFamily: "monospace" }}
                    className="bg-cyan-400/10 text-cyan-400 px-1.5 py-0.5 rounded text-[0.8em]"
                >
                    {part.slice(1, -1)}
                </code>
            );
        }
        return part.split("\n").map((line, j, arr) => (
            <span key={`${i}-${j}`}>
                {line}
                {j < arr.length - 1 && <br />}
            </span>
        ));
    });

export default function InterviewDashboard() {
    // const { details } = useContext(AiContext)
    const [details, setDetails] = useState(() => {
        return JSON.parse(localStorage.getItem("Candidate")) || null
    })
    const navigate = useNavigate()
   
    
    const [messages, setMessages] = useState([
        {

            role: "assistant",
            content:
                `Hello! I'm your AI interviewer for the ${details?.role} position ${details?.experience}. This will be a ${details?.interviewType} interview. Are you ready to begin?`,

            time: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [sessionTime] = useState(new Date());
    const bottomRef = useRef(null);
    const textareaRef = useRef(null);

    //interviewId
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            console.log("Stored in localstorage");
            localStorage.setItem("InterviewId", id)
        }

    }, [id])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Interview"));
        const cand = JSON.parse(localStorage.getItem("Candidate"));
        console.log("data", data);
        console.log("cand", cand);
        
        
        if(data)
            setMessages(data)
        else
            setMessages([{

                role: "assistant",
                content:
                    `Hello! I'm your AI interviewer for the ${details?.role} position ${details?.experience}. This will be a ${details?.interviewType} interview. Are you ready to begin?`,

                time: new Date(),
            },])
            
        if (cand)
            setDetails(cand)


        
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        localStorage.setItem("Interview", JSON.stringify(messages))


    }, [messages]);

    const handleEndBtn = async () => {
        const data = JSON.parse(localStorage.getItem("Interview"))
        if(data)
        console.log(data);

        try {
            const ans = window.confirm("Do you want to end this interview")
            if (!ans) return;
            console.log(data);

            const res = await axios.post(`http://localhost:3000/api/interviews/${id}/end`, {data:data})
          
            if (res.status == 200) {
                localStorage.removeItem("Candidate")
                localStorage.removeItem("Interview")
                localStorage.removeItem("InterviewId")
                alert(res.data.msg)
                navigate('/dashboard')
                
            }


        } catch (err) {
            console.log(err);

        }

    }

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        const userData = {
            role: "user",
            content: trimmed,
            time: new Date()
        }
        const updated = [...messages]
        updated.push(userData)

        setMessages((prev) => [
            ...prev,
            { role: "user", content: trimmed, time: new Date() },
        ]);

        setInput("");
        try {

            const res = await axios.post(`http://localhost:3000/api/interviews/session`,
                { history: [...updated], details: details })

            const result = {
                role: "assistant",
                content: res.data.message,
                time: new Date()
            }

            setMessages((prev) => [...prev, result])

        } catch (err) {
            console.log("Frontend", err);

        }
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = (e) => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
    };

    return (
        <div
            className="flex flex-col h-screen overflow-hidden text-slate-200"
            style={{ backgroundColor: "#0d1117", fontFamily: "sans-serif" }}
        >
            {/* ── HEADER ── */}
            <header
                className="flex items-center justify-between px-6 py-4 shrink-0 gap-3 border-b"
                style={{ backgroundColor: "#0d1117", borderColor: "rgba(255,255,255,0.07)" }}
            >
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" style={{ boxShadow: "0 0 8px #34d399" }} />
                        <h1 className="text-base font-bold text-slate-100 tracking-tight whitespace-nowrap">
                            {details?.role} Interview
                        </h1>
                    </div>
                    <p className="text-xs text-slate-500 pl-4.5" style={{ fontFamily: "monospace", letterSpacing: "0.04em" }}>
                        {details?.interviewType}&nbsp;•&nbsp;{details?.experience.split(" ")[2]}
                    </p>
                </div>

                <button onClick={handleEndBtn}
                    className="flex items-center gap-2 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg text-xs font-semibold shrink-0 cursor-pointer"
                >


                    <FeedbackIcon />
                    <span className="hidden sm:inline">End &amp; Get Feedback</span>

                </button>
            </header>

            {/* ── MESSAGES ── */}
            <div className="flex-1 overflow-y-auto py-7">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-5">

                    {/* session stamp */}
                    <div className="flex justify-center mb-1">
                        <span
                            className="text-xs text-slate-500 rounded-full px-4 py-1 border"
                            style={{
                                fontFamily: "monospace",
                                letterSpacing: "0.05em",
                                fontSize: "0.67rem",
                                backgroundColor: "rgba(255,255,255,0.03)",
                                borderColor: "rgba(255,255,255,0.07)",
                            }}
                        >
                            Session Started&nbsp;•&nbsp;{formatTime(sessionTime)}
                        </span>
                    </div>

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            {/* avatar */}
                            <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${msg.role === "user"
                                    ? "text-slate-400"
                                    : "text-emerald-400"
                                    }`}
                                style={{
                                    backgroundColor:
                                        msg.role === "user"
                                            ? "rgba(100,116,139,0.15)"
                                            : "rgba(52,211,153,0.1)",
                                    borderColor:
                                        msg.role === "user"
                                            ? "rgba(100,116,139,0.25)"
                                            : "rgba(52,211,153,0.2)",
                                }}
                            >
                                {msg.role === "user" ? <UserIcon /> : <BotIcon />}
                            </div>

                            {/* bubble */}
                            <div
                                className={`px-4 py-3.5 text-sm leading-relaxed ${msg.role === "user"
                                    ? "text-white rounded-2xl rounded-tr-sm"
                                    : "text-slate-300 rounded-2xl rounded-tl-sm border"
                                    }`}
                                style={{
                                    maxWidth: "min(560px, 80%)",
                                    backgroundColor:
                                        msg.role === "user" ? "#0ea5e9" : "#161d27",
                                    borderColor:
                                        msg.role === "user" ? "transparent" : "rgba(255,255,255,0.08)",
                                    lineHeight: "1.65",
                                }}
                            >
                                {renderContent(msg.content)}
                            </div>
                        </div>
                    ))}

                    <div ref={bottomRef} />
                </div>
            </div>

            {/* ── INPUT AREA ── */}
            <div
                className="shrink-0 px-4 sm:px-6 pt-4 pb-3 border-t"
                style={{ backgroundColor: "#0d1117", borderColor: "rgba(255,255,255,0.07)" }}
            >
                <div className="max-w-3xl mx-auto flex flex-col gap-2">
                    <div
                        className="flex items-end gap-3 rounded-xl px-4 py-3 border transition-colors duration-200 focus-within:border-sky-500/50"
                        style={{
                            backgroundColor: "#161d27",
                            borderColor: "rgba(255,255,255,0.1)",
                        }}
                    >
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={input}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your answer here..."
                            className="flex-1 bg-transparent border-none outline-none text-slate-200 text-sm leading-relaxed resize-none overflow-y-auto placeholder-slate-600"
                            style={{
                                minHeight: "22px",
                                maxHeight: "120px",
                                fontFamily: "sans-serif",
                            }}
                        />
                        <button
                            onClick={handleSend}
                            className="w-9 h-9 rounded-lg bg-sky-500 hover:bg-sky-400 active:scale-95 text-white flex items-center justify-center shrink-0 transition-all duration-150 cursor-pointer"
                        >
                            <SendIcon />
                        </button>
                    </div>
                    <p
                        className="text-center text-slate-600"
                        style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.04em" }}
                    >
                        Press Enter to send, Shift+Enter for new line
                    </p>
                </div>
            </div>

            {/* watermark */}
            <div className="fixed bottom-3.5 right-5 flex items-center gap-1.5 pointer-events-none select-none">
                <div className="grid grid-cols-2 gap-0.5 opacity-20">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-slate-500 rounded-sm" />
                    ))}
                </div>

            </div>
        </div>
    );
}

