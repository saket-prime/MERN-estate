import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        
        const connect = await mongoose.connect(process.env.MONGO);
        console.log(
            'Database connected:',
            connect.connection.host,
            connect.model.name
        );
    } catch (err) {
        console.log('not established');
        process.exit(1);
    }
};

export default dbConnect;