// electricity.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ElectricityService } from './electricity.service.js';

@Controller('electricity')
export class ElectricityController {
  constructor(private readonly electricityService: ElectricityService) {}

  @Get()
  calculate(@Query('units') units?: string, @Query('type') type?: string) {
    const u = Number(units);
    if (units === undefined || units === '' || !Number.isInteger(u) || u < 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'units ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป',
      });
    }
    if (!type) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'type ไม่ถูกต้อง',
      });
    }
    return this.electricityService.calculate(u, type);
  }
}
