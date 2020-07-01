import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VshEquationsService {
  private LinearResponse: any[];

  constructor() { }

  getGrPoints(depthLog: number[], grLog: number[]){
    let grDataPoints = [];
    for (let i = 0; i < depthLog.length; i++) {
      if (grLog[i] > -999) {
        grDataPoints.push({
          x: grLog[i],
          y: depthLog[i],
        });
      }
    }
    return grDataPoints;
  }

  getLinearResponsePoints(depthLog: number[], grLog: number[], minGr:number, maxGr:number){
    let LinearResponseDataPoints = [];
    for (let i = 0; i < depthLog.length; i++) {
      if (grLog[i] > -999) {
        LinearResponseDataPoints.push({
          x: ((grLog[i] - minGr) / (maxGr - minGr)) * 100,
          y: depthLog[i],
        });
      }
    }
    this.LinearResponse = LinearResponseDataPoints;
    return LinearResponseDataPoints;
  }

  getLarionovPoints(depthLog: number[], grLog: number[], minGr:number, maxGr:number){
    let LarionovDataPoints = [];
    if(!this.LinearResponse){
      this.getLinearResponsePoints(depthLog, grLog, minGr, maxGr);
    }
    let counter = 0;
    for (let i = 0; i < depthLog.length; i++) {
      if (grLog[i] > -999) {
        LarionovDataPoints.push({
          x: (0.083 * ((2 ** (3.7 * (this.LinearResponse[counter++].x)/100) ) - 1)) * 100,
          y: depthLog[i],
        });
      }
    }
    return LarionovDataPoints;
  }

  getSteiberPoints(depthLog: number[], grLog: number[], minGr:number, maxGr:number){
    let SteiberDataPoints = [];
    if(!this.LinearResponse){
      this.getLinearResponsePoints(depthLog, grLog, minGr, maxGr);
    }
    let counter = 0;
    for (let i = 0; i < depthLog.length; i++) {
      if (grLog[i] > -999) {
        SteiberDataPoints.push({
          x: ( ( (this.LinearResponse[counter].x) / 100) / (3 - (2 * ((this.LinearResponse[counter++].x) / 100) )) ) * 100,
          y: depthLog[i],
        });
      }
    }
    return SteiberDataPoints;
  }

  getOlderPoints(depthLog: number[], grLog: number[], minGr:number, maxGr:number){
    let OlderDataPoints = [];
    if(!this.LinearResponse){
      this.getLinearResponsePoints(depthLog, grLog, minGr, maxGr);
    }
    let counter = 0;
    for (let i = 0; i < depthLog.length; i++) {
      if (grLog[i] > -999) {
        OlderDataPoints.push({
          x:  ( 0.33 * ((2 ** ( 2 * ((this.LinearResponse[counter++].x) / 100)) ) - 1)) * 100,
          y: depthLog[i],
        });
      }
    }
    return OlderDataPoints;
  }

  getClavierPoints(depthLog: number[], grLog: number[], minGr:number, maxGr:number){
    let ClavierDataPoints = [];
    if(!this.LinearResponse){
      this.getLinearResponsePoints(depthLog, grLog, minGr, maxGr);
    }
    let counter = 0;
    for (let i = 0; i < depthLog.length; i++) {
      if (grLog[i] > -999) {
        ClavierDataPoints.push({
          x: (1.7 - ((3.38 - ((((this.LinearResponse[counter++].x) / 100) + 0.7)**2) ) ** (1/2)) ) * 100,
          y: depthLog[i],
        });
      }
    }
    return ClavierDataPoints;
  }

}

