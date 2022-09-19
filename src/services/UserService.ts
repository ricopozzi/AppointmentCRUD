import { UserProps } from "../types/User";
import * as bcrypt from "bcrypt"
import { UserModel } from "../models/User";


export class UserService {

    async createUser({email, password = '', name} : UserProps): Promise<string | any> {

        const userAlreadyExists = await UserModel.findOne({
            email
        })

        if(userAlreadyExists){
            return "User already exists!"
        }

        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(password, salt)

        const user = new UserModel({
            email,
            name,
            password: hasPassword
        })

        await user.save()
           
        return "user created successfully"

        }
}