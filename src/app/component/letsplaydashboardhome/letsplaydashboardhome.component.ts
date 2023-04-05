import { ItemEventData } from "tns-core-modules/ui/list-view"
import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../shared/app.service";

@Component({
	selector: "Letsplaydashboardhome",
	moduleId: module.id,
	templateUrl: "./letsplaydashboardhome.component.html",
	styleUrls: ['./letsplaydashboardhome.component.css']
})
export class LetsplaydashboardhomeComponent implements OnInit {
	glyphs = [];
	makeIcon: string = "";
	headtoheadIcon: string = "";
	leaderIcon: string = "";
	statIcon: string = "";
	noticeIcon: string = "";
	viewruleIcon: string = "";
	inviteIcon: string = "";
	screenWidth: number;
	screenHeight: number;

	constructor(private appService: AppService) {
		this.screenHeight = this.appService.screenInformation.heightPixels;;
		this.screenWidth = this.appService.screenInformation.widthPixels;

		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}


		this.glyphs.forEach((element) => {
			if (element.code == "ea2d") {
				this.makeIcon = element.icon;
			}
			if (element.code == "e98c") {
				this.headtoheadIcon = element.icon;
			}
			if (element.code == "e99e") {
				this.leaderIcon = element.icon;
			}
			if (element.code == "e9d4") {
				this.statIcon = element.icon;
			}
			if (element.code == "ea0c") {
				this.noticeIcon = element.icon;
			}
			if (element.code == "eae0") {
				this.viewruleIcon = element.icon;
			}
			if (element.code == "e972") {
				this.inviteIcon = element.icon;
			}
		});
	}

	ngOnInit(): void {
	}
}