import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-ui-autocomplete";
import { Component, OnInit } from "@angular/core";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import { AppService } from "./../../shared/app.service";
import { SchedulesService } from "./../../shared/schedules.service";
import { ScoreService } from "./../../shared/score.service";
import { MakePickService } from "./../../shared/makePick.service";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { Router } from "@angular/router";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";


@Component({
	selector: "Schedules",
	moduleId: module.id,
	templateUrl: "./schedules.component.html",
	styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
	isBusy: boolean = true;

	textweeks: Array<string> = new Array<string>();
	public items: Array<any> = [];
	glyphs = [];
	isContinue = true;
	isDisableSaveBtn = true;
	saveIcon: string = "";
	exitIcon: string = "";
	device: string = "";
	week: Array<SchedulesWeek> = new Array<SchedulesWeek>();
	leagueGamesViewModel: LeagueGamesViewModel = new LeagueGamesViewModel();
	selectedWeekId: number;
	selectedWeekName: string = "Select Week";
	seletedLeagueGames: any = {};
	selectedGames: any[] = [];
	selectedGameId: any[] = [];
	leagueGames: any = {};

	constructor(private appService: AppService,
		private schedulesService: SchedulesService,
		private scoreService: ScoreService,
		private makePickService: MakePickService,
		private route: Router) {

	}

	ngOnInit(): void {
		this.device = this.appService.deviceInformation.os;
		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);

		}


		this.glyphs.forEach((element) => {
			if (element.code == "e962") {
				this.saveIcon = element.icon;
			}
			if (element.code == "ea0f") {
				this.exitIcon = element.icon;
			}
		});
		this.schedulesService.getWeeksForAdmin(this.appService.leagueDetails.LeagueId).subscribe((responce) => {
			if (responce.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(responce, new ApiSuccessCollectionResponce());
				if (data.StatusCode = "200") {
					this.week = data.Result;
					if (this.week.length > 0) {
						this.week.forEach((item) => this.textweeks.push(item.Name));
					}
					this.getCurrentWeekByPlayerLeague();
				}
				else {
					this.isBusy = false;
				}
			}
			else {
				this.isBusy = false;
			}
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

	getCurrentWeekByPlayerLeague() {
		this.schedulesService.getCurrentWeekByPlayerLeagueForAdmin(this.appService.leagueDetails.LeagueId).subscribe((responce: any) => {
			if (responce.ErrorMessage == null && responce.Result != null) {
				this.selectedWeekName = responce.Result.Name;
				this.selectedWeekId = responce.Result.Id;
				this.getAllGames();
			}
			else {
				this.isBusy = false;
			}
			//console.log(responce);
		}, (error) => {
			let er = this.appService.map(error, new ApiErrorResponce());
			this.isBusy = false;
			alert({
				title: "Office Pick Em Pool",
				message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
				okButtonText: "OK"

			})
		})
	}

	isGameStarted(startDate) {
		return this.makePickService.isGameStarted(startDate);
	}

	getGames(weekId, weekName) {
		this.isBusy = true;
		this.leagueGamesViewModel.isChecked = [];
		this.leagueGamesViewModel.isGameStarted = [];
		this.leagueGamesViewModel.leagueGames = [];
		this.selectedWeekId = weekId;
		this.selectedWeekName = weekName;
		this.getAllGames();
	}

	getAllGames() {
		this.isBusy = true;
		this.schedulesService.getAllGames(this.appService.leagueDetails.LeagueId, this.selectedWeekId).subscribe((responce) => {
			if (responce.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(responce, new ApiSuccessCollectionResponce());
				if (data.StatusCode = "200") {
					this.leagueGames = data.Result;
				};
				this.leagueGames.sort((a, b) => {
					this.isBusy = false;
					return <any>new Date(b.StartDateTime) - <any>new Date(a.StartDateTime)
				});
				this.getSeletedGames();
			}
			else {
				this.isBusy = false;
			}
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


	saveSelectedGameForWeek() {
		if (!this.isDisableSaveBtn) {
			this.schedulesService.saveSelectedGameForWeek(this.appService.leagueDetails.LeagueId, this.selectedWeekId, this.selectedGameId).subscribe((responce: any) => {
				if (responce.ErrorMessage == null) {
					alert({
						title: "Schedule",
						message: "Game(s) scheduled successfully.",
						okButtonText: "OK"
					});
					this.route.navigate(["/leaguedashboardhome"]);
				} else {
					alert({
						title: "Schedule",
						message: "Error : " + responce.ErrorMessage,
						okButtonText: "OK"
					});
				}
			}, (error) => {
				let er = this.appService.map(error, new ApiErrorResponce());
				alert({
					title: "Office Pick Em Pool",
					message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
					okButtonText: "OK"

				})
			})
		}
	}

	getSeletedGames() {
		this.isBusy = true;
		this.scoreService.getSeletedGames(this.appService.leagueDetails.LeagueId, this.selectedWeekId).subscribe((responce) => {
			if (responce.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(responce, new ApiSuccessCollectionResponce());
				if (data.StatusCode = "200") {
					this.seletedLeagueGames = data.Result;
					this.selectedGames = this.seletedLeagueGames;
					this.selectedGames.forEach((item) => {
						this.selectedGameId.push(item.GameId);
					});
					this.leagueGamesViewModel.isChecked = [];
					this.leagueGamesViewModel.isGameStarted = [];
					this.leagueGamesViewModel.leagueGames = [];
					this.checkIsExists();
				}
				else {
					this.isBusy = false;
				}
			}
			else {
				this.isBusy = false;
			}
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

	checkIsExists() {
		this.leagueGames.forEach((item) => {
			if (this.makePickService.isGameStarted(item.StartDateTime)) {
				this.leagueGamesViewModel.isGameStarted.push(true);
			} else {
				this.leagueGamesViewModel.isGameStarted.push(false);
			}
			this.leagueGamesViewModel.isChecked.push(this.checkIsExistsPlayer(item.Id));
			item.StartDateTime = new Date(item.StartDateTime);
			this.leagueGamesViewModel.leagueGames.push(item);
			this.isBusy = false;
		});
	}

	checkIsExistsPlayer(id) {
		this.isBusy = true;
		var keepGoing = true;
		this.selectedGames.forEach((item) => {
			if (keepGoing) if (item.GameId == id) keepGoing = false;
		})
		this.isBusy = false;
		return keepGoing;
	}

	selectedGame(selectedItem, checkStatus, index) {
		if (!this.leagueGamesViewModel.isGameStarted[index]) {
			if (this.isGameStarted(selectedItem.StartDateTime)) {
				this.leagueGamesViewModel.isGameStarted[index] = true;
			}
			if (this.isGameStarted(selectedItem.StartDateTime) && this.isContinue) {
				this.isDisableSaveBtn = true;
			}
			else {
				this.isDisableSaveBtn = false;
				this.isContinue = false;
			}

			if (checkStatus == true) {
				this.leagueGamesViewModel.isChecked[index] = true;
				this.selectedGameId = this.selectedGameId.filter(function (item) {
					return item != selectedItem.Id;
				});
			}
			else {
				this.leagueGamesViewModel.isChecked[index] = false;
				this.selectedGameId.push(selectedItem.Id);

			}
		}
	}

	action() {
		this.isBusy = true;
		action({
			message: "Select Week",
			cancelButtonText: "Cancel",
			actions: this.textweeks
		}).then((result) => {

			let sweek = new SchedulesWeek();
			this.week.forEach((x) => {
				if (x.Name == result) {
					sweek = x;
				}
			});
			this.getGames(sweek.Id, sweek.Name);

		});
	}

}

class SchedulesWeek {
	Name: string = "";
	StartDate: Date = new Date();
	EndDate: Date = new Date();
	IsWeekStarted: boolean;
	IsPlayOffWeek: boolean;
	Id: number;
	Status: number;
}

class LeagueGamesViewModel {
	isChecked: any[];
	leagueGames: any[];
	isGameStarted: any[];
}