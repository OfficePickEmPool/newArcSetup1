import { Component, OnInit } from "@angular/core";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import { AppService } from "./../../shared/app.service";
import { LeaderService } from "./../../shared/leader.service";
import { EventData, Observable } from "tns-core-modules/data/observable";
import { ApiSuccessResponce } from "./../../modal/apisuccessresponce";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";

@Component({
	selector: "Leaderboard",
	moduleId: module.id,
	templateUrl: "./leaderboard.component.html",
	styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
	isBusy: boolean = true;
	screenHeight: number;
	
	device: string = "";
	divisionList: { key: string, value: string }[] = []

	textdivisions: Array<string> = new Array<string>();
	divisionmodel: Array<DivisionModel> = new Array<DivisionModel>();

	selectedDivisionId: number;
	selectedDivisionName: string = "Select Division";
	scoreCardList: [];

	currentUserName = this.appService.userDetails.UserName;



	getDivision(divisionId, divisionName) {
		this.isBusy = true;
		this.selectedDivisionId = divisionId;
		this.selectedDivisionName = divisionName;
		this.isBusy = false;
		this.getScoreCard();
	}
	constructor(private appService: AppService, private leaderService: LeaderService) {
	}

	ngOnInit(): void {
		this.screenHeight = this.appService.screenInformation.heightPixels;
		this.device = this.appService.deviceInformation.os;
		let leagueID = this.appService.leagueDetails.LeagueId;
		//get all division list
		this.leaderService.getDevisionList(leagueID).subscribe((response: Response) => {
			if (response.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(response, new ApiSuccessCollectionResponce());
				if (data.StatusCode = "200") {
					this.divisionmodel = data.Result;
					if (this.divisionmodel.length > 0) {
						this.divisionmodel.forEach((item) => this.textdivisions.push(item.Name));
					}
					this.isBusy = false;
					this.getCurrentDivision();
				} else { this.isBusy = false; }

			} else {
				this.isBusy = false;
				//console.log("Error :" + response);
			}
		}, (error) => { this.isBusy = false; })
	}

	getCurrentDivision() {
		this.isBusy = true;
		//get current division 		
		this.leaderService.getCurrentDevision(this.appService.leagueDetails.LeagueId).subscribe((responce: any) => {
			if (responce.ErrorMessage == null && responce.Result != null) {
				this.selectedDivisionName = responce.Result.Name;
				this.selectedDivisionId = responce.Result.Id;
				this.isBusy = false;
				this.getScoreCard();
			}
			else { this.isBusy = false; }
			//console.log(responce);
		}, (error) => { this.isBusy = false; })
	}

	action() {
		this.isBusy = true;
		action({
			message: "Select Division",
			cancelButtonText: "Cancel",
			actions: this.textdivisions
		}).then((result) => {
			let sdivision = new DivisionModel();
			this.divisionmodel.forEach((x) => {
				if (x.Name == result) {
					sdivision = x;
				}
			});
			this.isBusy = false;
			this.getDivision(sdivision.Id, sdivision.Name);

		});
	}
	getScoreCard() {
		this.isBusy = true;
		//get Score card by division id and league id		
		this.leaderService.getScoreCard(this.appService.leagueDetails.LeagueId, this.selectedDivisionId).subscribe((response: any) => {
			if (response.ErrorMessage == null && response.Result != null) {
				let data = this.appService.map(response, new ApiSuccessCollectionResponce());
				if (data.StatusCode = "200") {
					this.isBusy = false;
					this.scoreCardList = data.Result;
				}
				else { this.isBusy = false; }
			} else { this.isBusy = false; }
			//console.log(response);
		}, (error) => { this.isBusy = false; })
	}
	btnPlayoffs() {
		//console.log("id" + this.selectedDivisionId);
		//console.log("name" + this.selectedDivisionName);
	}
}
class DivisionModel {
	Name: string = "";
	Id: number;
}