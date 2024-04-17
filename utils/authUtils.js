import bcrypt from "bcrypt";

const saltRounds= 10;
const hashPasswords = async(painPasswrod)=>{
    const hash= await bcrypt.hash(painPasswrod, saltRounds);
    return hash;
}
const comparePassword = async(plainPassword, hashedPasswords)=>{
    const passwordCompareResult= bcrypt.compare(plainPassword, hashedPasswords);
    return passwordCompareResult;
}

export {hashPasswords, comparePassword};