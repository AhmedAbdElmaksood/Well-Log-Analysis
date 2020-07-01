import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PorosityEquationsService {


  neutronPorosityDataPoints: any[] = [];
  densityPorosityDataPoints: any[] = [];
  totalPorosityDataPoints: any[] = [];
  effectivePorosityDataPoints: any[] = [];
  waterSaturationDataPoints:any[] = [];

  constructor() { }

  getNeutronLogEquation(depthLog: number[], neutronLog: number[], neutronCorrection: number) {
    if (this.neutronPorosityDataPoints.length == 0) {
      for (let i = 0; i < depthLog.length; i++) {
        if (neutronLog[i] > -900)//filter null values
        {
          this.neutronPorosityDataPoints.push({
            x: neutronLog[i] + neutronCorrection,
            y: depthLog[i]
          })
        }
      }
    }
    return this.neutronPorosityDataPoints;
  }

  getDensityPorosityEquation(depthLog: number[], densityLog: number[], matrixDensity: number, fluidDensity: number) {
    if (this.densityPorosityDataPoints.length == 0) {
      for (let i = 0; i < depthLog.length; i++) {
        if (densityLog[i] > -900) {
          this.densityPorosityDataPoints.push({
            x: ((matrixDensity - densityLog[i]) / (matrixDensity - fluidDensity)) * 100,
            y: depthLog[i]
          })
        }
      }
    }
    return this.densityPorosityDataPoints;
  }

  getTotalPorosityEquation(depthLog: number[], neutronCorrection: number, densityLog: number[], matrixDensity: number, fluidDensity: number, neutronLog: number[]) {
    if (this.totalPorosityDataPoints.length == 0) {
      if (this.densityPorosityDataPoints.length == 0)
        this.densityPorosityDataPoints = this.getDensityPorosityEquation(depthLog, densityLog, matrixDensity, fluidDensity);

      if (this.neutronPorosityDataPoints.length == 0)
        this.neutronPorosityDataPoints = this.getNeutronLogEquation(depthLog, neutronLog, neutronCorrection);

      let maxLength = Math.max(this.densityPorosityDataPoints.length, this.neutronPorosityDataPoints.length);

      for (let i = 0, densityCounter = 0, neutronCounter = 0; i < maxLength && (neutronCounter < this.neutronPorosityDataPoints.length && densityCounter < this.densityPorosityDataPoints.length); i++) {
        if (this.neutronPorosityDataPoints[neutronCounter].y === this.densityPorosityDataPoints[densityCounter].y)//comparing by depth values (y)
        {
          this.totalPorosityDataPoints.push({
            x: ((((this.neutronPorosityDataPoints[neutronCounter].x ** 2) + (this.densityPorosityDataPoints[densityCounter].x ** 2)) / 2) ** (1 / 2)),
            y: this.neutronPorosityDataPoints[neutronCounter].y
          });
          neutronCounter++, densityCounter++;
        }
        else if (this.neutronPorosityDataPoints[neutronCounter].y < this.densityPorosityDataPoints[densityCounter].y) {
          neutronCounter++;//skip it
        }
        else if (this.densityPorosityDataPoints[densityCounter].y < this.neutronPorosityDataPoints[neutronCounter].y) {
          densityCounter++;//skip it
        }
      }
    }
    return this.totalPorosityDataPoints;
  }

  getEffectivePorosityEquation(depthLog: number[], neutronCorrection: number, densityLog: number[], matrixDensity: number, fluidDensity: number, neutronLog: number[], vshLog: any[], bulkDensity: number) {
      this.effectivePorosityDataPoints = []
      if (this.totalPorosityDataPoints.length == 0)
        this.totalPorosityDataPoints = this.getTotalPorosityEquation(depthLog, neutronCorrection, densityLog, matrixDensity, fluidDensity, neutronLog);
      let maxLength = Math.max(this.totalPorosityDataPoints.length, vshLog.length);
      let shaleDensityPorosity = (2.4 - bulkDensity) / (2.4 - 1.1);

      for (let i = 0, totalPorosityCounter = 0, vshCounter = 0; i < maxLength && (totalPorosityCounter < this.totalPorosityDataPoints.length && vshCounter < vshLog.length); i++) {
        if (this.totalPorosityDataPoints[totalPorosityCounter].y === vshLog[vshCounter].y)//comparing by depth values (y)
        {
          this.effectivePorosityDataPoints.push({
            x: (this.totalPorosityDataPoints[totalPorosityCounter].x - (vshLog[vshCounter].x * shaleDensityPorosity)),
            y: this.totalPorosityDataPoints[totalPorosityCounter].y
          });
          totalPorosityCounter++, vshCounter++;
        }
        else if (this.totalPorosityDataPoints[totalPorosityCounter].y < vshLog[vshCounter].y) {
          totalPorosityCounter++;//skip it
        }
        else if (vshLog[vshCounter].y < this.totalPorosityDataPoints[totalPorosityCounter].y) {
          vshCounter++;//skip it
        }
      }
    return this.effectivePorosityDataPoints;
  }
 
  //Water Saturation
  getWaterSaturationEquation(depthLog: number[], neutronCorrection: number, densityLog: number[], matrixDensity: number, fluidDensity: number, neutronLog: number[], vshLog: any[], bulkDensity: number,a:number,m:number,rw:number,n:number,Lid:any[]) {
    this.waterSaturationDataPoints = [];
    if (this.effectivePorosityDataPoints.length==0)
      this.effectivePorosityDataPoints = this.getEffectivePorosityEquation(depthLog, neutronCorrection, densityLog, matrixDensity, fluidDensity, neutronLog,vshLog,bulkDensity);
    let maxLength = Math.max(this.effectivePorosityDataPoints.length, Lid.length);
    for (let i = 0, effectiveCounter = 0, lidCounter = 0; i < maxLength && (effectiveCounter < this.effectivePorosityDataPoints.length && lidCounter < Lid.length); i++) {
      if (this.effectivePorosityDataPoints[effectiveCounter].y === Lid[lidCounter].y)//comparing by depth values (y)
      {
        this.waterSaturationDataPoints.push({
          x: (((a * rw) / ((this.effectivePorosityDataPoints[effectiveCounter].x  * m) * Lid[lidCounter].x) ) * (1/n)) * 1000000,
          y: this.effectivePorosityDataPoints[effectiveCounter].y
        });
        effectiveCounter++, lidCounter++;
      }
      else if (this.effectivePorosityDataPoints[effectiveCounter].y < Lid[lidCounter].y) {
        effectiveCounter++;//skip it
      }
      else if (Lid[lidCounter].y < this.effectivePorosityDataPoints[effectiveCounter].y) {
        lidCounter++;//skip it
      }
    }
  return this.waterSaturationDataPoints;
}



}


