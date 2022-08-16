import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError, Observable, retry, throwError } from "rxjs";
import { IProduct } from "../models/product";
import { ErrorService } from "./error.service";
@Injectable({
  providedIn: 'root'
})

export class ProductService{
  constructor(private http: HttpClient, private errorService: ErrorService){

  }

  getAll():Observable<IProduct[]>{
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products1',{
      params: {
        limit: 5
      }
    }).pipe(
      retry(2),
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error:HttpErrorResponse){
    this.errorService.handle(error.message)
    return throwError(()=> error.message)
  }
}
