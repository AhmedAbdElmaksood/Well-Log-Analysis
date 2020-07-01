import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateSwEquationService {

  waterSaturationDataPoints: any[] = []
  constructor() { }
  //Water Saturation
  getWaterSaturationEquation(effectivePorosityDataPoints, a: number, m: number, rw: number, n: number, Lid: any[]) {


    let maxLength = Math.max(effectivePorosityDataPoints.length, Lid.length);
    let correctedLidLog = [], correctedEffectiveLog = [];
    for (let i = 0, effectiveCounter = 0, lidCounter = 0; i < maxLength && (effectiveCounter < effectivePorosityDataPoints.length && lidCounter < Lid.length); i++) {

      if (effectivePorosityDataPoints[effectiveCounter].y === Lid[lidCounter].y)//comparing by depth values (y)
      {

        correctedEffectiveLog.push(effectivePorosityDataPoints[effectiveCounter]);
        correctedLidLog.push(Lid[lidCounter]);
        this.waterSaturationDataPoints.push({
          x: (((a * rw) / ((effectivePorosityDataPoints[effectiveCounter].x * m) * Lid[lidCounter].x)) * (1 / n)) * 100,
          y: effectivePorosityDataPoints[effectiveCounter].y
        });
        effectiveCounter++, lidCounter++;
      }
      else if (effectivePorosityDataPoints[effectiveCounter].y < Lid[lidCounter].y) {
        effectiveCounter++;//skip it

      }
      else if (Lid[lidCounter].y < effectivePorosityDataPoints[effectiveCounter].y) {
        lidCounter++;//skip it

      }
    }
    return this.waterSaturationDataPoints;
  }
}
