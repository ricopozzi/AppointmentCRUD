import { AppointmentModel } from "../models/Appointment"
import { AppointmentProps } from "../types/Appointment"

interface UpdateAppointment {
    id:string
    toUpdate: AppointmentProps
}

export class AppointmentService  {
    async retrieveAll(): Promise<AppointmentProps[]> { 
        const result: AppointmentProps[] = await AppointmentModel.find()
        return result
    }

    async addPost({title, description}:AppointmentProps): Promise<AppointmentProps>{
        const appointment = new AppointmentModel({
            title,
            description
        })

        const create: any = await appointment.save()

        return create
    }

    async updateSpecific({id, toUpdate} : UpdateAppointment): Promise<AppointmentProps> {

        const update:any = await AppointmentModel.findOneAndUpdate({id}, toUpdate)

        console.log(update)

        return update
    }

    async deleteAppointment(id:string): Promise<any | Error> {

        const deleted = await AppointmentModel.deleteOne({id})

        if( deleted.deletedCount === 0) {
            return { message: "This Appointment does not exists" }
        } else {
            return deleted
        }
        
    }
}