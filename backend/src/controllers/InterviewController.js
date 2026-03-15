import Interview from "../models/Interview.js";


const InterviewSessionController = async (req, res) => {
    const { id, role, experience, interviewType } = req.body;
    console.log(role, experience, interviewType);

    try {

        const Data = {
            userId: id,
            role,
            experience,
            interviewType
        }

        await Interview.create(Data)
        res.status(200).json({
            msg: "Interview Session Created Successfully"
        })

    } catch (err) {
        console.log("Error", err);
        res.status(500).json({ msg: "Internal Server Error" })

    }
}

export { InterviewSessionController }