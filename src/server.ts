import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import Logger from 'jet-logger';
import { AppointmentController } from './controllers/AppointmentController';
import { connect } from "./utils/mongoconnect"
import { UserController } from './controllers/UserController';

export class SampleServer extends Server {
    
    constructor() {
        super(process.env.NODE_ENV === 'development'); // setting showLogs to true
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }

    private setupControllers(): void {
        const appointmentController = new AppointmentController();
        const userController = new UserController()
        super.addControllers(
            [appointmentController, userController],
            
        );
        connect()
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.imp('Server listening on port: ' + port);
        })
    }
}