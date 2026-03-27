import { X, Menu } from "lucide-react"
import { useState } from "react"

const LandingPage = () => {
    const [showMenu, setShowMenu] = useState(true)
    return (
        <div className="min-h-screen bg-slate-50">


            {/* Navbar  */}
            <div className="bg-white w-full border-b border-gray-200 sticky top-0 z-50">
                <div className="flex justify-between items-center max-w-7xl px-6 py-4 mx-auto">

                    <div className="flex justify-between items-center gap-8 ">

                        <h1 className="text-2xl text-[#1A237E] font-bold font-mono">HIRE.AI</h1>
                        <ul className="flex gap-5 text-gray-600 text-sm font-medium font-sans max-md:hidden">
                            <li className="border-b-2 border-blue-900 pb-1 text-blue-900 ">Features</li>
                            <li>How It Works</li>
                            <li>Pricing</li>
                            <li>Success Stories</li>
                        </ul>

                    </div>
                    <div className="flex gap-5 items-center">
                        <div>
                            <button className="max-md:hidden cursor-pointer text-gray-600 font-medium ">Log In</button>
                        </div>
                        <div className="flex gap-3 items-center">
                            <button className="py-2 px-5 bg-[#001452] rounded-lg text-white font-semibold text-[16px] cursor-pointer"
                            >Get Started</button>

                            <span className={`hidden max-md:flex cursor-pointer`} onClick={() => setShowMenu(!showMenu)}>{showMenu ? <Menu /> : <X />}</span>

                        </div>
                    </div>
                </div>




            </div>

            {/*Navbar in mobile Screen */}

            {!showMenu ? <div className={!showMenu?"md:hidden bg-white w-full transition-all duration-300 overflow-hidden ease-in-out max-h-96 opacity-100":"opacity-0 max-h-0 transition-all overflow-hidden"}>
                <ul className="pt-7 pb-3">
                    <div className="cursor-pointer flex flex-col gap-4 text-gray-600 text-sm font-medium font-sans px-4">
                        <li className="text-blue-900">Features</li>
                        <li>How it works</li>
                        <li>Pricing</li>
                        <li>Success Stories</li>

                    </div>
                </ul>

                <div className="border-b-2 border-gray-200 pb-2"></div>

                <div className="px-4 py-2  cursor-pointer rounded-2xl ">

                    <button className="font-medium text-[16px] cursor-pointer font-sans text-gray-600 ">Log In</button>
                </div>


            </div> : <></>}

            {/* Hero Section  */}
            <section>
                <div>
                    <h1>Master Your Next Interview With AI-Powered Intelligence</h1>
                    <p>Practice with an Executive Coach that adapts to your role, experience, and industry. Get real-time feedback and start landing your dream job today.</p>
                    <div>
                        <button>Get Started Free</button>
                        <button>Watch How It Works</button>
                    </div>
                </div>
                <div>
                    {/* Image */}
                </div>


            </section>

            {/* Bottom section */}
            <section>
                <h1>Interview Intelligence Built for Winners</h1>
                <p>Beyond just questions. We provide the analytical depth required to refine your presence and authority.</p>
            </section>

            {/* Bottom Cards */}
            <section>
                <div>
                    <div>
                        image
                    </div>
                    <div>
                        <h3>AI-Powered Feedback</h3>
                        <p>Get instant scores and qualitative critiques on your communication, depth, and correctness.</p>
                    </div>
                </div>
                <div>
                    <div>
                        image
                    </div>
                    <div>
                        <h3>Role-Specific Questions</h3>
                        <p>Our AI generates questions tailored to Junior, Mid, or Senior levels across Technical, Behavioral, and HR tracks.</p>
                    </div>
                </div>
                <div>
                    <div>
                        image
                    </div>
                    <div>
                        <h3>Session Recovery</h3>
                        <p>Never lose progress. Our platform automatically saves your session so you can pick up exactly where you left off.</p>
                    </div>
                </div>
                <div>
                    <div>
                        image
                    </div>
                    <div>
                        <h3>Progress Tracking</h3>
                        <p>Visualize your improvement with detailed analytics and score trends over time.

                        </p>
                    </div>
                </div>
            </section>



            {/* Full Screen footer Section */}
            <div>
                <p>Start Your Journey</p>
                <h3>Your Dream Role is Only a Few Practice Sessions Away</h3>
                <div>
                    <button>Create Free Account</button>
                    <button>View All Features</button>
                </div>
            </div>

            {/* Footer */}
            <footer>
                <div>
                    <h2>HIRE.AI</h2>
                    <p>© 2026 HIRE.AI All rights reserved.</p>
                </div>

                <ul>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>Contact Us</li>
                    <li>FAQ</li>

                </ul>

            </footer>

        </div>
    )
}

export default LandingPage
