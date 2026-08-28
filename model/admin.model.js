const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required:true,
        select: false,
    },

},{timestamps:true})


AdminSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
})

AdminSchema.methods.passwordValid = async function(password){
    return await bcrypt.compare(password ,this.password);
   
}
const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = AdminModel