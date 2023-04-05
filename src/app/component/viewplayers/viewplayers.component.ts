import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../shared/app.service";
import { ViewPlayersService } from "./../../shared/viewplayers.service";
import { Router } from "@angular/router";
import observable = require("data/observable");
import { TextView } from "tns-core-modules/ui/text-view";
import { User } from "./../../modal/user";
import { ViewPlayerModel, ViewPlayer } from "./../../modal/viewplayer";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';

@Component({
	selector: "Viewplayers",
	moduleId: module.id,
	templateUrl: "./viewplayers.component.html",
	styleUrls: ['./viewplayers.component.css']
})
export class ViewplayersComponent implements OnInit {
	isBusy: boolean = true;
	screenHeight: number;

	leagueId: number = this.appService.leagueDetails.getLeagueId();
	playersList = new Array<User>();
	constructor(private viewplayersService: ViewPlayersService, private appService: AppService, private route: Router) {
	}
	loadingviewplayersTap(): void {

		this.viewplayersService.getPlayerList(this.leagueId).subscribe((responce: Response) => {
			if (responce.ok != undefined && responce.ok == false) return;
			if (responce.hasOwnProperty("ErrorMessage")) {
				let responce1 = this.appService.map(responce, new UserResponce());
				this.playersList = this.appService.mapCollection(responce1.Result, new Array<User>());
				//console.log(responce1.Result);
				this.isBusy = false;
			}
			else {
				alert({
					title: "Office Pick Em Pool",
					message: "Players not available."
				});
				this.isBusy = false;
			}
		}, (error) => {
			alert({
				message: "Unable to load player list."
			});
			this.isBusy = false;
		})
	}
	//set player details globally in app service
	setPlayerDetail(ply) {
		ply.From = this.appService.userDetails.Email;
		this.appService.viewplayers.setplayerEmailBodyFactory(ply);
		this.isBusy = false;
		this.route.navigate(['/sendemailtoplayer/']);
	}
	ngOnInit(): void {
		this.screenHeight = this.appService.screenInformation.heightPixels;
		this.loadingviewplayersTap();
	}
	onLabelLoaded(args: observable.EventData) {
		//console.log("bkjdvfdhvhf");
		const lbl = args.object as Label;
		if (isAndroid) {
			lbl.android.setGravity(17)
		}
	}
}
class UserResponce {
	constructor() {

	}
	Version: string = "";
	StatusCode: string = "";
	ErrorMessage: string = "";
	Result: object = {};

}