import mongoose from 'mongoose';
import userModel from './models/modelUsers.js';
import bcrypt from 'bcrypt';



mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://Sharvelion:nauj7895214@clusterdepruebajts.ysnbgix.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Conectado a base de datos mongo atlas usuarios.'))
    .catch(e => console.log(e));

const createHash = async password => {
    const salts = await bcrypt.genSalt(8);
    return bcrypt.hash(password, salts);
} 


class Users { 
    async createUser(user) {
        const { email, password } = user;
        const dataHashed = await createHash(password);
        const createData = await userModel.create({ email, password: dataHashed })
            .then(data => data)
            .catch(e => {
                return ({ Error: e })
            });
        return createData;
    }
    
    async readUser(user) {
        const readData = await userModel.findOne({email: user['email']})
            .then(data => data)
            .catch(e => {
                return ({ Error: e })
            });
        return readData;
    }
}

export default Users;