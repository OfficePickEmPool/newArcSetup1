import { Component, OnInit } from "@angular/core";
import { NotesService } from "./../../shared/notes.service";
import { AppService } from "./../../shared/app.service";
import { Router } from "@angular/router";
import observable = require("data/observable");
import { TextView } from "tns-core-modules/ui/text-view";

@Component({
	selector: "Notes",
	moduleId: module.id,
	templateUrl: "./notes.component.html",
	styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
	isBusy: boolean = true;

	start: number = 1;
	allNotice: string = "";
	public isEnabled = false;
	leagueId: number = this.appService.leagueDetails.getLeagueId();
	leagueName: string = this.appService.leagueDetails.getLeagueName();
	leaguePassword: string = this.appService.leagueDetails.getleaguePassword();
	constructor(private notesService: NotesService, private appService: AppService, private route: Router) {
	}

	private somethingChanged(): void {
		//	this.isBusy = true;

		if (this.start == 0) {

			this.isEnabled = true;
			//	this.isBusy = false;
			return;
		}
		else if (this.start == 1) {
			this.isEnabled = false;
			//console.log("Inside");
			this.start = 0;
			//	this.isBusy = false;
			return;
		}

	}

	onNotesSaveBtnTap(): void {
		this.isEnabled = true;

		this.notesService.saveNotice(this.allNotice, this.leagueId, this.leagueName, this.leaguePassword).subscribe((data: Response) => {
			if (data.ok != undefined && data.ok == false) {
				this.isBusy = false;
				return;
			}
			if (data.hasOwnProperty("ErrorMessage")) {
				//console.log(JSON.stringify(data));
				this.appService.leagueDetails.setleagueNotice(this.allNotice);
				this.isBusy = false;
				this.isEnabled = false;
				// alert({
				// 	message: "Notice updated successfully."
				// });
			} else {
				//console.log("Error :" + data);
				alert({
					message: "Unable to update notice."
				});

				this.isBusy = false;
			}
		}, (error) => {
			alert({
				message: "Unable to update notice."
			});
			this.isBusy = false;
		})
	}

	ngOnInit(): void {
		this.allNotice = this.appService.leagueDetails.getleagueNotice();
		this.isEnabled = false;
		this.isBusy = false;

	}

}
class NotesResponce {
	constructor() {
	}
	Version: string = "";
	StatusCode: string = "";
	ErrorMessage: string = "";
	Result: object = {};

}
