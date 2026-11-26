// shipping.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ShippingService {
  private readonly zoneFees: Record<string, number> = {
    bangkok: 0,
    north: 10,
    south: 25,
  };

  calculate(weight: number, zone: string) {
    const zoneFee = this.zoneFees[zone];
    if (zoneFee === undefined) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'zone ไม่ถูกต้อง',
      });
    }

    const extraKg = Math.ceil(Math.max(weight - 1, 0));
    const baseFee = 50 + 18 * extraKg;

    return { weight, zone, baseFee, zoneFee, total: baseFee + zoneFee };
  }
}
