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
import { HeadToHeadService } from "./../../shared/headtohead.service";
import { AppService } from "./../../shared/app.service";
import { MakePickService } from "./../../shared/makePick.service";
import { StatisticsService } from "./../../shared/statistics.service";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { Label } from 'tns-core-modules/ui/label';
import observable = require("data/observable");

declare var android: any;

@Component({
	selector: "Statistics",
	moduleId: module.id,
	templateUrl: "./statistics.component.html",
	styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
	isBusy: boolean = true;

	protected images = [];
	private currentSlideNum: number = 0;
	private prevSlideNum: number = 0;
	private slideCount = 0;
	selectedWeekId: number = 0;
	selectedWeekName: string = "Select Week";
	leagueGames: any[] = [];
	WeeksByPlayerLeague = {};
	gameStatistics = [];
	hideSwipeBtn = true;
	isDisplayNavigation = true;
	countPopup = 0;
	isGameStartedCount = 0;
	gameWeek = {};
	week: any[] = [];
	private screenWidth;
	private slidesView: GridLayout;
	leagueId: number = 0;
	pickedTeamId: any[] = [];
	textweeks: Array<string> = new Array<string>();
	device: string = "";

	@ViewChild('gridContain', { static: true }) gridContain: ElementRef;


	constructor(
		private page: Page,
		private nav: RouterExtensions,
		private headtoheadService: HeadToHeadService,
		private appService: AppService,
		private makePickService: MakePickService,
		private statisticsService: StatisticsService
	) {
		this.screenWidth = screen.mainScreen.widthDIPs;

		// // Span the background under status bar on Android
		// if (isAndroid && device.sdkVersion >= '21') {
		// var View = android.view.View;
		// var window = app.android.startActivity.getWindow();
		// window.setStatusBarColor(0x000000);

		// var decorView = window.getDecorView();
		// decorView.setSystemUiVisibility(
		// View.SYSTEM_UI_FLAG_LAYOUT_STABLE
		// | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
		// | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
		// | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
		// }
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
			this.isBusy = false;
			return;
		}
		const currSlide = this.slidesView.getChildAt(this.prevSlideNum);
		const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);
		this.animate(currSlide, nextSlide, direction);
	}

	ngOnInit(): void {
		this.device = this.appService.deviceInformation.os;
		this.page.actionBarHidden = false;
		this.slidesView = this.gridContain.nativeElement;
		this.leagueId = this.appService.leagueDetails.LeagueId;
		this.headtoheadService.getWeeksByPlayerLeague(this.leagueId).subscribe((responce: any) => {
			if (responce.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(responce, new ApiSuccessCollectionResponce());
				if (data.StatusCode = "200") {
					this.week = data.Result;
					if (this.week.length > 0) {
						this.week.forEach((item) => this.textweeks.push(item.Name));
						this.isBusy = false;
						this.getCurrentWeekByPlayerLeague();
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
		})
	}

	getCurrentWeekByPlayerLeague() {
		this.isBusy = true;
		this.makePickService.getCurrentWeekByPlayerLeague(this.leagueId).subscribe((response: any) => {
			if (response.ErrorMessage == null && response.Result != null) {
				this.selectedWeekName = response.Result.Name;
				this.selectedWeekId = response.Result.Id;
				this.hideSwipeBtn = false;
				this.getAllGamesPick();

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
		this.selectedWeekId = selectedWeekId;
		this.selectedWeekName = selectedWeekName;
		this.getAllGamesPick();
	}

	getAllGamesPick() {
		this.makePickService.getAllGamesPick(this.leagueId, this.selectedWeekId).subscribe((response: any) => {
			if (response.ErrorMessage == null) {
				this.leagueGames = response.Result;
				this.isDisplayNavigation = true;
				this.gameStatistics = [];
				var leagueGamesSize = this.leagueGames.length;
				var cntLoop = 0;
				this.hideSwipeBtn = false;
				if (this.leagueGames.length > 0) {
					this.leagueGames.forEach((item) => {
						if (this.makePickService.isGameStartedM(item.LeagueGame.Game.StartDateTime)) {
							this.statisticsService.pickedGame(this.leagueId, this.selectedWeekId, item.LeagueGameId).subscribe((responsePikedGame: any) => {
								if (responsePikedGame.ErrorMessage == null) {
									this.statisticsService.getGameStatisticsByLeagueGameId(this.leagueId, this.selectedWeekId, item.LeagueGameId).subscribe((response1: any) => {
										if (response1.ErrorMessage == null) {
											this.hideSwipeBtn = false;
											cntLoop++;
											this.pickedTeamId.push(responsePikedGame.Result);
											this.gameStatistics.push(response1.Result);
											this.gameStatistics.forEach((item) => { item.Game.StartDateTime = new Date(item.Game.StartDateTime) });
											this.slideCount = this.gameStatistics.length;
											this.pickedTeamId = this.pickedTeamId.sort((a, b) => {
												this.isBusy = false;
												return <any>new Date(b.LeagueGame.Game.StartDateTime) - <any>new Date(a.LeagueGame.Game.StartDateTime)
											})
											this.gameStatistics = this.gameStatistics.sort((a, b) => {
												this.isBusy = false;
												return <any>new Date(b.Game.StartDateTime) - <any>new Date(a.Game.StartDateTime)
											})

											if (cntLoop == leagueGamesSize && this.gameStatistics.length <= 0) {

												this.isStaticsticAvaiable();

											}
										}
									})
								}
								else {
									cntLoop++;
									if (cntLoop == leagueGamesSize && this.gameStatistics.length <= 0) {
										this.isStaticsticAvaiable();
										this.hideSwipeBtn = true;
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
							this.isGameStartedCount++;
						} else {
							if (this.isGameStartedCount < 1) {
								this.hideSwipeBtn = true;

								this.countPopup++;

								if (this.countPopup <= 1) {
									alert({
										title: "Office Pick Em Pool",
										message: "No games available for statistics.",
										okButtonText: "OK"
									});
								}

							}
							this.isBusy = false;
						}

					});
					this.countPopup = 0;
					this.isGameStartedCount = 0;
				} else {
					this.hideSwipeBtn = true;
					alert({
						title: "Office Pick Em Pool",
						message: "No games available for statistics.",
						okButtonText: "OK"
					});
					this.isBusy = false;
				}
			} else {
				this.hideSwipeBtn = true;
				alert({
					title: "Office Pick Em Pool",
					message: "No games available for statistics.",
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

	isStaticsticAvaiable() {
		if (this.gameStatistics.length <= 0) {
			this.hideSwipeBtn = true;
			alert({
				title: "Office Pick Em Pool",
				message: "No games available for statistics.",
				okButtonText: "OK"
			});
			this.isBusy = false;
		}
	}

	onSwipe(args: SwipeGestureEventData) {
		//this.isBusy = true;
		this.prevSlideNum = this.currentSlideNum;
		let count = this.slideCount;
		if (args.direction == 2) {
			this.currentSlideNum = (this.currentSlideNum + 1) % count;
		} else if (args.direction == 1) {
			this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
		} else {
			// We are interested in left and right directions
			this.isBusy = false;
			return;
		}
		const currSlide = this.slidesView.getChildAt(this.prevSlideNum);
		const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);

		this.animate(currSlide, nextSlide, args.direction);
	}

	animate(currSlide, nextSlide, direction) {
		nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
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
		this.isBusy = true;
		action({
			message: "Select Week",
			cancelButtonText: "Cancel",
			actions: this.textweeks
		}).then((result) => {
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