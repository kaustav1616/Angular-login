import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
import { LoginTestComponent } from './components/login-test/login-test.component';

const routes: Routes = [{path: "",redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: AuthComponentComponent, outlet: "outlet1"},
    {path: "login-test", component: LoginTestComponent, outlet: "outlet1"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
