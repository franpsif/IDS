import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserManager, Log, MetadataService, User, WebStorageStateStore, OidcClient } from 'oidc-client';

const userManagerSettings: any = {
      authority: "https://u4ids-sandbox.u4pp.com/identity",      
      client_id: "information-browser",
      redirect_uri: "http://localhost:4200/token",
      post_logout_redirect_uri: "http://localhost:4200",
      response_type: "id_token token",
      scope: "openid preveroemailscope",
      
      acr_values: "tenant:praetorians",
      loadUserInfo: true,
      filterProtocolClaims: true,

      userStore: new WebStorageStateStore({ store: window.localStorage }),
      silent_redirect_uri: "http://localhost:4200"
};

@Injectable()
export class AuthService {
  mgr: UserManager = new UserManager(userManagerSettings);

  constructor(private http: Http) {  }  

  startSigninMainWindow() {
    this.mgr.signinRedirect({ data: 'some data' }).then(function () {
      console.log("signinRedirect done");
    }).catch(function (err) {
      console.log(err);
    });
  } 

  startSignoutMainWindow() {
    this.mgr.signoutRedirect().then(function (resp) {
      console.log("signed out", resp);
      setTimeout(5000, () => {
        console.log("testing to see if fired...");

      })
    }).catch(function (err) {
      console.log(err);
    });
  };  
 }