import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";
import { Page, ContentView } from "ui/page";
import { SwipeGestureEventData } from "ui/gestures/gestures";
import { GridLayout, GridUnitType, ItemSpec } from "ui/layouts/grid-layout";
import { AnimationDefinition, Animation } from 'ui/animation';
import { screen, isAndroid, device } from "platform";
import { RouterExtensions } from "nativescript-angular/router";
import { Router } from "@angular/router"
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import * as app from "application";
import * as fs from "file-system";
import * as builder from "ui/builder";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { HeadToHeadService } from "./../../shared/headtohead.service";
import { AppService } from "./../../shared/app.service";
import { MakePickService } from "./../../shared/makePick.service";
import { Label } from 'tns-core-modules/ui/label';
import observable = require("data/observable");

declare var android: any;

@Component({
	selector: "Headtohead",
	moduleId: module.id,
	templateUrl: "./headtohead.component.html",
	styleUrls: ['./headtohead.component.css']
})
export class HeadtoheadComponent implements OnInit {
	isBusy: boolean = true;

	protected images = [];
	private prevSlideNum: number = 0;
	private currentSlideNum: number = 0;
	private slideCount = 3;
	selectedWeekId: number = 0;
	selectedWeekName: string = "Select Week";
	private screenWidth;
	private slidesView: GridLayout;
	leagueId: number = 0;
	week: any[] = [];
	textweeks: Array<string> = new Array<string>();
	completedGames: any[] = [];
	rightPickedTeam: any[] = [];
	leftPickedTeam: any[] = [];
	hideSwipeBtn = true;
	isTeam1Display = false;
	isTeam2Display = false;
	leftGamePickedSummary: any = {};
	rightGamePickedSummary: any = {};
	isHeadtoHeadAvailable: boolean = false;


	@ViewChild('gridContain', { static: true }) gridContain: ElementRef;

	constructor(
		private page: Page,
		private nav: RouterExtensions,
		private headtoheadService: HeadToHeadService,
		private route: Router,
		private appService: AppService,
		private makePickService: MakePickService
	) {
		this.screenWidth = screen.mainScreen.widthDIPs;

		// // Span the background under status bar on Android
		// if (isAndroid && device.sdkVersion >= '21') {
		// 	var View = android.view.View;
		// 	var window = app.android.startActivity.getWindow();
		// 	window.setStatusBarColor(0x000000);

		// 	var decorView = window.getDecorView();
		// 	decorView.setSystemUiVisibility(
		// 		View.SYSTEM_UI_FLAG_LAYOUT_STABLE
		// 		| View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
		// 		| View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
		// 		| View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
		// }
	}

	ngOnInit(): void {
		console.log("1");
		this.isBusy = true;
		this.slidesView = this.gridContain.nativeElement;
		this.leagueId = this.appService.leagueDetails.LeagueId;
		this.headtoheadService.getWeeksByPlayerLeague(this.leagueId).subscribe((responce: any) => {
			if (responce.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(responce, new ApiSuccessCollectionResponce());
				if (data.StatusCode = "200") {
					this.week = data.Result;
					if (this.week.length > 0) {
						this.week.forEach((item) => this.textweeks.push(item.Name));
						this.hideSwipeBtn = true;
						this.getCurrentWeekByPlayerLeague();
					} else {
						alert({
							title: "Office Pick Em Pool",
							message: "No games have been picked yet for head to head.",
							okButtonText: "OK"
						})
						this.isBusy = false;
					}
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
		})
	}

	getCurrentWeekByPlayerLeague() {
		this.isBusy = true;
		//console.log("2");
		this.makePickService.getCurrentWeekByPlayerLeague(this.leagueId).subscribe((response: any) => {
			this.isBusy = true;
			if (response.ErrorMessage == null && response.Result != null) {
				this.selectedWeekId = response.Result.Id;
				this.selectedWeekName = response.Result.Name;

				this.getHTHLeagueGames();

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

	skipIntro(direction) {
		//	console.log("3");
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

	isGameStarted(startDate) {
		return this.makePickService.isGameStartedM(startDate);
	}

	getGames(selectedWeekId, selectedWeekName) {
		this.isBusy = true;
		//console.log("4");
		//console.log("start ID : " + selectedWeekId + " Name " + selectedWeekName);
		this.selectedWeekId = selectedWeekId;
		this.selectedWeekName = selectedWeekName;
		this.prevSlideNum = 0;
		this.currentSlideNum = 0;
		this.getHTHLeagueGames();
		this.isBusy = true;
	}

	getHTHLeagueGames() {
		this.isBusy = true;
		console.log("5");
		this.headtoheadService.getHTHLeagueGames(this.leagueId, this.selectedWeekId).subscribe((response: any) => {
			if (response.ErrorMessage == null) {
				this.hideSwipeBtn = false;
				let leagueGames = [];
				this.completedGames = [];
				leagueGames = response.Result;
				if (leagueGames.length <= 0) {
					this.hideSwipeBtn = true;
					alert({
						title: "Office Pick Em Pool",
						message: "No games have been picked yet for head to head.",
						okButtonText: "OK"
					}).then((value) => {
						this.isBusy = false;
						this.route.navigate(["/letsplaydashboardhome"]);
					});
				}
				else {
					leagueGames = leagueGames.sort((a, b) => {
						this.isBusy = false;
						return <any>new Date(b.LeagueGame.Game.StartDateTime) - <any>new Date(a.LeagueGame.Game.StartDateTime)
					});
					leagueGames.forEach((item) => {
						this.hideSwipeBtn = false;
						this.isTeam1Display = true;
						this.isTeam2Display = true;
						this.leftGamePickedSummary = {};
						this.rightGamePickedSummary = {};
						let isBoth = false;
						let isLeft = false;
						let isRight = false;
						if (item.MyPick != null) {
							if (item.LeagueGame.Game.Team1.Id == item.MyPick.Picked.Id) {
								var tmp = false;
								if (item.OppPick != null) {
									if (item.LeagueGame.Game.Team1.Id == item.OppPick.Picked.Id) {
										tmp = true;
									}
								}
								if (tmp == true) {
									this.leftGamePickedSummary = { MyPicked: false, OppPicked: false, BothPicked: true }
									this.leftPickedTeam.push(this.leftGamePickedSummary);
									this.isTeam1Display = false;
									isBoth = true;
									isLeft = true;
								}
							}
							if (item.LeagueGame.Game.Team2.Id == item.MyPick.Picked.Id && isBoth == false) {

								var tmp = false;
								if (item.OppPick != null) {
									if (item.LeagueGame.Game.Team2.Id == item.OppPick.Picked.Id) {
										tmp = true;
									}
								}
								if (tmp == true) {
									this.rightGamePickedSummary = { MyPicked: false, OppPicked: false, BothPicked: true }
									this.rightPickedTeam.push(this.rightGamePickedSummary);
									this.isTeam2Display = false;
									isRight = true
									isBoth = true;
								}
							}
							if (item.LeagueGame.Game.Team1.Id == item.MyPick.Picked.Id && isBoth == false) {
								this.leftGamePickedSummary = { MyPicked: true, OppPicked: false, BothPicked: false }
								this.leftPickedTeam.push(this.leftGamePickedSummary);
								isLeft = true;
							}
							if (item.LeagueGame.Game.Team1.Id != item.MyPick.Picked.Id && isBoth == false) {
								this.leftGamePickedSummary = { MyPicked: false, OppPicked: true, BothPicked: false }
								this.leftPickedTeam.push(this.leftGamePickedSummary);
								isLeft = true;
							}
							if (item.LeagueGame.Game.Team2.Id == item.MyPick.Picked.Id && isBoth == false) {
								this.rightGamePickedSummary = { MyPicked: true, OppPicked: false, BothPicked: false }
								this.rightPickedTeam.push(this.rightGamePickedSummary);
								isRight = true;
							}
							if (item.LeagueGame.Game.Team2.Id != item.MyPick.Picked.Id && isBoth == false) {
								this.rightGamePickedSummary = { MyPicked: false, OppPicked: true, BothPicked: false }
								this.rightPickedTeam.push(this.rightGamePickedSummary);
								isRight = true;
							}
							if (!isLeft) {
								this.leftGamePickedSummary = { MyPicked: false, OppPicked: false, BothPicked: false }
								this.leftPickedTeam.push(this.leftGamePickedSummary);

							} if (!isRight) {
								this.rightGamePickedSummary = { MyPicked: false, OppPicked: false, BothPicked: false }
								this.rightPickedTeam.push(this.rightGamePickedSummary);

							}
							this.completedGames.push(item);
							this.slideCount = this.completedGames.length;
							this.isBusy = false;
							return true;
						}
						else {
							this.isBusy = false;
							return false;
						}
					});
					this.slideCount = this.completedGames.length > 0 ? this.completedGames.length : 0;
				}
				if (this.rightPickedTeam.length <= 0 && this.leftPickedTeam.length <= 0) {
					this.isHeadtoHeadAvailable = false;
					this.hideSwipeBtn = true;
					alert({
						title: "Office Pick Em Pool",
						message: "No games have been picked yet for head to head.",
						okButtonText: "OK"
					});
					this.isBusy = false;
				}
				else {
					this.isHeadtoHeadAvailable = true;
					this.hideSwipeBtn = false;
				}

			}
			else {
				this.isHeadtoHeadAvailable = false;
				this.hideSwipeBtn = true;
				alert({
					title: "Office Pick Em Pool",
					message: "No games have been picked yet for head to head.",
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
		//console.log("6");
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
		//	console.log("7");
		//	this.isBusy = true;
		console.log(this.isBusy + "8");
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
				this.isBusy = false;
				// console.log("Animation finished");
			})
			.catch((e) => {
				this.isBusy = false;
				console.log(e.message);
			});

	}
	action() {
		//console.log("8");
		this.isBusy = true;
		let sweek = null;

		action({
			message: "Select Week",
			cancelButtonText: "Cancel",
			actions: this.textweeks
		}).then((result) => {

			if (result != "Cancel") {

				this.week.forEach((x) => {
					if (x.Name == result) {
						sweek = x;
					}
				});

				this.getGames(sweek.Id, sweek.Name);
			}
			else {
				this.isBusy = false;
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