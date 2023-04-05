import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";
import { Page, ContentView } from "ui/page";
import { SwipeGestureEventData } from "ui/gestures/gestures";
import { GridLayout, GridUnitType, ItemSpec } from "ui/layouts/grid-layout";
import { AnimationDefinition, Animation } from 'ui/animation';
import { screen, isAndroid, device } from "platform";
import { RouterExtensions } from "nativescript-angular/router";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import * as app from "application";
import * as fs from "file-system";
import * as builder from "ui/builder";
import { SchedulesService } from "./../../shared/schedules.service";
import { AppService } from "./../../shared/app.service";
import { ScoreService } from "./../../shared/score.service";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { MakePickService } from "./../../shared/makePick.service";
import { Label } from 'tns-core-modules/ui/label';
import observable = require("data/observable");

declare var android: any;

@Component({
	selector: "Scores",
	moduleId: module.id,
	templateUrl: "./scores.component.html",
	styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
	onButtonTap(): void {
		//console.log("Button was pressed");
	}
	isBusy: boolean = true;

	protected images = [];
	gameIndex: number = 0;
	leagueId: number = 0;
	private currentSlideNum: number = 0;
	private prevSlideNum: number = 0;
	private slideCount = 3;
	textweek: string = "Select Week";
	private screenWidth;
	private slidesView: GridLayout;
	week: Array<any> = new Array<any>();
	textweeks: Array<string> = new Array<string>();
	hideSwipeBtn: boolean = true;
	selectedWeekId: number;
	selectedWeekName: string = "Select Week";
	seletedLeagueGames: any[] = [];
	selectedLastGameId = null;
	IsWeekEnded = false;
	seletedLeagueGamesTeam1Score: any[] = [];
	seletedLeagueGamesTeam2Score: any[] = [];
	dialogOpen = false;
	seletedCurrentLeagueGames = null;
	selectedGameindex: number;
	countPointTeam1: number;
	countPointTeam2: number;
	glyphs = [];
	plusIcon: string = "";
	minusIcon: string = "";
	device: string = "";

	@ViewChild('gridContain', { static: true }) gridContain: ElementRef;

	constructor(
		private page: Page,
		private schedulesService: SchedulesService,
		private appService: AppService,
		private scoreService: ScoreService,
		private nav: RouterExtensions,
		private makePickService: MakePickService
	) {
		this.screenWidth = screen.mainScreen.widthDIPs;

	}
	isGameStarted(startDate) {
		return this.makePickService.isGameStartedM(startDate);
	}

	ngOnInit(): void {
		this.device = this.appService.deviceInformation.os;
		this.isBusy = true;
		this.page.actionBarHidden = false;
		this.slidesView = this.gridContain.nativeElement;
		this.leagueId = this.appService.leagueDetails.LeagueId;
		this.schedulesService.getWeeksForAdmin(this.leagueId).subscribe((responce: any) => {
			if (responce.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(responce, new ApiSuccessCollectionResponce());
				if (data.StatusCode = "200") {
					this.week = data.Result;
					if (this.week.length > 0) {
						this.week.forEach((item) => this.textweeks.push(item.Name));
						this.getCurrentWeekByPlayerLeague();
						this.isBusy = false;
					} else {
						this.isBusy = false;
					}
				}
				else {
					this.isBusy = false;
				}
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
		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}


		this.glyphs.forEach((element) => {
			if (element.code == "ea0a") {
				this.plusIcon = element.icon;
			}
			if (element.code == "ea0b") {
				this.minusIcon = element.icon;
			}
		});
	}
	skipIntro(direction) {
		//	this.isBusy = true;
		this.prevSlideNum = this.currentSlideNum;
		let count = this.slideCount;
		if (direction == 2) {
			this.currentSlideNum = (this.currentSlideNum + 1) % count;
		} else if (direction == 1) {
			this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
		} else {
			// We are interested in left and right directions
			return;
		}
		const currSlide = this.slidesView.getChildAt(this.prevSlideNum);
		const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);
		this.animate(currSlide, nextSlide, direction);
	}

	showPopupTeam(score, i) {
		if (this.IsWeekEnded != true) {
			this.seletedCurrentLeagueGames = score;
			this.selectedGameindex = i;
			this.countPointTeam1 = score.Team1Score;
			this.countPointTeam2 = score.Team2Score;
			this.dialogOpen = true;
		}
	}
	increaseTeam1() {
		if (this.countPointTeam1 < 9) {
			this.countPointTeam1 = this.countPointTeam1 + 1;
			this.seletedCurrentLeagueGames.Team1Score = this.countPointTeam1;
			this.seletedLeagueGames[this.selectedGameindex] = this.seletedCurrentLeagueGames;
		}
	}
	decreaseTeam1() {
		if (this.countPointTeam1 != 0) {
			this.countPointTeam1 = this.countPointTeam1 - 1;
			this.seletedCurrentLeagueGames.Team1Score = this.countPointTeam1;
			this.seletedLeagueGames[this.selectedGameindex] = this.seletedCurrentLeagueGames;
		}
	}

	increaseTeam2() {
		if (this.countPointTeam2 < 9) {
			this.countPointTeam2 = this.countPointTeam2 + 1;
			this.seletedCurrentLeagueGames.Team2Score = this.countPointTeam2;
			this.seletedLeagueGames[this.selectedGameindex] = this.seletedCurrentLeagueGames;
		}
	}

	decreaseTeam2() {
		if (this.countPointTeam2 != 0) {
			this.countPointTeam2 = this.countPointTeam2 - 1;
			this.seletedCurrentLeagueGames.Team2Score = this.countPointTeam2;
			this.seletedLeagueGames[this.selectedGameindex] = this.seletedCurrentLeagueGames;
		}
	}

	closePopupTeam() {
		this.dialogOpen = false;
	}

	saveTeamScores(item) {
		this.isBusy = true;
		this.scoreService.saveTeamScores(this.leagueId, this.selectedWeekId, item).subscribe((response: any) => {
			if (response.ErrorMessage == null) {
				alert({
					title: "Office Pick Em Pool",
					message: "Scores saved successfully.",
					okButtonText: "OK"
				});
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

	getCurrentWeekByPlayerLeague() {
		this.isBusy = true;
		this.schedulesService.getCurrentWeekByPlayerLeagueForAdmin(this.leagueId).subscribe((responce: any) => {
			if (responce.ErrorMessage == null && responce.Result != null) {
				this.hideSwipeBtn = false;
				this.selectedWeekName = responce.Result.Name;
				this.selectedWeekId = responce.Result.Id;
				if (responce.IsWeekStarted) {
					this.getSeletedGames();
					this.isBusy = false;
				} else {
					this.hideSwipeBtn = true;
					alert({
						title: "Office Pick Em Pool",
						message: "No games available for edit score.",
						okButtonText: "OK"
					});
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
		})
	}

	getGames(selectedWeekId, selectedWeekName) {
		this.isBusy = true;
		this.selectedWeekId = selectedWeekId;
		this.selectedWeekName = selectedWeekName;
		this.selectedLastGameId = null;
		let week = this.getWeekById(this.selectedWeekId);
		if (week.IsWeekStarted) {
			this.hideSwipeBtn = false;
			this.getSeletedGames();
		}
		else {
			this.hideSwipeBtn = true;
			alert({
				title: "Office Pick Em Pool",
				message: "No games available for edit score.",
				okButtonText: "OK"
			});
			this.isBusy = false;
		}
	}

	getWeekById(id) {
		this.isBusy = true;
		let tempweek;
		if (this.week.length > 0) this.week.forEach((item) => { if (item.Id == id) tempweek = item });
		return tempweek;
	}

	getSeletedGames() {
		this.isBusy = true;
		this.scoreService.getSeletedGames(this.leagueId, this.selectedWeekId).subscribe((response: any) => {
			if (response.ErrorMessage == null) {
				this.hideSwipeBtn = false;
				this.seletedLeagueGames = response.Result;
				//console.log("Stop : " + this.seletedLeagueGames.length)
				if (this.seletedLeagueGames.length > 0) {
					this.slideCount = this.seletedLeagueGames.length;
					this.selectedLastGameId = this.seletedLeagueGames[this.seletedLeagueGames.length - 1].GameId;
					this.isWeekEndedCheck()
				} else {
					this.hideSwipeBtn = true;
					alert({
						title: "Office Pick Em Pool",
						message: "No games available for edit score.",
						okButtonText: "OK"
					});
					this.isBusy = false;
				}

			}
			else {
				this.hideSwipeBtn = true;
				alert({
					title: "Office Pick Em Pool",
					message: "No games available for edit score.",
					okButtonText: "OK"
				});
				this.isBusy = false;
				this.seletedLeagueGamesTeam1Score = [];
				this.seletedLeagueGamesTeam2Score = [];
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

	isWeekEndedCheck() {
		this.isBusy = true;
		this.scoreService.isWeekEndedCheck(this.leagueId, this.selectedWeekId).subscribe((response: any) => {
			if (response.ErrorMessage == null) {
				this.IsWeekEnded = response.Result;
				this.isBusy = false;
			}
			else {
				alert({
					title: "Office Pick Em Pool",
					message: "Error : " + response.ErrorMessage,
					okButtonText: "OK"
				});
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

	onSwipe(args: SwipeGestureEventData) {
		//	this.isBusy = true;
		this.prevSlideNum = this.currentSlideNum;
		let count = this.slideCount;
		if (args.direction == 2) {
			this.currentSlideNum = (this.currentSlideNum + 1) % count;
		} else if (args.direction == 1) {
			this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
		} else {
			// We are interested in left and right directions
			return;
		}
		const currSlide = this.slidesView.getChildAt(this.prevSlideNum);
		const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);
		this.animate(currSlide, nextSlide, args.direction);
	}

	animate(currSlide, nextSlide, direction) {
		//this.isBusy = true;
		//console.log(direction);
		nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
		nextSlide.opacity = 1;
		var definitions = new Array<AnimationDefinition>();
		var defn1: AnimationDefinition = {
			target: currSlide,
			translate: { x: (direction == 2 ? -this.screenWidth : this.screenWidth), y: 0 },
			duration: 500
		};
		definitions.push(defn1);

		var defn2: AnimationDefinition = {
			target: nextSlide,
			translate: { x: 0, y: 0 },
			duration: 500
		};
		definitions.push(defn2);

		var animationSet = new Animation(definitions);
		animationSet.play()
			.then(() => {
				// console.log("Animation finished");
				this.isBusy = false;
			})
			.catch((e) => {
				//console.log(e.message);
				this.isBusy = false;
			});
	}
	action() {
		action({
			message: "Select Week",
			cancelButtonText: "Cancel",
			actions: this.textweeks
		}).then((result) => {
			this.isBusy = true;
			if (result != "Cancel") {
				let sweek = null;
				this.week.forEach((x) => {
					if (x.Name == result) {
						sweek = x;
					}
				});
				this.prevSlideNum = 0;
				this.currentSlideNum = 0;
				this.getGames(sweek.Id, sweek.Name);
			}
		});
	}
	onLabelLoaded(args: observable.EventData) {
		//console.log("bkjdvfdhvhf");
		const lbl = args.object as Label;
		if (isAndroid) {
			lbl.android.setGravity(17)
		}
	}

}