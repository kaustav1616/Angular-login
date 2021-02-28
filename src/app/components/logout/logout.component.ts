import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onClickMe()
  {
    this.authService.logout().subscribe(data =>
        {
            console.log(data);
            this.router.navigateByUrl("login");
        });
  }

}