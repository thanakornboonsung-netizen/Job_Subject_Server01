// electricity.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ElectricityService {
  private readonly serviceCharges: Record<string, number> = {
    residential: 40,
    business: 90,
  };

  calculate(units: number, type: string) {
    if (!Object.prototype.hasOwnProperty.call(this.serviceCharges, type)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'type ไม่ถูกต้อง',
      });
    }

    const energyCharge = Math.min(units, 150) * 3 + Math.max(units - 150, 0) * 4;
    const serviceCharge = this.serviceCharges[type];

    return {
      units,
      type,
      energyCharge,
      serviceCharge,
      total: energyCharge + serviceCharge,
    };
  }
}