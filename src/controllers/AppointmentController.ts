import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete, Patch } from '@overnightjs/core';
import { Request, Response } from 'express';
import Logger from 'jet-logger';
import { AppointmentModel } from '../models/Appointment';
import { AppointmentService } from '../services/AppointmentService';
import { AppointmentProps } from '../types/Appointment';

interface ToUpdateAppointment extends AppointmentProps {
    id: string;
    toUpdate: AppointmentProps;
}

@Controller('api/')
export class AppointmentController {
    private appointmentService = new AppointmentService()

    @Get('')
    private async getAll(req: Request, res: Response) {
        const result = await this.appointmentService.retrieveAll()

        return res.status(OK).json(result);
    }

    @Post('')
    private async add(req: Request, res: Response) {
        const { title, description } = req.body

        const created = await this.appointmentService.addPost({
            title,
            description
        })

        return res.status(OK).json(created);
    }

    @Patch('update/:id')
     async update(req: Request, res: Response) {
        const payload: ToUpdateAppointment = req.body

        const update = await this.appointmentService.updateSpecific({
            id: payload.id,
            toUpdate: payload.toUpdate
        })

        return res.send(update);
    }

    @Delete('delete/:id')
    private async delete(req: Request, res: Response) {
        const { id }: AppointmentProps = req.params

        const deleteOne = await this.appointmentService.deleteAppointment(id)

        return res.status(OK).json(deleteOne);
    }
}