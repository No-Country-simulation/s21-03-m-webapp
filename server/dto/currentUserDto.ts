import { Types } from "mongoose";
import { IMember } from "../models/Member";
import { IProfile } from "../models/Profile";

class MemberDTO {
    _id: Types.ObjectId;
    name: string;
    email: string;
    ownerId: Types.ObjectId;
    profile: IProfile;

    constructor(member: IMember, profile: IProfile) {
        this._id = member.id;  // Corregido: member.id → member._id
        this.name = member.name;
        this.email = member.email;
        this.ownerId = member.ownerId;
        this.profile = profile;  // Corregido: Se pasa profile directamente
    }
}

export default MemberDTO;