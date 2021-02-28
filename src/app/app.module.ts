import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
import {FormsModule} from '@angular/forms';
import { LoginTestComponent } from './components/login-test/login-test.component';
import { Routes, RouterModule} from '@angular/router';
import { InterceptorService } from './services/interceptor.service';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
    {path: "login", component: AuthComponentComponent},
    {path: "logout", component: LogoutComponent},
    {path: "login-test", component: LoginTestComponent},
    {path: "", redirectTo: "login", pathMatch: 'full'}];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponentComponent,
    LoginTestComponent,
    LogoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }