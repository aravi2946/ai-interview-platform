import Interview from "../models/Interview.js";


const InterviewSessionController = async (req, res) => {
    const { id, role, experience, interviewType } = req.body;

    try {

        const Data = {
            userId: id,
            role,
            experience,
            interviewType
        }

        const interview = await Interview.create(Data)
        res.status(200).json({
            msg: "Interview Session Created Successfully",
            InterviewId: interview._id
        })

    } catch (err) {
        console.log("Error", err);
        res.status(500).json({ msg: "Internal Server Error" })

    }
}

const validateController = async (req, res) => {
    if (String(req.params.id).length != 24)
        return res.status(404).json({ msg: "Not found" })

    try {
        const interview = await Interview.findById(req.params.id)

        if (!interview) {

            return res.status(404).json({ msg: "Not found" })
        }
        res.status(200).json({ valid: true })
    } catch (err) {
        console.log(err, "Error at validate Controller");

    }
}

const endInterviewController = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const obj = Object.assign({}, data)
    

    try {
        if (!id)
            return res.status(204).json({ msg: "Id undefined" })
        const interview = await Interview.findByIdAndUpdate(id,
            { $push: { messages: obj } },
            { returnDocument: 'after' }
        )
        if (interview)
            return res.status(200).json({ msg: "Success" })
        return res.status(404).json({ msg: "error at endInterviewController" })



    } catch (err) {
        console.log("Error at endInterviewController", err);
        res.status(500).json({ msg: "Internal server error" })
    }
}
export { InterviewSessionController, validateController, endInterviewController }