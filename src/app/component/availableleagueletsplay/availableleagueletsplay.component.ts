import { Component, OnInit } from "@angular/core";
import { LeagueModel, LeagueDetails } from "./../../modal/leagueDetails";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { LeagueService } from "./../../shared/league.service";
import { NotesService } from "./../../shared/notes.service";
import { AppService } from "./../../shared/app.service";
import { Router } from "@angular/router";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { SubscriptionService } from "./../../shared/subscription.service";
import { ApiSuccessResponce } from "./../../modal/apisuccessresponce";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';
import observable = require("data/observable");

@Component({
	selector: "Availableleagueletsplay",
	moduleId: module.id,
	templateUrl: "./availableleagueletsplay.component.html",
	styleUrls: ['./availableleagueletsplay.component.css']
})
export class AvailableleagueletsplayComponent implements OnInit {
	isBusy: boolean = true;
	screenHeight: number;

	public realLeague: ObservableArray<LeagueModel> = new ObservableArray<LeagueModel>();
	public tempLeague: ObservableArray<LeagueModel> = new ObservableArray<LeagueModel>();
	glyphs = [];
	addIcon: string = "";

	constructor(private appservice: AppService, private subscriptionService: SubscriptionService, private leagueService: LeagueService, private notesService: NotesService, private appService: AppService, private route: Router) {
		this.leagueService.getJoinedLeagueList().subscribe((response: Response) => {
			if (response.hasOwnProperty("ErrorMessage")) {
				let responce1 = this.appService.map(response, new ApiSuccessResponce());
				let leaguedata = JSON.stringify(responce1.Result);
				this.realLeague = <ObservableArray<LeagueModel>>JSON.parse(leaguedata);
				this.tempLeague = <ObservableArray<LeagueModel>>JSON.parse(leaguedata);
			} else {
				this.isBusy = false;
				//console.log("Error :" + response);
			}
		}, (error) => { this.isBusy = false; })
	}

	ngOnInit(): void {
		this.screenHeight = this.appService.screenInformation.heightPixels;
		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}


		this.glyphs.forEach((element) => {
			if (element.code == "ea0a") {
				this.addIcon = element.icon;
			}

		});
		this.isBusy = false;
		this.appService.isManageLeagueDashBord = false;
		this.appService.leagueDetails = new LeagueDetails();
		//console.log("1 Lets Play");
	}
	//search bar 
	public onTextChanged(args) {
		let searchBar = <SearchBar>args.object == undefined ? null : <SearchBar>args.object;
		if (searchBar != null && searchBar.text != undefined && searchBar.text != null) {
			let searchValue = searchBar.text.toLowerCase();
			this.realLeague = new ObservableArray<LeagueModel>();
			if (searchValue !== "") {
				for (let i = 0; i < this.tempLeague.length; i++) {
					if (this.tempLeague[i].Name.toLowerCase().indexOf(searchValue) !== -1) {
						this.realLeague.push(this.tempLeague[i]);
					}
				}
			}
			else {
				this.isBusy = false;
			}
		} else {
			this.isBusy = false;
		}

		this.isBusy = false;
	}
	// clear search bar
	public onClear(args) {
		this.realLeague = new ObservableArray<LeagueModel>();
		this.tempLeague.forEach(item => {
			this.realLeague.push(item);
		});
	}

	//set league details globally in app service
	setLeagueDetails(league) {
		this.isBusy = true;
		this.appService.leagueDetails.setleagueDetails(league);

		this.notesService.hasNewNotice(league.Id).subscribe((response: Response) => {
			if (response.hasOwnProperty("ErrorMessage")) {
				let responce1 = this.appService.map(response, new ApiSuccessResponce());
				let setNewNotice = JSON.parse(responce1.Result);
				if (setNewNotice) {
					this.isBusy = false;
					this.route.navigate(["/letsplaydashboardhome"]);
				} else {
					this.isBusy = false;
					this.route.navigate(["/letsplaydashboardhome"]);
				}

			} else {
				//console.log("Error :" + response);
				this.isBusy = false;
			}
		}, (error) => { this.isBusy = false; })
	}

	isValidPlayerSubscription() {
		this.isBusy = true;
		this.subscriptionService.isValidPlayerSubscription().subscribe((response) => {
			if (response.hasOwnProperty("ErrorMessage")) {
				let data = this.appService.map(response, new ApiSuccessResponce());
				//console.log(data);
				if (data.StatusCode == "200") {
					if (data.Result) {
						this.isBusy = false;
						this.route.navigate(["/joinleague"]);
					} else {

						dialogs.confirm({
							title: "Office Pick Em Pool",
							message: "Please subscribe to proceed.",
							okButtonText: "Yes",
							cancelButtonText: "No"

						}).then(result => {
							if (result) {
								this.isBusy = false;
								this.route.navigate(["/subscribe"]);
							} else {
								this.isBusy = false;
								this.route.navigate(["/availableleagueletsplay"]);
							}

						});

					}
				} else { this.isBusy = false; }
			} else { this.isBusy = false; }
		}, (error) => { this.isBusy = false; });
	}
	onLabelLoaded(args: observable.EventData) {
		const lbl = args.object as Label;
		if (isAndroid) {
			lbl.android.setGravity(17)
		}
	}
}