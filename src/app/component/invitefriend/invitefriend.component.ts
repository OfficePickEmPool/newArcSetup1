import { Component, OnInit } from "@angular/core";
import { InviteService } from "./../../shared/invite.service";
import { AppService } from "./../../shared/app.service";
import { Router, ActivatedRoute } from "@angular/router";
import observable = require("data/observable");
import { LeagueModel, LeagueDetails } from "./../../modal/leagueDetails";

@Component({
	selector: "invitefriend",
	moduleId: module.id,
	templateUrl: "./invitefriend.component.html",
	styleUrls: ['./invitefriend.component.css']
})
export class InvitefriendComponent implements OnInit {

	userName: string = "";
	userEmail: string = "";
	leagueId: number;

	validate() {
		//console.log("email");
		if (this.userName == "" || this.userName == undefined && this.userEmail == "" || this.userEmail == undefined) {
			alert({
				title: "Office Pick Em Pool",
				message: "fill all mandatory fields.",
				okButtonText: "OK"
			});
			return false;
		}
		else if (this.userName == "" || this.userName == undefined) {
			alert({
				title: "Office Pick Em Pool",
				message: "Please enter username.",
				okButtonText: "OK"
			});
			return false;
		}
		else if (this.userEmail == "" || this.userEmail == undefined) {
			alert({
				title: "Office Pick Em Pool",
				message: "Please enter email.",
				okButtonText: "OK"
			});
			return false;
		}
		else if ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.userEmail) === false)) {

			alert({
				title: "Office Pick Em Pool",
				message: "Enter valid email.",
				okButtonText: "OK"
			});
			return false;
		}

		else {
			return true;
		}
	};

	constructor(private inviteService: InviteService, private appService: AppService, private route: Router) {
	}

	ngOnInit(): void {
	}

	btnInvite(): void {
		if (this.validate()) {
			this.leagueId = this.appService.leagueDetails.getLeagueId();
			//console.log(this.userEmail + ";" + this.leagueId);
			this.inviteService.sendInvitation(this.userEmail, this.leagueId).subscribe((data: Response) => {
				alert({
					title: "Office Pick Em Pool",
					message: "Invitation sent successfully.",
					okButtonText: "OK"
				});
			}, (error) => {
				alert({
					title: "Office Pick Em Pool",
					message: "Friend request not sent.",
					okButtonText: "OK"
				});
			})
		}
	}
}
class InviteResponce {
	constructor() {

	}
	Version: string = "";
	StatusCode: string = "";
	ErrorMessage: string = "";
	Result: object = {};

}