// fine.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { FineService } from './fine.service.js';

@Controller('fine')
export class FineController {
  constructor(private readonly fineService: FineService) {}

  @Get()
  calculate(@Query('days') days?: string, @Query('type') type?: string) {
    const d = Number(days);
    if (days === undefined || days === '' || !Number.isInteger(d) || d < 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'days ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป',
      });
    }
    if (!type) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'type ไม่ถูกต้อง',
      });
    }
    return this.fineService.calculate(d, type);
  }
}