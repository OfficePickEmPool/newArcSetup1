import { Component, OnInit } from "@angular/core";
import { UsersService } from "./../../shared/users.service";
import { User } from "./../../modal/user";
import { AppService } from "./../../shared/app.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";
import { Page } from "tns-core-modules/ui/page";

@Component({
	selector: "Resetpassword",
	moduleId: module.id,
	templateUrl: "./resetpassword.component.html",
	styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
	isBusy: boolean = true;


	accesscode: string = "";
	email: string = "";
	password: string = "";
	cnfpassword: string = "";

	validatepassword = (password) => {

		if (this.accesscode == "" || this.accesscode == undefined && this.password == "" || this.password == undefined && this.cnfpassword == "" || this.cnfpassword == undefined) {
			alert({
				title: "Office Pick Em Pool",
				message: "fill all mandatory fields.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/(?=.*[a-z])/.test(this.password) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Your password must contain at least one lower letter.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/(?=.*[A-Z])/.test(this.password) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Your password must contain at least one upper letter.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/[a-zA-Z0-9]{6,}/.test(this.password) === false)) {

			alert({
				title: "Office Pick Em Pool",
				message: "Your password must be at least 6 characters",
				okButtonText: "OK"
			});
			return false;
		}

		else if ((/[$&+,:;=?@#|'<>.^*()%!-]+/.test(this.password) === false)) {
			alert({
				title: "Office Pick Em Pool",
				message: "Your password must contain at least one special characters.",
				okButtonText: "OK"
			});
			return false;
		}

		else if ((/^(?=.*\d)/.test(this.password) === false)) {
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

	constructor(private page: Page, private userService: UsersService, private appService: AppService, private route: Router, private router: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.page.actionBarHidden = true;
		this.email = this.router.snapshot.params.email;
		this.isBusy = false;
	}

	resetPassword(): void {
		this.isBusy = true;
		if (this.password == this.cnfpassword) {
			if (this.validatepassword(this.password)) {

				this.userService.resetPassword(this.email, this.accesscode, this.password, this.cnfpassword).subscribe((data: Response) => {
					if (data.ok != undefined && data.ok == false) { this.isBusy = false; return; }
					var responce = this.appService.map(data, new ResetPasswordResponce);
					if (responce.StatusCode == "200") {
						this.isBusy = false;
						this.route.navigate(["/login"]);
					}
				}, (error) => {
					let er = this.appService.map(error, new ApiErrorResponce());
					alert({
						title: "Office Pick Em Pool",
						message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
						okButtonText: "OK"
					})
					this.isBusy = false;
				});
			}
		}
		else {
			alert({
				title: "Office Pick Em Pool",
				message: "Password and confirmation password must  match.",
				okButtonText: "OK"
			})
			this.isBusy = false;
		}
	}
}
class ResetPasswordResponce {
	constructor() {

	}
	Version: string = "";
	StatusCode: string = "";
	ErrorMessage: string = "";
	Result: string = "";

}