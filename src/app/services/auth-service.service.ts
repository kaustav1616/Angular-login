import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import * as moment from "moment";
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService 
{
	private serverAuthURL = "http://localhost:8080/authenticate";
	authRequest: any;

	constructor(private http: HttpClient) { }

	login(userName: string, password: string)
	{
		this.authRequest = {
			"userName": userName,
			"password": password
		};

		return this.http.post<User>(this.serverAuthURL, this.authRequest)
		.pipe(tap(res => this.setSession(res)),
			shareReplay());
	}

    logout()
    {
        return this.http.get("http://localhost:8080" + "/logout_handle", {responseType: 'text'})
            .pipe(tap(res => this.resetSession()));
    }

    resetSession()
    {
        localStorage.setItem('id_token', "");
    }

	setSession(jwtToken: any)
	{
        const expiresAt = moment().add(jwtToken.expiresIn,'second');

        localStorage.setItem('id_token', jwtToken.jwt);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    } 

	loginTest()
	{
		return this.http.get("http://localhost:8080" + "/login_test", {responseType: 'text'});
	}
}