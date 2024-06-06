import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument } from "mongoose";

export type EmailDocument = HydratedDocument<Email>;

@Schema()
export class Email {

    @Prop()
    email: string;
    
    @Prop()
    placa: string;

    @Prop()
    mensaje: string;
    
    @Prop({name:"parqueadero_id"})
    parqueaderoId: number;
    
    @Prop({type: Date, default: Date.now})
    fechaCreacion: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
