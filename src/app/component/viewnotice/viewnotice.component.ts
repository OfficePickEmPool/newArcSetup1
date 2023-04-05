import { Component, OnInit } from "@angular/core";
import { NotesService } from "./../../shared/notes.service";
import { AppService } from "./../../shared/app.service";
import { Router } from "@angular/router";
import observable = require("data/observable");
import { TextView } from "tns-core-modules/ui/text-view";

@Component({
	selector: "Viewnotice",
	moduleId: module.id,
	templateUrl: "./viewnotice.component.html",
	styleUrls: ['./viewnotice.component.css']
})
export class ViewnoticeComponent implements OnInit {
	isBusy: boolean = true;
	allNotice: string;

	constructor(private notesService: NotesService, private appService: AppService, private route: Router) {
	}

	ngOnInit(): void {
		this.isBusy = false;
		this.allNotice = this.appService.leagueDetails.getleagueNotice();
	}
}