import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true  , enum: ['admin','editor','user'],default:'user' },
}, { timestamps: true });
export default mongoose.models.User || mongoose.model('User', UserSchema);