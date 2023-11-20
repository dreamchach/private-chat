import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    userToken : {
        type : String,
        require : true
    },
    messages : [{
        from : {
            type : String,
            require : true
        },
        message : {
            type : String,
            require : true
        },
        time : {
            type : String,
            require : true
        },
        to : {
            type : String,
            require : true
        }
    }]
})

export default mongoose.models.Message || mongoose.model('Message', messageSchema)
