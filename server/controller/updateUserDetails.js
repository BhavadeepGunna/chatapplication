const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModel")

async function updateUserDetails(request,response){
    try {
        //const token = request.cookies.token || ""
        const token=request.headers.authorization

        const user = await getUserDetailsFromToken(token)

        const { name, profile_pic } = request.body

        const updateUser = await UserModel.updateOne({ _id : user._id },{
            name,
            profile_pic
        })

        const userInfomation = await UserModel.findById(user._id)

        return response.json({
            message : "user update successfully",
            data : updateUser,
            success : true
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error || "user not updated",
            error : true
        })
    }
}

module.exports = updateUserDetails