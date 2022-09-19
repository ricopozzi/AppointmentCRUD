import { Controller, Post } from "@overnightjs/core";
import { OK } from "http-status-codes";
import { UserService } from "../services/UserService";
import { UserProps } from "../types/User";
import { Request, Response } from "express";


@Controller('user')
export class UserController {
    private userService = new UserService()

    @Post('create')
    async create(req: Request, res: Response) {
        const {email, password, name}: any = req.body
        
        const createUser = await this.userService.createUser({
            email,
            password,
            name
        })

        return res.json({message: createUser})
    }

}