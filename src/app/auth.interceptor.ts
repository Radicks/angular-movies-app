import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, from, Observable, switchMap, take } from "rxjs";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly pathsWithoutToken = ['login', 'register', 'refreshtoken'];
    private isRefreshing: boolean = false;
    private tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService, private router: Router) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return from(this.handle(req, next));
    }

    private async handle(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.pathsWithoutToken.some(path => request.url.includes(path))) {
            if (!this.isRefreshing) {
                this.isRefreshing = true;
                this.tokenSubject.next(null);
    
                try {
                    const token = await this.authService.getAccessToken();
                    if (token) {
                        request = request.clone({
                            setHeaders: { 'access-token': token }
                        });
    
                        this.tokenSubject.next(token);
                    }
                }
                catch(error) {
                    console.log(error);
                    this.authService.logOut().subscribe();
                    this.router.navigate(['/login']);
                }
                this.isRefreshing = false;
            }
            else {
                return this.tokenSubject.pipe(
                    filter(token => token != null),
                    take(1),
                    switchMap(jwt => {
                        request = request.clone({
                            setHeaders: { 'access-token': jwt }
                        });
                        return next.handle(request);
                })).toPromise();
            }
        }
    
        return next.handle(request).toPromise();
    }   
}