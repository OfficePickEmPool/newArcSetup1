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
import { Router, ActivatedRoute } from "@angular/router";
import { HeadToHeadService } from "./../../shared/headtohead.service";
import { AppService } from "./../../shared/app.service";
import { MakePickService } from "./../../shared/makePick.service";
import { Label } from 'tns-core-modules/ui/label';
import observable = require("data/observable");

declare var android: any;
@Component({
	selector: "Makepick",
	moduleId: module.id,
	templateUrl: "./makepick.component.html",
	styleUrls: ['./makepick.component.css']
})
export class MakepickComponent implements OnInit {
	isBusy: boolean = true;
	leagueindex: number = null;

	protected images = [];
	private currentSlideNum: number = 0;
	private prevSlideNum: number = 0
	private slideCount = 3;
	selectedWeekName: string = "Select Week";
	selectedWeekId: number = 0;
	private screenWidth;
	private slidesView: GridLayout;
	countmax1: number = 0;
	countmax2: number = 0;
	countmax3: number = 0;
	glyphs = [];
	plusIcon: string = "";
	minusIcon: string = "";
	dialogOpen = false;
	leagueId: number = 0;
	hideSwipeBtn: boolean = true;
	headToheadleagueGames: any[] = [];
	isDisplayNavigation: boolean = false;
	leagueGames: any[] = [];
	output: any[] = [];
	firstGameOfWeek: number = 0;
	tieBreaker: TieBreaker = new TieBreaker();
	sortLeagueList(item) {
		var date = new Date(item.LeagueGame.Game.StartDateTime);
		return date;
	}


	@ViewChild('gridContain', { static: true }) gridContain: ElementRef;

	constructor(
		private page: Page,
		private nav: RouterExtensions,
		private route: Router,
		private headtoheadService: HeadToHeadService,
		private appService: AppService,
		private makePickService: MakePickService,
		private router: ActivatedRoute
	) {
		this.screenWidth = screen.mainScreen.widthDIPs;

	}

	makePickSummary() {
		this.route.navigate(['/makepicksummary/' + this.selectedWeekId]);
	}

	ngOnInit(): void {
		this.slidesView = this.gridContain.nativeElement;
		this.leagueindex = this.router.snapshot.params.index;
		if (this.leagueindex != null) {
			//console.log("index::" + this.leagueindex);
			this.currentSlideNum = this.leagueindex;
			this.prevSlideNum = this.leagueindex;
		}

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

		this.leagueId = this.appService.leagueDetails.LeagueId;
		this.makePickService.getCurrentWeekByPlayerLeague(this.leagueId).subscribe((response: any) => {
			if (response.ErrorMessage == null && response.Result != null) {
				this.selectedWeekId = response.Result.Id;
				this.selectedWeekName = response.Result.Name;
				this.hideSwipeBtn = false;
				if (response.Result.IsWeekStarted) {
					this.headtoheadService.getHTHLeagueGames(this.leagueId, this.selectedWeekId).subscribe((response1: any) => {
						if (response1.ErrorMessage == null) {
							this.headToheadleagueGames = response1.Result;
							if (this.headToheadleagueGames.length > 0) {
								this.getAllGamesPick();
							} else {
								alert({
									title: "Office Pick Em Pool",
									message: "You are one to the top seeds, therefore you have a bye for this week.",
									okButtonText: "OK"
								}).then((value) => {
									this.isBusy = false;
									this.route.navigate(["/letsplaydashboardhome"]);
								});
							}
						}
					}, (error) => {
						let er = this.appService.map(error, new ApiErrorResponce());

						alert({
							title: "Office Pick Em Pool",
							message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
							okButtonText: "OK"

						})
						this.isBusy = false;
					})
				}
			}
			else {
				this.isBusy = false;
			}
		}, (error) => {
			let er = this.appService.map(error, new ApiErrorResponce());
			alert({
				title: "Office Pick Em Pool",
				message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
				okButtonText: "OK"

			})
			this.isBusy = false;
		});


	}

	getAllGamesPick() {

		this.makePickService.getAllGamesPick(this.leagueId, this.selectedWeekId).subscribe((response: any) => {
			if (response.ErrorMessage == null) {
				this.isDisplayNavigation = true;
				this.leagueGames = response.Result;
				if (this.leagueGames.length > 0) {
					this.leagueGames.forEach((item) => { item.LeagueGame.Game.StartDateTime = new Date(item.LeagueGame.Game.StartDateTime) });
					this.slideCount = this.leagueGames.length;
					this.firstGameOfWeek = this.leagueGames[0].LeagueGameId;
					this.tieBreaker.SelectedTieBreaker = this.leagueGames[0].TieBreaker;
					this.setDefaultTieBreakerValues();
				} else {
					alert({
						title: "Office Pick Em Pool",
						message: "League Admin has not selected games for the week yet. Please check back later.",
						okButtonText: "OK"
					}).then((value) => {
						this.isBusy = false;
						this.route.navigate(["/letsplaydashboardhome"]);
					});

				}

			}
			else {
				this.isBusy = false;
			}
		}, (error) => {
			let er = this.appService.map(error, new ApiErrorResponce());

			alert({
				title: "Office Pick Em Pool",
				message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
				okButtonText: "OK"

			})
			this.isBusy = false;
		})

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

	setDefaultTieBreakerValues() {

		if (this.tieBreaker.SelectedTieBreaker != null) {
			var strTieBreaker = (this.tieBreaker.SelectedTieBreaker).toString();
			if (strTieBreaker.length == 1) {
				strTieBreaker = '0' + strTieBreaker;
			}

			for (var i = 0, len = strTieBreaker.length; i < len; i += 1) {
				this.output.push(+strTieBreaker.charAt(i));
			}

			if (this.output.length == 2) {
				if (this.output[0] != null) {
					this.countmax1 = this.output[0];
					if (isNaN(this.countmax1)) {
						this.countmax2 = 0;
					}
				} else {
					this.countmax1 = 0;
				}
				if (this.output[1] != null) {
					this.countmax2 = this.output[1];

					if (isNaN(this.countmax2)) {
						this.countmax2 = 0;
					}
				}
				else {
					this.countmax2 = 0;
					this.countmax3 = 0;
				}
				this.output = [];
			}
			else if (this.output.length == 3) {
				if (isNaN(this.output[1])) {
					this.countmax1 = 0;

				}

				if (this.output[0] != null) {
					this.countmax2 = this.output[0];

					if (isNaN(this.countmax2)) {
						this.countmax2 = 0;
					}

				}
				else {
					this.countmax2 = 0;
				}

				if (this.output[2] != null) {
					this.countmax3 = this.output[2];

					if (isNaN(this.countmax3)) {
						this.countmax3 = 0;
					}

				}
				else {
					this.countmax3 = 0;
				}

				this.output = [];
			}

			else if (this.output.length == 4) {
				if (this.output[0] != null) {
					this.countmax1 = this.output[0];


					if (isNaN(this.countmax1)) {
						this.countmax2 = 0;
					}

				}
				else {
					this.countmax1 = 0;
				}

				if (this.output[1] != null) {
					this.countmax2 = this.output[1];

					if (isNaN(this.countmax2)) {
						this.countmax2 = 0;
					}

				}
				else {
					this.countmax2 = 0;
				}

				if (this.output[3] != null) {
					this.countmax3 = this.output[3];

					if (isNaN(this.countmax3)) {
						this.countmax3 = 0;
					}

				}
				else {
					this.countmax3 = 0;
				}
				this.output = [];
			}

		} else {
			this.isBusy = false;
			this.countmax1 = 0;
			this.countmax2 = 0;
			this.countmax3 = 0;
			this.output = [];
		}
		this.tieBreaker.SelectedTieBreaker = this.countmax1 + '' + this.countmax2 + '.' + this.countmax3;
		this.isBusy = false;
	}

	selectGame(id, index) {
		//console.log("Tap : " + index);
		this.leagueGames[index].TeamId = id;
	}

	isGameStarted(startDate) {
		return this.makePickService.isGameStarted(startDate);
	}

	pickGame(item, isTieBreakerButton, index) {
		//console.log("start");
		if (!isTieBreakerButton) {
			this.setDefaultTieBreakerValues();
		}
		if (this.countmax1.toString() == 'NaN') {
			this.countmax1 = 0;
		}
		if (this.countmax2.toString() == 'NaN') {
			this.countmax2 = 0;
		}
		if (this.countmax3.toString() == 'NaN') {
			this.countmax3 = 0;
		}

		var mainTieBreaker = this.countmax1 + '' + this.countmax2 + '.' + this.countmax3;

		this.tieBreaker.SelectedTieBreaker = mainTieBreaker;
		if (this.firstGameOfWeek != item.LeagueGame.Id) {
			this.tieBreaker.SelectedTieBreaker = null;
		}

		this.makePickService.pickGame(item.LeagueGameId, item.TeamId, this.selectedWeekId, this.leagueId, this.tieBreaker.SelectedTieBreaker).subscribe((response: any) => {
			if (response.ErrorMessage == null) {
				alert({
					title: "Office Pick Em Pool",
					message: "Pick saved successfuly.",
					okButtonText: "OK"
				})

			} else {
				alert({
					title: "Office Pick Em Pool",
					message: response.ErrorMessage,
					okButtonText: "OK"
				})
			}
			this.tieBreaker.SelectedTieBreaker = mainTieBreaker;
			if (isTieBreakerButton) {
				if (this.leagueGames.length == 1) {
					this.route.navigate(["/makepicksummary" + this.selectedWeekId]);
				}
			} else {
				if (this.leagueGames.length == 1) {

				}
				else if (this.leagueGames.length == index + 1) {
					this.route.navigate(["/makepicksummary" + this.selectedWeekId]);
				}
			}
		}, (error) => {
			let er = this.appService.map(error, new ApiErrorResponce());

			alert({
				title: "Office Pick Em Pool",
				message: er.error != undefined && er.error != null ? er.error.ErrorMessage : "Unknown Error has been Occured",
				okButtonText: "OK"

			})
			this.isBusy = false;
		})
	}


	//---------------------------
	firstIncrementCount(fcount) {
		if (fcount < 9) {
			this.countmax1 = fcount + 1;
		}
	}

	firstDecrementCount(fcount) {
		if (fcount != 0) {
			this.countmax1 = fcount - 1;
		}
	}
	showPopupTeam() {
		this.dialogOpen = true;
	}
	closePopupTeam() {
		this.dialogOpen = false;
	}

	secondIncrementCount(scount) {
		if (scount < 9) {
			this.countmax2 = scount + 1;
		}
	}
	secondDecrementCount(scount) {
		if (scount != 0) {
			this.countmax2 = scount - 1;
		}
	}

	thirdIncrementCount(tcount) {
		if (tcount < 9) {
			this.countmax3 = tcount + 1;
		}
	}

	thirdDecrementCount(tcount) {
		if (tcount != 0) {
			this.countmax3 = tcount - 1;
		}
	}

	onSwipe(args: SwipeGestureEventData) {
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
			})
			.catch((e) => {
				//console.log(e.message);
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

class TieBreaker {
	allTieBreakerNumbers: any[] = [];
	SelectedTieBreaker: any = null;
}