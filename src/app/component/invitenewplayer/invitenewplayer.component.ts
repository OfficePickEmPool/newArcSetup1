import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../shared/app.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { InviteService } from "./../../shared/invite.service";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";

@Component({
	selector: "Invitenewplayer",
	moduleId: module.id,
	templateUrl: "./invitenewplayer.component.html",
	styleUrls: ['./invitenewplayer.component.css']
})
export class InvitenewplayerComponent implements OnInit {
	isBusy: boolean = true;

	email = "";
	constructor(private appService: AppService, private inviteService: InviteService, private route: Router) {
	}

	ngOnInit(): void {
		this.isBusy = false;
	}

	sendEmail() {
		this.isBusy = true;
		let leagueId = this.appService.leagueDetails.LeagueId;
		if (leagueId != null && leagueId != undefined) {
			this.inviteService.sendInvitation(this.email, leagueId).subscribe((data: Response) => {

				this.isBusy = false;
				alert({
					title: "Invitation sent successfully.",
					okButtonText: "OK"
				});
			}, (error) => {
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
			this.isBusy = false;
		}

	}
}