import mongoose, { Schema } from "mongoose";

const ProfileSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
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

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
