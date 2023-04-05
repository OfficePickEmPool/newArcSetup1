import { Component, OnInit } from "@angular/core";
import { UsersService } from "./../../shared/users.service";
import { Router } from "@angular/router"
import { AppService } from "./../../shared/app.service";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";
import { Page } from "tns-core-modules/ui/page";
import {
	getBoolean,
	setBoolean,
	getNumber,
	setNumber,
	getString,
	setString,
	hasKey,
	remove,
	clear
} from "application-settings";

@Component({
	selector: "Forgotpassword",
	moduleId: module.id,
	templateUrl: "./forgotpassword.component.html",
	styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
	isBusy: boolean = true;


	constructor(private page: Page, private userService: UsersService, private route: Router, private appService: AppService) {
	}
	email: string = "";
	email1: string = "";
	accesscode: string = "";
	password: string = "";
	validateEmail = (email) => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	ngOnInit(): void {
		this.page.actionBarHidden = true;
		this.isBusy = false;
	}

	forgetPassword() {
		this.isBusy = true;
		if (this.validateEmail(this.email)) {
			setString("EmailAddress", this.email);
			this.userService.recoverPassword(this.email).subscribe((data: Response) => {
				if (data.ok != undefined && data.ok == false) {
					this.isBusy = false;
					return;
				}
				this.userService.createForgotPassInfo(this.email).subscribe((data: Response) => {
					//console.log("Firgot Pass: " + data);
				});
				this.isBusy = false;
				this.route.navigate(['/resetpassword/' + this.email]);

			}, (error) => {
			//	console.log("5: " + JSON.stringify(error));
				let er = this.appService.map(error, new ApiErrorResponce());
				this.isBusy = false;
				alert({
					title: "Office Pick Em Pool",
					message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
					okButtonText: "OK"
				})
			});
		}
		else {
			alert({
				title: "Office Pick Em Pool",
				message: "Enter valid email.",
				okButtonText: "OK"
			})
			this.isBusy = false;
		}
	}
}