import { Component, OnInit } from "@angular/core";
import { UsersService } from "./../../shared/users.service";
import { AppService } from "./../../shared/app.service";
import { Router } from "@angular/router"
import * as appSettings from "tns-core-modules/application-settings";
import { ApiSuccessResponce } from "./../../modal/apisuccessresponce";
import { User } from "./../../modal/user";
import { Page } from "tns-core-modules/ui/page";

@Component({
	selector: "Login",
	moduleId: module.id,
	templateUrl: "./login.component.html",
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	releaseMode = "";
	appVersion = "";
	buildVersion = "";
	// userName: string = "";
	// passWord: string = "";
	// userName: string = "Rohan Patel";
	// passWord: string = "Testing@1234";
	userName: string = "Nick James";
	passWord: string = "P@ssword1";
	glyphs = [];
	loginIcon: string = "";
	signupIcon: string = "";
	forgotpassIcon: string = "";
	userIcon: string = "";
	processing = false;
	constructor(private page: Page, private userService: UsersService, private appService: AppService, private route: Router) {

	}

	ngOnInit(): void {
		this.page.actionBarHidden = true;
		this.releaseMode = this.appService.releaseMode;
		this.appVersion = this.appService.appVersion;
		this.buildVersion = this.appService.buildVersion;

		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}


		this.glyphs.forEach((element) => {
			if (element.code == "e98d") {
				this.loginIcon = element.icon;
			}
			if (element.code == "e973") {
				this.signupIcon = element.icon;
			}
			if (element.code == "ea09") {
				this.forgotpassIcon = element.icon;
			}
			if (element.code == "e971") {
				this.userIcon = element.icon;
			}
		});
	}

	getUserDetails(): void {
		this.userService.getUserDetail().subscribe((responce: Response) => {
			if (responce.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(responce, new ApiSuccessResponce());
				if (data.StatusCode = "200") {
					this.appService.userDetails = this.appService.map(data.Result, new User());
				}
			} else {
				//console.log("Error :" + responce);
			}
		})
	}

	onLoginClick(): void {
		this.processing = true;
		//console.log("Start");

		this.userService.login(encodeURIComponent(this.userName), encodeURIComponent(this.passWord)).subscribe((data: Response) => {
			this.processing = false;
			if (data.ok != undefined && data.ok == false) return;
			var responce = this.appService.map(data, new LoginResponce());

			appSettings.setString("tokenKey", responce.access_token);
			appSettings.setString("userName", responce.userName);
			this.getUserDetails();

			this.route.navigate(["/home"]);
		}, (error) => {
			alert({
				title: "Login failed",
				message: "Please check your credentials.",
				okButtonText: "OK"
			});
			this.processing = false;
		});

	}
}
class LoginResponce {
	access_token: string;
	token_type: string;
	expires_in: number;
	userName: string;
}