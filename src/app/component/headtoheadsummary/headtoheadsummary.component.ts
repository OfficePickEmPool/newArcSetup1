import { Component, OnInit } from "@angular/core";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { HeadToHeadService } from "./../../shared/headtohead.service";
import { AppService } from "./../../shared/app.service";
import { User } from "./../../modal/user";
import { MakePickService } from "./../../shared/makePick.service";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';
import observable = require("data/observable");
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "Headtoheadsummary",
	moduleId: module.id,
	templateUrl: "./headtoheadsummary.component.html",
	styleUrls: ['./headtoheadsummary.component.css']
})
export class HeadtoheadsummaryComponent implements OnInit {
	isBusy: boolean = true;

	selectedWeekName: string = "Select Week";
	selectedWeekId: number = 0;
	selectedPlayer1Id: number = 0;
	selectedPlayer1Name: string = "Select Player 1";
	selectedPlayer2Id: number = 0;
	selectedPlayer2Name: string = "Select Player 2";
	allPlayerList: any[] = [];
	playerList: any[] = [];
	allWeeks: any[] = [];
	week: any[] = [];
	leagueId: number = 0;
	isRightTotal = false;
	isLeftTotal = false;
	leftLeagueScoreDetails = [];
	defaultOppPlayer: any = {};
	selectedPlayer2: any = {};
	selectedPlayer1: any = {};
	player1Id: string = "";
	player2Id: string = "";
	selectedWeekIdSummryQry: any = null;
	userName: string = "";
	leftTotal: number = 0;
	rightTotal: number = 0;
	playerListUserNames: any[] = [];
	allPlayerListUserNames: any[] = [];
	leftData: boolean = true;
	rightData: boolean = false;


	constructor(private router: ActivatedRoute,
		private headtoheadService: HeadToHeadService,
		private appService: AppService,
		private makePickService: MakePickService
	) {
	}

	ngOnInit(): void {
		this.leagueId = this.appService.leagueDetails.LeagueId;
		this.userName = this.appService.userDetails.UserName;
		let weekId = this.router.snapshot.params.weekId;
		let player1Id = this.router.snapshot.params.player1Id;
		let player2Id = this.router.snapshot.params.player2Id;
		if (weekId != undefined && weekId != null) this.selectedWeekIdSummryQry = weekId;
		if (player1Id != undefined && player1Id != null) this.player1Id = player1Id;
		if (player2Id != undefined && player2Id != null) this.player2Id = player2Id;

		this.headtoheadService.getWeeksByPlayerLeague(this.leagueId).subscribe((responce: any) => {
			if (responce.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(responce, new ApiSuccessCollectionResponce());
				if (data.StatusCode = "200") {
					this.week = data.Result;
					if (this.week.length > 0) {
						this.week.forEach((item) => this.allWeeks.push(item.Name));
						if (this.selectedWeekIdSummryQry == null)
							this.getCurrentWeekByPlayerLeagueHeadSummary();
						else
							this.getBySelectedWeekPlayerLeagueHeadSummary();
					} else {
						this.isBusy = false;
					}
				} else {
					this.isBusy = false;
				}
			} else {
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
		})
	}

	getCurrentWeekByPlayerLeagueHeadSummary() {
		this.makePickService.getCurrentWeekByPlayerLeague(this.leagueId).subscribe((response: any) => {
			if (response.ErrorMessage == null && response.Result != null) {
				this.selectedWeekId = response.Result.Id;
				this.selectedWeekName = response.Result.Name;
				this.getUserListForSelectedWeek();
			} else {
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
		})
	}

	getBySelectedWeekPlayerLeagueHeadSummary() {
		let sweek = null;
		this.week.forEach((x) => {
			if (x.Id == this.selectedWeekIdSummryQry) {
				sweek = x;
			}
		});
		this.selectedWeekId = sweek.Id;
		this.selectedWeekName = sweek.Name;
		this.getUserListForSelectedWeek();
	}

	selectWeek() {
		this.isBusy = true;
		action({
			message: "Select Week",
			cancelButtonText: "Cancel",
			actions: this.allWeeks
		}).then((result) => {
			if (result != "Cancel") {
				let sweek = null;
				this.week.forEach((x) => {
					if (x.Name == result) {
						//	this.isBusy = true;
						sweek = x;
					}
					else {
						//this.isBusy = false;
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
				this.getHeadToHeadSummaryGames(sweek.Id, sweek.Name);
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
		//	this.isBusy = false;
		//	console.log("check= " + JSON.stringify(this.week));
	}

	selectedPlayer1Label() {
		this.isBusy = true;
		action({
			message: "Select Week",
			cancelButtonText: "Cancel",
			actions: this.allPlayerListUserNames
		}).then((result) => {
			if (result != "Cancel") {
				let player = null;
				this.allPlayerList.forEach((x) => {
					if (x.UserName == result) {
						//	this.isBusy = true;
						player = x;
					}
					else {
						//	this.isBusy = false;
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
				this.getDataLeft(player.Id, player.UserName);
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
		//this.isBusy = false;
	}

	selectedPlayer2Label() {
		this.isBusy = true;
		action({
			message: "Select Week",
			cancelButtonText: "Cancel",
			actions: this.playerListUserNames
		}).then((result) => {
			if (result != "Cancel") {
				let player = null;
				this.allPlayerList.forEach((x) => {
					if (x.UserName == result) {
						//	this.isBusy = true;
						player = x;
					}
					else {
						//	this.isBusy = false;
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
				this.getDataRight(player.Id, player.UserName);

			} else {
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
		//	this.isBusy = false;
	}

	getHeadToHeadSummaryGames(selectedWeekId, selectedWeekName) {
		this.selectedWeekId = selectedWeekId;
		this.selectedWeekName = selectedWeekName;
		this.isRightTotal = false;
		this.isLeftTotal = false;
		this.leftLeagueScoreDetails = [];
		this.playerList = [];
		this.allPlayerList = [];
		this.defaultOppPlayer = {};
		this.selectedPlayer2 = {};
		this.selectedPlayer1 = {};
		this.getUserListForSelectedWeek();
	}

	getUserListForSelectedWeek() {
		this.playerListUserNames = [];
		this.headtoheadService.getUserListForSelectedWeek(this.leagueId).subscribe((response: any) => {
			if (response.ErrorMessage == null) {
				this.playerList = response.Result;
				this.playerList.forEach((item) => { this.playerListUserNames.push(item.UserName) });
				this.getAllUserListForSelectedWeek();
			} else {
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
		})
	}

	getDataRight(id, name) {
		this.selectedPlayer2Id = id;
		this.selectedPlayer2Name = name;
		this.leftLeagueScoreDetails = null;
		this.getRightSelectedPlayerScoreDetails(id);
		this.leftData = false;
		this.rightData = true;
		this.isLeftTotal = false;
		this.isRightTotal = false;
	}

	getDataLeft(id, name) {
		this.leftLeagueScoreDetails = [];
		this.selectedPlayer1Id = id;
		this.selectedPlayer1Name = name;
		this.getSelectedPlayerScoreDetails(id);
		this.leftData = true;
		this.rightData = false;
		this.isLeftTotal = false;
		this.isRightTotal = false;
	}

	getRightSelectedPlayerScoreDetails(userId) {
		if (this.selectedPlayer1Id > 0 && userId > 0) {
			this.headtoheadService.getSelectedPlayerScoreDetails(this.leagueId, this.selectedWeekId, this.selectedPlayer1Id, userId).subscribe((response: any) => {
				if (response.StatusCode == "200") {
					this.rightTotal = 0;
					this.leftTotal = 0;
					this.leftLeagueScoreDetails = null;

					this.leftLeagueScoreDetails = response.Result.filter((item) => {
						if (this.isGameStarted(item.LeagueGame.Game.StartDateTime)) {
							this.isBusy = false;
							return true;
						}
						else {
							this.isBusy = false;
							return false;
						}
					});
					this.leftLeagueScoreDetails.forEach((item) => {
						if (item.MyPick) this.isLeftTotal = true;
						if (item.OppPick) this.isRightTotal = true;
						if (item.MyPick && item.MyPick.Score != null) this.leftTotal += item.MyPick.Score;
						if (item.OppPick && item.OppPick.Score != null) this.rightTotal += item.OppPick.Score;
					});
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
		} else {
			alert({
				title: "Office Pick Em Pool",
				message: "No scores available for head to head.",
				okButtonText: "OK"
			});
			this.isBusy = false;
		}
	}

	getAllUserListForSelectedWeek() {
		this.allPlayerListUserNames = [];
		this.headtoheadService.getAllUserListForSelectedWeek(this.leagueId).subscribe((response: any) => {
			if (response.ErrorMessage == null) {
				this.allPlayerList = response.Result;
				this.allPlayerList.forEach((item) => {
					this.allPlayerListUserNames.push(item.UserName);
				});
				if (this.player1Id == "" || this.player2Id == "")
					this.geth2hOppPlayer();
				else
					this.geth2hTargetedPlayers();
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
		})
	}

	geth2hOppPlayer() {
		this.headtoheadService.geth2hOppPlayer(this.leagueId, this.selectedWeekId).subscribe((oppPlayer: any) => {
			if (oppPlayer.ErrorMessage == null) {
				this.defaultOppPlayer = oppPlayer.Result;
				//console.log("Third : " + JSON.stringify(oppPlayer.Result));
				this.selectedPlayer2 = this.defaultOppPlayer.Id;
				this.allPlayerList.forEach((item) => {
					if (this.userName == item.UserName) {
						this.selectedPlayer1 = item.Id;

						this.selectedPlayer1Id = item.Id;
						this.selectedPlayer1Name = item.UserName;


					}
					if (this.selectedPlayer2 == item.Id) {
						this.selectedPlayer2Name = item.UserName;
						this.selectedPlayer2Id = this.defaultOppPlayer.Id
						this.selectedPlayer2 = this.defaultOppPlayer.Id
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
				//console.log("UserName : " + this.selectedPlayer1Name);
				this.getSelectedPlayerScoreDetails(this.selectedPlayer1Id);
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
		})
	}

	getSelectedPlayerScoreDetails(userId) {
		if (this.selectedPlayer2Id > 0 && userId > 0) {
			this.headtoheadService.getSelectedPlayerScoreDetails(this.leagueId, this.selectedWeekId, userId, this.selectedPlayer2Id).subscribe((response: any) => {

				if (response.StatusCode == "200") {
					this.leftTotal = 0;
					this.rightTotal = 0;
					this.leftLeagueScoreDetails = [];
					this.leftLeagueScoreDetails = response.Result.filter((item) => {
						if (this.selectedPlayer1Name == this.userName) {
							if (!this.isGameStarted(item.LeagueGame.Game.StartDateTime)) {
								item.OppPick = null;
							}
							this.isBusy = false;
							return true;
						}
						else if (this.selectedPlayer1Name != this.userName && this.isGameStarted(item.LeagueGame.Game.StartDateTime)) {
							this.isBusy = false;
							return true;
						}
						else {
							this.isBusy = false;
							return false;
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
					this.leftLeagueScoreDetails.forEach((item) => {
						if (item.MyPick) this.isLeftTotal = true;
						if (item.OppPick) this.isRightTotal = true;
						if (item.MyPick && item.MyPick.Score != null) this.leftTotal += item.MyPick.Score;
						if (item.OppPick && item.OppPick.Score != null) this.rightTotal += item.OppPick.Score;
					})
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
			})
		}
		else {
			alert({
				title: "Office Pick Em Pool",
				message: "No scores available for head to head.",
				okButtonText: "OK"
			});
			this.isBusy = false;
		}
	}

	isGameStarted(startDate) {
		return this.makePickService.isGameStartedM(startDate);
	}

	geth2hTargetedPlayers() {
		this.selectedPlayer2 = this.player2Id;

		this.allPlayerList.forEach((item) => {
			if (this.player1Id == item.UserName) {
				this.selectedPlayer1 = item.Id;

				this.selectedPlayer1Id = item.Id;
				this.selectedPlayer1Name = item.UserName;
			}
			if (this.selectedPlayer2 == item.UserName) {
				this.selectedPlayer2Name = item.UserName;
				this.selectedPlayer2Id = item.Id;
				this.selectedPlayer2 = item;
			}
		});
		//console.log("teeat : " + JSON.stringify(this.allPlayerList[0]));
		this.getSelectedPlayerScoreDetails(this.selectedPlayer1Id);
	}
	onLabelLoaded(args: observable.EventData) {
		//console.log("bkjdvfdhvhf");
		const lbl = args.object as Label;
		if (isAndroid) {
			lbl.android.setGravity(17)
		}
	}
}