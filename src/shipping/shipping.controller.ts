// shipping.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ShippingService } from './shipping.service.js';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  calculate(@Query('weight') weight?: string, @Query('zone') zone?: string) {
    const w = Number(weight);
    if (weight === undefined || weight === '' || isNaN(w) || w <= 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'value ต้องเป็นตัวเลขมากกว่า 0',
      });
    }
    if (!zone) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'zone ไม่ถูกต้อง',
      });
    }
    return this.shippingService.calculate(w, zone);
  }
}