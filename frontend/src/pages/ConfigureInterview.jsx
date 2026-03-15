import { useState } from "react";
import axios from 'axios'
const roles = [
    "Frontend Developer", "Backend Developer", "Fullstack Developer",
    "DevOps Engineer", "Data Scientist", "ML Engineer",
    "Product Manager", "UI/UX Designer",
];

const experienceLevels = [
    "0–1 years (Fresher)", "1–3 years (Junior)", "3–5 years (Mid-level)",
    "5–8 years (Senior)", "8+ years (Staff/Principal)",
];

const interviewTypes = [
    "Technical Screening", "DSA / Problem Solving", "System Design",
    "Behavioral / HR", "Frontend Specific", "Backend Specific", "Full Stack Round",
];

function SelectField({ label, value, onChange, options, placeholder }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-200 tracking-wide">
                {label}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full appearance-none bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 cursor-pointer ${value ? "text-slate-100" : "text-slate-400"}`}
                >
                    <option value="" disabled className="text-slate-400">{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt} className="text-slate-100 bg-slate-800">{opt}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function ConfigureInterview() {
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [interviewType, setInterviewType] = useState("");
    const [submitted, setSubmitted] = useState(null);

    const isValid = role && experience && interviewType;

    const handleBegin = async () => {
        const localData = localStorage.getItem("user")
        const obj = JSON.parse(localData)
        if (!isValid) return;
        setSubmitted({ role, experience, interviewType });
       
        
        try {
            let res = await axios.post('http://localhost:3000/interviews/setup', {id:obj.id, role, experience, interviewType })
          
            console.log(res.data.msg);
            
            
        } catch (err) {
            console.log("Error at handleBegin");
            
        }
        
        setShowModal(false);
        setRole(""); setExperience(""); setInterviewType("");
    };

    const handleClose = () => {
        setShowModal(false);
        setRole(""); setExperience(""); setInterviewType("");
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center  p-4">

            {/* Trigger Button */}
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/30 text-sm sm:text-base"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Start New Interview
            </button>

            {/* Result card after submit */}
            {submitted && (
                <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-5 w-full max-w-sm text-sm text-slate-300 space-y-2">
                    <p className="text-cyan-400 font-semibold text-base mb-3">Session Configured</p>
                    <p><span className="text-slate-400">Role:</span> {submitted.role}</p>
                    <p><span className="text-slate-400">Experience:</span> {submitted.experience}</p>
                    <p><span className="text-slate-400">Type:</span> {submitted.interviewType}</p>
                    <button
                        onClick={() => setSubmitted(null)}
                        className="mt-3 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Modal Overlay */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={(e) => e.target === e.currentTarget && handleClose()}
                >
                    {/* Modal Card */}
                    <div className="w-full max-w-md bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl relative animate-modal">

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-700 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-6">
                            Configure Interview
                        </h2>

                        {/* Fields */}
                        <div className="flex flex-col gap-5">
                            <SelectField
                                label="Target Role"
                                value={role}
                                onChange={setRole}
                                options={roles}
                                placeholder="Select a role"
                            />
                            <SelectField
                                label="Experience Level"
                                value={experience}
                                onChange={setExperience}
                                options={experienceLevels}
                                placeholder="Years of experience"
                            />
                            <SelectField
                                label="Interview Type"
                                value={interviewType}
                                onChange={setInterviewType}
                                options={interviewTypes}
                                placeholder="Focus area"
                            />
                        </div>

                        {/* Begin Button */}
                        <button
                            onClick={handleBegin}
                            disabled={!isValid}
                            className={`mt-6 w-full py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 ${isValid
                                    ? "bg-cyan-500 hover:bg-cyan-400 text-slate-900 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-cyan-500/20"
                                    : "bg-cyan-900/40 text-cyan-500/40 cursor-not-allowed"
                                }`}
                        >
                            Begin Session
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        .animate-modal {
          animation: modalIn 0.2s ease-out;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
        </div>
    );
}