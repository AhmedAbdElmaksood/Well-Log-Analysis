import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
private _contactUrl = "https://well-log-api.herokuapp.com/"

  constructor(private _httpClient : HttpClient) { }

  submitMessage(message){
  return  this._httpClient.post<any>(this._contactUrl,message);
  }
}
