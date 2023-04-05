import { Component, OnInit } from "@angular/core";
import { LeagueService } from "./../../shared/league.service";
import { AppService } from "./../../shared/app.service";
import { Router } from "@angular/router";
import { EventData, Observable } from "tns-core-modules/data/observable";
import { Image } from "tns-core-modules/ui/image";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";

@Component({
	selector: "Createleague",
	moduleId: module.id,
	templateUrl: "./createleague.component.html",
	styleUrls: ['./createleague.component.css']
})
export class CreateleagueComponent implements OnInit {
	isBusy: boolean = true;
	processing: boolean = true;
	leagueName: string;
	leaguePassword: string;
	leagueConfirmPassword: string;
	leaguenote: string;
	firstRule = false;
	secondRule = false;
	thirdRule = false;
	public newImage: Image;

	constructor(private leagueService: LeagueService, private appService: AppService, private route: Router) {
	}

	ngOnInit(): void {
		this.processing = false;
	}
	onClickFirstCHK() {

		if (this.processing != true) {
			if (this.firstRule == false) {
				this.firstRule = true;
			} else {
				this.firstRule = false;
			}
		}
	}
	onClickSecondCHK() {
		if (this.processing != true) {
			if (this.secondRule == false) {
				this.secondRule = true;
			} else {
				this.secondRule = false;
			}
		}

	}
	onClickThirdCHK() {
		if (this.processing != true) {
			if (this.thirdRule == false) {
				this.thirdRule = true;
			} else {
				this.thirdRule = false;
			}
		}
	}

	createLeague() {
		this.processing = true;
		if (this.firstRule && this.secondRule && this.thirdRule && this.leaguePassword != "" && this.leaguePassword != undefined && this.leagueConfirmPassword != "" && this.leagueConfirmPassword != undefined && this.leaguePassword == this.leagueConfirmPassword && (this.leagueName != "" && this.leagueName != undefined) && (this.leaguenote != "" && this.leaguenote != undefined)) {
			this.leagueService.createNewLeague(this.leagueName, this.leaguePassword, this.leaguenote).subscribe((response: Response) => {
				if (response.ok != undefined && response.ok == false) {
					this.processing = false;
					return;
				}
				var responce = this.appService.map(response, new LeagueResponce);
				if (responce.StatusCode == "200") {
					this.processing = false;
					this.route.navigate(["/availableleague"]);
				}
			}, (error => {
				let er = this.appService.map(error, new ApiErrorResponce());
				this.processing = false;
				alert({
					title: "Unable to create league.",
					message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
					okButtonText: "OK"
				});
			}))
		} else {
			if ((this.firstRule && this.secondRule && this.thirdRule) != true) {
				alert({
					title: "Terms & Condition",
					message: "Please agree the all terms",
					okButtonText: "OK"
				});
			}
			else if (this.leagueName == undefined || this.leagueName == "") {
				alert({
					title: "Office Pick Em Pool",
					message: "League name must be required.",
					okButtonText: "OK"
				});
			}
			else if (this.leaguenote == undefined || this.leaguenote == "") {
				alert({
					title: "Office Pick Em Pool",
					message: "League note must be required.",
					okButtonText: "OK"
				});
			}

			else {
				alert({
					title: "Office Pick Em Pool",
					message: "Password and confirmation password must  match.",
					okButtonText: "OK"
				});
			}
			this.processing = false;
		}
	}
}
class LeagueResponce {
	constructor() {
	}
	Version: string = "";
	StatusCode: string = "";
	ErrorMessage: string = "";
	Result: object = {};

}