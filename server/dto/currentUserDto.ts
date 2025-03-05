import { Types } from "mongoose";
import { IMember, UserRole } from "../models/Member";
import { IProfile } from "../models/Profile";

class MemberDTO {
    _id: Types.ObjectId;
    name: string;
    email: string;
    ownerId: Types.ObjectId;
    profile: IProfile;
    role:UserRole

    constructor(member: IMember, profile: IProfile) {
        this._id = member.id;  
        this.name = member.name;
        this.email = member.email;
        this.ownerId = member.ownerId;
        this.role=member.role
        this.profile = profile;  
    }
}

export default MemberDTO;