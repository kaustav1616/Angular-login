import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

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

    constructor(private authService: AuthServiceService, private router: Router)
    {
        this.userName = "";
        this.password = "";
        this.errorMessage = "";
    }

    ngOnInit(): void 
    {
        // localStorage.setItem("id_token", "");
    }

    onSubmit()
    {
        if(localStorage.getItem("id_token"))
        {
            this.errorMessage = "Already logged in!";
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