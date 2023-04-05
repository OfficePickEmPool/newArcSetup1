import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./../modal/user";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

    constructor(private http: HttpClient, private appService: AppService) { }

    login(userName, password) {
        if (userName || password) {
            var data = "grant_type=password&username=" + userName + "&password=" + password;
            let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
            return this.http.post(this.appService.api_end_point + "Token", data, { headers: headers });
        }
        else {
            dialogs.alert({
                title: "Login failed",
                message: "Please provide both an email address and password.",
                okButtonText: "OK"
            })
            //dialogs.alert("Please provide both an email address and password.")
            return new Observable((data => {
                data.next("Error")
            }));
        }
    }

    registerUser(user: User) {
        var model = {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            UserName: user.UserName,
            PhoneNumber: user.PhoneNumber,
            Password: user.Password,
            ConfirmPassword: user.Password
        };
        return this.http.post(this.appService.api_end_point + "api/account/register", model, { headers: this.appService.getHeaderWithoutToken() });
    }

    getUserDetail() {
        return this.http.get(this.appService.api_end_point + "api/me", { headers: this.appService.getHeaderWithToken() });
    }

    recoverPassword(email: string) {
        var data = {
            Email: email
        };
        return this.http.post(this.appService.api_end_point + "api/account/recover", data, { headers: this.appService.getHeaderWithoutToken() })
    }

    createForgotPassInfo(email: string) {
        var data = {
            Email: email
        };
        return this.http.post(this.appService.api_end_point + "api/forgotpassinfo/create", data, { headers: this.appService.getHeaderWithoutToken() })
    }

    checkTimeOut(emailAddress: string) {
        var data = {
            Email: emailAddress
        };
        return this.http.post(this.appService.api_end_point + "api/forgotpassinfo/checktimeout", data, { headers: this.appService.getHeaderWithoutToken() })
    }


    resetPassword(email: string, accessCode: string, password: string, cnfpassword: string) {
        if (password == cnfpassword) {
            var data = {
                Email: email,
                AccessCode: accessCode,
                NewPassword: password,
                ConfirmPassword: password
            };
            return this.http.post(this.appService.api_end_point + 'api/account/resetPassword', data, { headers: this.appService.getHeaderWithoutToken() })

        }
        else {
            dialogs.alert({
                title: "failed",
                message: "Unable to reset password.",
                okButtonText: "OK"
            });
        }
    }

    changeUserInfo(userDetail: User) {
        if (userDetail.Password != "") {
            var data = {
                FirstName: userDetail.FirstName,
                LastName: userDetail.LastName,
                Email: userDetail.Email,
                UserName: userDetail.UserName,
                PhoneNumber: userDetail.PhoneNumber,
                Password: userDetail.Password,
                ConfirmPassword: userDetail.Password

            };
            return this.http.put(this.appService.api_end_point + "api/me", data, { headers: this.appService.getHeaderWithToken() });
        }
        else {
            var data1 = {
                FirstName: userDetail.FirstName,
                LastName: userDetail.LastName,
                Email: userDetail.Email,
                UserName: userDetail.UserName,
                PhoneNumber: userDetail.PhoneNumber,

            };
            return this.http.put(this.appService.api_end_point + "api/me", data1, { headers: this.appService.getHeaderWithToken() });
        }

    }
}