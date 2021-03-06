import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { stringify } from '@angular/compiler/src/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit 
{
    userName: string;
    password: string;
    errorMessage: string;

    constructor(private authService: AuthServiceService, 
        private router: Router)
    {
        this.userName = "";
        this.password = "";
        this.errorMessage = "";
    }

    ngOnInit(): void 
    {   
        let message = this.authService.getLoginErrorMessage();

        if(message) // set by angular interceptor due to token expiry (has been redirected from there)
        {
            this.errorMessage = message;
            this.authService.setLoginErrorMessage("");
        }
    }

    isLoggedIn(): boolean
    {
        const helper = new JwtHelperService();
        const token = localStorage.getItem("id_token");

        if(token == null) // user has logged out (and thus cleared token)
            return false;

        // returns false if jwt token is there in memory but expired (user did not logout but stayed idle for too long)
        return (!helper.isTokenExpired(token));
    }

    onSubmit()
    {
        if(this.isLoggedIn())
        {
            this.router.navigateByUrl("login-test");
            return;
        }

        this.authService.login(this.userName, this.password).subscribe
        (
            data =>
            {
                this.errorMessage = "";
                console.log(data.jwt);
                // localStorage.setItem("id_token", data.jwt);
                this.router.navigateByUrl("login-test");
            },
            error =>
            {
                this.errorMessage = "Invalid Credentials. Try again!!";
                console.log(error);
            }
        );
    }
}