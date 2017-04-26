import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Headers, Response } from "@angular/http";
import { ActivatedRoute, NavigationCancel, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from './auth.service';

@Component({
  selector: 'u4-ib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {
  private id_token: string;
  private access_token: string;
  private token_type: string;
  private expires_in: string;
  private scope: string;
  private state: string;
  private session_state: string;
  private default_user_message: string = 'No user identified';
  activeUser: string = this.default_user_message;
  private activeUserInfo: Object;

  constructor (private http: Http, private authService: AuthService, private route: ActivatedRoute, private router: Router) {  }

  ngOnInit() { 
      this.route.fragment.map(fragment => {
        if(fragment !== '' && fragment !== null){
            this.saveInfoAndRedirectToHome(fragment);
          }
      });

      this.route.fragment.subscribe(
        (fragment: string) => {
          if(fragment !== '' && fragment !== null){
            this.saveInfoAndRedirectToHome(fragment);
          }          
        }
      );

      let userInfo = localStorage.getItem('activeUserInfo');
      let accessToken = localStorage.getItem('activeUserToken');

      if(userInfo !== null){
        let parsedUserInfo = JSON.parse(userInfo);
        this.activeUser = parsedUserInfo.given_name;
      }

      if(accessToken !== null){
        this.access_token = accessToken;
      }
  }

  saveInfoAndRedirectToHome(fragment: string){
    this.collectTokenData(fragment);
    this.getUserInfoAndSaveSession();
    this.router.navigateByUrl('/', {preserveQueryParams: false});
  }

  collectTokenData(fragment: string) {
    let fragmentSplitted = fragment.split('&');

    this.id_token = fragmentSplitted[0].split('=')[1];
    this.access_token = fragmentSplitted[1].split('=')[1];
    this.token_type = fragmentSplitted[2].split('=')[1];
    this.expires_in = fragmentSplitted[3].split('=')[1];
    this.scope = fragmentSplitted[4].split('=')[1];
    this.state = fragmentSplitted[5].split('=')[1];
    this.session_state = fragmentSplitted[6].split('=')[1];   

    localStorage.setItem('activeUserToken', this.access_token);
  }

  getUserInfoAndSaveSession(){
    let customHeaders = new Headers();
    customHeaders.append('Content-Type', 'application/json')
    customHeaders.append('Authorization','Bearer ' + this.access_token);
    this.http.get('https://u4ids-sandbox.u4pp.com/identity/connect/userinfo', {headers: customHeaders}).subscribe(
      (response: Response) => {
      this.activeUserInfo = response.json();
      this.activeUser = response.json().given_name;

      localStorage.setItem('activeUserInfo', JSON.stringify(this.activeUserInfo));
    });
  }

  startSigninMainWindow() {
    this.authService.startSigninMainWindow();
  }

  startSignoutMainWindow(){
    this.activeUser = this.default_user_message;
    localStorage.removeItem('activeUserToken');
    localStorage.removeItem('activeUserInfo');
    this.authService.startSignoutMainWindow();
  }
}