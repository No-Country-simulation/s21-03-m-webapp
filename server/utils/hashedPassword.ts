import bcrypt from "bcrypt"

export const hashPassword=async(password:string)=>{
    const salt=10
    const hashedPassword= await bcrypt.hash(password,salt)
    return hashedPassword
}


export const comparePassword=async(password:string,currentPassword:string)=>{
    
    return await bcrypt.compare(password,currentPassword)
}