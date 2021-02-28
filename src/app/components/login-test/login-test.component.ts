import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login-test',
  templateUrl: './login-test.component.html',
  styleUrls: ['./login-test.component.css']
})
export class LoginTestComponent implements OnInit 
{
  displayMessage: string;

  constructor(private authService: AuthServiceService) 
  {
    this.displayMessage = "";
  }

  ngOnInit(): void 
  {
    this.authService.loginTest().subscribe
    (
        data =>
        {
            console.log("Successful");
            this.displayMessage = data;
        },
        error=>
        {
            console.log("Unsuccessful");
            this.displayMessage = "Error!";
        }
    );
  }
}