import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/Rx';
import { Constant } from '../constant/Contant';

@Injectable({ providedIn: 'root'})
export class GraphService{
  
    private phpServicePoint;
    constructor(private http:Http){
        this.phpServicePoint = Constant.phpServiceURL;
    }
    
    public getAllListBySelectType(jsonData: any, selectType : string) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType='+selectType,jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public gererateGraph(jsonData : any){
        return this.http.post(this.phpServicePoint+'generateGraph_test.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // public getAllListBySelectType(jsonData: any, selectType : string) : Observable<any> {
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     return this.http.post(this.phpServicePoint+'getAllList.php?selectType='+selectType,jsonData, {headers:headers})
    //     .pipe(  
    //         catchError(this.handleError)  
    //       );

    // }

    // public gererateGraph(jsonData : any) : Observable<any>{
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     return this.http.post<any>(this.phpServicePoint+'generateGraph_test.php',jsonData, {headers : headers})
    //     .pipe(  
    //         catchError(this.handleError)  
    //       );  
    // }

    // private handleError(err) {  
    //     let errorMessage: string;  
    //     if (err.error instanceof ErrorEvent) {  
    //       errorMessage = `An error occurred: ${err.error.message}`;  
    //     } else {  
    //       errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    //     }  
    //     console.error(err);  
    //     return throwError(errorMessage);  
    // } 
}