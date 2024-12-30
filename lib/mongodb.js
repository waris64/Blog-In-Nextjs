import mongoose from 'mongoose'
const connectMongo = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGO_URI)
console.log('Mongo connect successfully')
    } catch (error) {
        console.log('Connection Error', error)
    }
}
export default connectMongo;