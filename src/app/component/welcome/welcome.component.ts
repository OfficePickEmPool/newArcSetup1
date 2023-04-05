import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";
import { UsersService } from "./../../shared/users.service";
import { AppService } from "./../../shared/app.service";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";
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
	selector: "Welcome",
	moduleId: module.id,
	templateUrl: "./welcome.component.html",
	styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
	isBusy: boolean = true;
	emailAddress: string = "";

	constructor(private page: Page, private router: Router, private userService: UsersService, private appService: AppService) {
	}

	ngOnInit(): void {
		this.page.actionBarHidden = true;
		this.emailAddress = getString("EmailAddress");
		console.log("emailAddress: " + this.emailAddress);
		this.userService.checkTimeOut(this.emailAddress).subscribe((data: Response) => {
		//	console.log("TimeOut: " + JSON.stringify(data));
			setTimeout(() => {
				this.router.navigate(['/resetpassword/' + this.emailAddress]);
			}, 5000);
		}, (error) => {
		//	console.log("error: " + JSON.stringify(error));
			setTimeout(() => {
				this.router.navigate(['login']);
			}, 5000);
		});


	}
}