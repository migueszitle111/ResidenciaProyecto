import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name:        { type: String, required: true },
  lastname:    { 
    type: String,
    required: function() { return this.provider === "credentials"; }
  },
  cedula:      { 
    type: String,
    required: function() { return this.provider === "credentials"; }
  },
  especialidad:{
    type: String,
    required: function() { return this.provider === "credentials"; }
  },
  email:       { type: String, required: true, unique: true },
  password:    { type: String },  // ya no es required
  roles:       { type: String, enum: ["user","admin"], default: "user" },
  imageUrl:    { type: String },
  provider:    { type: String, enum: ["credentials","google"], default: "credentials" },
  subscriptionActive: { type: Boolean, default: false },
}, {
  timestamps: true
});

const User = models.User || model("User", userSchema);
export default User;
