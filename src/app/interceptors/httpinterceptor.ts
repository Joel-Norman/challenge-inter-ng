import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor
{
    /**
     * Constructor
     */
    constructor(
       private tokenService:TokenService)
    {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let IntReq=req;
        let token= this.tokenService.getToken();
        if(token!=null){
            IntReq=req.clone({headers:req.headers.set('Authorization',token)});
        }
        
        return next.handle(IntReq);
    }
}