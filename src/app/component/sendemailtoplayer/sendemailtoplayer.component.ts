import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../shared/app.service";
import { ViewPlayersService } from "./../../shared/viewplayers.service";
import { Router } from "@angular/router";
import observable = require("data/observable");
import { TextView } from "tns-core-modules/ui/text-view";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { User } from "./../../modal/user";
import { ViewPlayerModel, ViewPlayer } from "./../../modal/viewplayer";


@Component({
	selector: "Sendemailtoplayer",
	moduleId: module.id,
	templateUrl: "./sendemailtoplayer.component.html",
	styleUrls: ['./sendemailtoplayer.component.css']
})
export class SendemailtoplayerComponent implements OnInit {
	isBusy: boolean = true;

	leagueId: number = this.appService.leagueDetails.LeagueId;
	isEnabled = false;
	public UserName: string;
	public From: string;
	public To: string;
	public PlayerId: number;
	Subject: string = '';
	Body: string = '';
	constructor(private viewplayersService: ViewPlayersService, private appService: AppService, private route: Router) {
	}
	loadingSentMail(): void {

		var Emailto = this.appService.viewplayers;
		this.UserName = Emailto.UserName;
		this.From = Emailto.From;
		this.To = Emailto.To;
		this.PlayerId = Emailto.PlayerId;
		this.isBusy = false;
	}
	onEmailSentToBtnTap(): void {
		this.isBusy = true
		this.viewplayersService.sendEmailToPlayer(this.PlayerId, this.Subject, this.Body, this.leagueId).subscribe((data: Response) => {
			if (data.ok != undefined && data.ok == false) {
				this.isBusy = false;
				return;
			}
			if (data.hasOwnProperty("ErrorMessage")) {
				//console.log(JSON.stringify(data));

				alert({
					message: "Email successfully sent.",
					okButtonText: "OK"
				});

			} else {
				//console.log("Error :" + data);
				alert({
					message: "Email not sent.",
					okButtonText: "OK"
				});

			}
			this.isBusy = false;
		}, (error) => {

			alert({
				message: "Email not sent."
				,
				okButtonText: "OK"
			});
			this.isBusy = false;
		})
	}

	private somethingChangedOnBody(args): void {
		this.isBusy = true;
		let searchBar = <SearchBar>args.object == undefined ? null : <SearchBar>args.object;
		if (searchBar.text != "" && this.Subject != "") {
			this.isEnabled = true;
			this.isBusy = false;
			return;
		}
		else {
			this.isEnabled = false;
			this.isBusy = false;
			return;
		}
	}

	private somethingChangedOnSubject(args): void {
		this.isBusy = true;
		let searchBar = <SearchBar>args.object == undefined ? null : <SearchBar>args.object;
		if (searchBar.text != "" && this.Body != "") {
			this.isEnabled = true;
			this.isBusy = false;
			return;
		}
		else {
			this.isEnabled = false;
			this.isBusy = false;
			return;
		}
	}
	ngOnInit(): void {
		this.loadingSentMail();
	}
}