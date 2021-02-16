import { Injectable, Injector } from "@angular/core";
import {
    HttpInterceptor,
    HttpHeaders,
    HttpHandler,
    HttpEvent,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse
} from "@angular/common/http";
import { AuthService } from "./service.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private router: Router) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let authService = this.injector.get(AuthService);
        const authData = authService.getToken();
        // console.log('Here in TokenInterceptor tryuinh authdata');
        let requestItem = request;
        if (authData) {
            // console.log('Here in TokenInterceptor',authData);
            requestItem = request.clone({
                headers: request.headers.set("Authorization", "Bearer " + authData)
            });
        }
        return next.handle(requestItem).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        //letting it pass
                    }
                },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            authService.deleteToken();
                            // this.toastr.error("Please login again.", "Session ended");
                            //if not in register or forgot password
                            // this.router.navigate(["/login"]);
                        }
                    }
                }
            )
        );
    }
}
