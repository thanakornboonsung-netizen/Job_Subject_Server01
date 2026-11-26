// fine.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FineService {
  private readonly rates: Record<string, number> = {
    general: 5,
    reserve: 20,
    reference: 50,
  };

  calculate(days: number, type: string) {
    if (!Object.prototype.hasOwnProperty.call(this.rates, type)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'type ไม่ถูกต้อง',
      });
    }

    const rate = this.rates[type];
    const chargeableDays = Math.max(days - 3, 0);
    const total = Math.min(chargeableDays * rate, 500);

    return { days, type, chargeableDays, rate, total };
  }
}
