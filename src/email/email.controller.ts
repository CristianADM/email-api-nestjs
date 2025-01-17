import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }
  
  @Get("/correo-con-mas-envios")
  consultarCorreosConMasEnvios() {
    return this.emailService.consultarCorreosConMasEnvios();
  }
  
  @Get("/cantidad-correos-dia/:fecha")
  consultarCorreosPorDia(@Param('fecha') fecha: Date) {
    return this.emailService.consultarCorreosPorDia(fecha);
  }
  
  @Get("/placas-mas-correos")
  consultarPlacasConMasCorreos() {
    return this.emailService.consultarPlacasConMasCorreos();
  }
}
