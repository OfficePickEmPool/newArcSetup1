import { Component, OnInit } from "@angular/core";
import { User } from "./../../modal/user";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";
import { UsersService } from "./../../shared/users.service";
import { AppService } from "./../../shared/app.service";
import { Router } from "@angular/router";
import { Switch } from "tns-core-modules/ui/switch";
import observable = require("data/observable");
import { Page } from "tns-core-modules/ui/page";

@Component({
	selector: "Register",
	moduleId: module.id,
	templateUrl: "./register.component.html",
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	isBusy: boolean = true;
	processing: boolean = false;
	textFieldValue: string = "";
	user: User = new User();
	cnfpassword: string = "";
	isLogin: boolean = false;
	glyphs = [];
	signupIcon: string = "";
	isCheck: number = 0;

	validatepassword = (Password) => {
		console.log("Password: ", this.user.Password);
		if (this.user.Email == "" || this.user.Email == undefined && this.user.Password == "" || this.user.Password == undefined && this.cnfpassword == "" || this.cnfpassword == undefined
			&& this.user.FirstName == "" || this.user.FirstName == undefined && this.user.LastName == "" || this.user.LastName == undefined
			&& this.user.PhoneNumber == "" || this.user.PhoneNumber == undefined && this.user.UserName == "" || this.user.UserName == undefined
		) {
			alert({
				title: "Office Pick Em Pool",
				message: "fill all mandatory fields.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/).test(this.user.Email) === false) {
			alert({
				title: "Office Pick Em Pool",
				message: "Enter valid email.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.user.FirstName == "" || this.user.FirstName == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Registration is not done. Enter firstname",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.user.LastName == "" || this.user.LastName == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Registration is not done. Enter Lastname",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.user.UserName == "" || this.user.UserName == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Registration is not done. Enter username",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((this.user.PhoneNumber == "" || this.user.PhoneNumber == undefined)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Registration is not done. Enter phonenumber",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/(?=.*[a-z])/.test(this.user.Password) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Your password must contain at least one lower letter.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/(?=.*[A-Z])/.test(this.user.Password) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Your password must contain at least one upper letter.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/[a-zA-Z0-9]{6,}/.test(this.user.Password) === false)) {

			alert({
				title: "Office Pick Em Pool",
				message: "Your password must be at least 6 characters",
				okButtonText: "OK"
			});
			return false;
		}

		else if ((/[$&+,:;=?@#|'<>.^*()%!-]+/.test(this.user.Password) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Your password must contain at least one special characters.",
				okButtonText: "OK"
			});
			return false;
		}

		else if ((/^(?=.*\d)/.test(this.user.Password) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Your password must contain at least one digit.",
				okButtonText: "OK"
			});
			return false;
		}
		else {
			return true;
		}
	};

	constructor(private page: Page, private userService: UsersService, private appService: AppService, private route: Router) {
		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}


		this.glyphs.forEach((element) => {
			if (element.code == "e973") {
				this.signupIcon = element.icon;
			}


		});
	}

	onCheckedChange(args: observable.EventData) {
		let mySwitch = args.object as Switch;
		let isChecked = mySwitch.checked;
		if (isChecked == false) {
			this.isCheck = 0;
		}
		else {
			this.isCheck = 1;
		}
	}

	onRegisterBtnTap(): void {
		this.processing = true;
		if (this.user.Password == null) this.user.Password = '';
		if (this.isLogin) {
			this.userService.changeUserInfo(this.user).subscribe((data: Response) => {

				if (data.ok != undefined && data.ok == false) {
					this.processing = false;
					return;
				}

				var responce = this.appService.map(data, new RegisterUserResponce);
				if (responce.StatusCode == "200") {
					this.route.navigate(["/home"]);
				}
			})
		}
		else {
			if (this.validatepassword(this.user.Password)) {

				this.userService.registerUser(this.user).subscribe((data: Response) => {

					if (data.ok != undefined && data.ok == false) {
						this.processing = false;
						return;
					}
					var responce = this.appService.map(data, new RegisterUserResponce);
					if (responce.StatusCode == "200") {
						this.processing = false;
						this.route.navigate(["/login"]);
					}
				}, (error) => {
					this.processing = false;
					let er = this.appService.map(error, new ApiErrorResponce());
					alert({
						title: "Office Pick Em Pool",
						message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
						okButtonText: "OK"
					});
				});
			}
			else {
				this.processing = false;
				alert({
					title: "Office Pick Em Pool",
					message: "Password and confirmation password must  match.",
					okButtonText: "OK"
				})
			}
		}

	}

	getUserDetails(): void {
		this.processing = true;
		//console.log("start");
		this.userService.getUserDetail().subscribe((responce: Response) => {

			if (responce.hasOwnProperty("ErrorMessage")) {
				let responce1 = this.appService.map(responce, new RegisterUserResponce());
				this.user = this.appService.map(responce1.Result, new User());
				this.processing = false;
				this.appService.userDetails = this.user;
				//console.log("Sucess: " + JSON.stringify(responce1.Result));
			} else {
				this.processing = false;
				//console.log("Error :" + responce);
			}
		})
	}


	ngOnInit(): void {
		this.page.actionBarHidden = true;
		this.isLogin = this.appService.isLogin();
		if (this.isLogin == false) {
			this.isCheck = 1;
		}
		else {
			this.isCheck = 0;
		}
		if (this.isLogin) this.getUserDetails();
	}
}

class RegisterUserResponce {
	constructor() {

	}
	Version: string = "";
	StatusCode: string = "";
	ErrorMessage: string = "";
	Result: object = {};

}