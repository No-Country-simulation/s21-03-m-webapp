import mongoose, { Schema, Types } from "mongoose";


export interface IProfile{
    ownerId:Types.ObjectId
    name:string
    address:string
    logo:string
    phone:string
    email:string
}


const ProfileSchema = new Schema({
    ownerId: {
        type: Types.ObjectId,
        ref: "Owner",
    },
    name: {
        type: String,
        default: '',
        trim: true,
    },
    address: {
        type: String,
        default: '',
        trim: true,
    },
    logo: {
        type: String,
        default: '',
        trim: true,
    },
    phone: {
        type: String,
        default: '',
        trim: true,
    },
    email: {
        type: String,
        default: '',
        trim: true,
    },
});

const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
export default Profile;
