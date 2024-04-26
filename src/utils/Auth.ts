import bcrypt from 'bcrypt';


export const encryptPassword = async (plainPassword: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
};

export const comparePassword = async(plainPassword:string, hashedPassword:string)=>{
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}