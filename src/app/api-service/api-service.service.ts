import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl
  private getHeaders() :  HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders().set('Authrization',`${token}`)
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${usertoken}`
      //   });
      // return headers;
    };
  constructor(private http:HttpClient) {}
  
  getUserDataProfile():Observable<any>{
    return this.http.get(`${this.apiUrl}\profile`,{headers:this.getHeaders()})
  }
  updateProfile(data : any):Observable<any>{
    return this.http.put(`${this.apiUrl}\profile`,data,{headers:this.getHeaders()})
  }
  getUserDonation():Observable<any>{
    return this.http.get(`${this.apiUrl}\donation`,{headers:this.getHeaders()})
  }
}
