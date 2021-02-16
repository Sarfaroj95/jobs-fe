import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    // private baseUrl = "http://localhost:3002";
    private baseUrl = "https://jobsekhar.herokuapp.com";

    private registerUrl = this.baseUrl + "/api/v4/user/register";
    private loginUrl = this.baseUrl + "/api/v4/user/adminlog";
    private regUrl = this.baseUrl + "/api/v4/user/adminzone";


    // application Apis
    private applicationUrl = this.baseUrl + "/api/v4/user/application";
    private application2Url = this.baseUrl + "/api/v4/user/application2";
    private applicationgetUrl = this.baseUrl + "/api/v4/user/applist";


    private usertypeUrl = this.baseUrl + "/api/v4/user/type/";


    private userUrl = this.baseUrl + "/api/v4/user/user/";
    private careerUrl = this.baseUrl + "/api/v4/user/career";

    // admin Api
    private adminuserUrl = this.baseUrl + "/api/v4/user/userlist";
    private useractiveUrl = this.baseUrl + "/api/v4/user/active/";
    private userinactiveUrl = this.baseUrl + "/api/v4/user/inactive/";

    // reqruter Api
    private searchUrl = this.baseUrl + "/api/v4/user/fatch/";
    private detailsUrl = this.baseUrl + "/api/v4/user/appdetail/";







    constructor(private http: HttpClient) { }




    public login(userData: any): Observable<any> {
        return this.http.post(this.loginUrl, userData);
    }

    public Reg(userData: any): Observable<any> {
        return this.http.post(this.regUrl, userData);
    }

    // Application
    public applied(data: any): Observable<any> {
        return this.http.post(this.applicationUrl, data);
    }

    public appliedUpdate(id, data: any): Observable<any> {
        return this.http.post(this.applicationUrl + "/" + id, data);
    }
    public lastUpdate(id, data: any): Observable<any> {
        return this.http.post(this.application2Url + "/" + id, data);
    }
    getApllication(): Observable<any> {
        return this.http.get(this.applicationgetUrl);
    }

    // Reqruter 
    Search(data: any, location: any): Observable<any> {
        return this.http.get(this.searchUrl + data + "/" + location)
    }

    Details(data: any): Observable<any> {
        return this.http.get(this.detailsUrl + data)
    }



    public register(userData: any): Observable<any> {
        return this.http.post(this.registerUrl, userData);
    }

    userType(id: any): Observable<any> {
        return this.http.get(this.usertypeUrl + id)
    }

    //Admin section
    GetadminUser(): Observable<any> {
        return this.http.get<any>(this.adminuserUrl)
    }

    ActiveUser(id: any): Observable<any> {
        return this.http.get<any>(this.useractiveUrl + id)
    }

    InactiveUser(id: any): Observable<any> {
        return this.http.get<any>(this.userinactiveUrl + id)
    }

    public getUser(id: any): Observable<any> {
        console.log(this.userUrl + id)
        return this.http.get(this.userUrl + id);

    }

    public career(data: any): Observable<any> {
        return this.http.post(this.careerUrl, data);
    }

    getId() {
        return localStorage.getItem("id");
    }
    getToken() {
        return localStorage.getItem("token");
    }
    getUsertype() {
        return localStorage.getItem("user");
    }
    isLoggedIn() {
        return this.getToken() !== null;
    }
    deleteToken() {
        return localStorage.removeItem("token");
    }

    LogOut() {

        let keysToRemove = ["token", "id", "user"];
        for (let key of keysToRemove) {
            localStorage.removeItem(key);
        }

    }
}
