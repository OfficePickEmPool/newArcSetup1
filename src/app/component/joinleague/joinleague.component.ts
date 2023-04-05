import { Component, OnInit } from "@angular/core";
import { LeagueService } from "./../../shared/league.service";
import { AppService } from "./../../shared/app.service";
import { Router } from "@angular/router";
import { EventData, Observable } from "tns-core-modules/data/observable";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";

@Component({
	selector: "Joinleague",
	moduleId: module.id,
	templateUrl: "./joinleague.component.html",
	styleUrls: ['./joinleague.component.css']
})
export class JoinleagueComponent implements OnInit {
	isBusy: boolean = true;


	leagueName: string;
	leaguePassword: string;
	validate() {

		if (this.leagueName == "" || this.leagueName == undefined && this.leaguePassword == "" || this.leaguePassword == undefined) {
			alert({
				title: "Office Pick Em Pool",
				message: "fill all mandatory fields.",
				okButtonText: "OK"
			});
			return false;
		}
		else if (this.leagueName == "" || this.leagueName == undefined) {
			alert({
				title: "Office Pick Em Pool",
				message: "Please enter username.",
				okButtonText: "OK"
			});
			return false;
		}
		else if (this.leaguePassword == "" || this.leaguePassword == undefined) {
			alert({
				title: "Office Pick Em Pool",
				message: "Please enter password.",
				okButtonText: "OK"
			});
			return false;
		}
		else {
			return true;
		}
	};
	constructor(private leagueService: LeagueService, private appService: AppService, private route: Router) {
	}

	ngOnInit(): void {
	}

	btnjoinLeague() {
		if (this.leagueName != "" && this.leaguePassword != null) {
			//console.log(this.leagueName + this.leaguePassword);
			this.leagueService.joinLeague(this.leagueName, this.leaguePassword).subscribe((response: Response) => {
				if (response.ok != undefined && response.ok == false) {
					this.isBusy = false;
					return;
				}
				var responce = this.appService.map(response, new LeagueResponce);
				this.isBusy = false;
			}, (error) => {
				let er = this.appService.map(error, new ApiErrorResponce());
				//console.log(er);
				alert({
					title: "Status",
					message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
					okButtonText: "OK"
				})
				this.isBusy = false;
			})
		}
		else {
			this.isBusy = false;
		}
	}
}
class LeagueResponce {
	constructor() { }
	Version: string = "";
	StatusCode: string = "";
	ErrorMessage: string = "";
	Result: object = {};
}