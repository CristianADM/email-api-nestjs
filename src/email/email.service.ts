import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Email } from './entities/email.entity';
import { Model } from 'mongoose';

@Injectable()
export class EmailService {

  constructor(
    @InjectModel(Email.name) private emailModel: Model<Email>
  ) { }

  async create(createEmailDto: CreateEmailDto) {

    console.log("Correo enviado con exito!");
    console.log(createEmailDto);

    // const emailCreado = new this.emailModel(createEmailDto);
    // emailCreado.save();

    await this.emailModel.create(createEmailDto);

    return {
      message: "Correo enviado con exito",
      email: createEmailDto
    };
  }
  
  consultarCorreosConMasEnvios() {
    return this.emailModel.aggregate([
      {
          $group: {
              _id: '$email',
              count: { $sum: 1 }
          }
      },
      {
          $sort: { count: -1 }
      },
      {
          $limit: 10
      }
    ]);
  }
  
  consultarPlacasConMasCorreos() {
    const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const finMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

    return this.emailModel.aggregate([
      {
        $match: {
          fechaCreacion: {
            $gte: inicioMes,
            $lt: finMes
          }
        }
      },
      {
        $group: {
          _id: '$placa',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);
  }
  
  consultarCorreosPorDia(fecha: Date) {
    const startDate = new Date(fecha);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);  // Fin del día

    return this.emailModel.aggregate([
      {
        $match: {
          fechaCreacion: {
            $gte: startDate,
            $lt: endDate
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$fechaCreacion" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
  }
}
