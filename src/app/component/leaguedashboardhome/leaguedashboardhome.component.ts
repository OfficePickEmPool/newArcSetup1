import { ItemEventData } from "tns-core-modules/ui/list-view"
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "Leaguedashboardhome",
	moduleId: module.id,
	templateUrl: "./leaguedashboardhome.component.html",
	styleUrls: ['./leaguedashboardhome.component.css']
})
export class LeaguedashboardhomeComponent implements OnInit {
	glyphs = [];
	insIcon: string = "";
	scheduleIcon: string = "";
	scoreIcon: string = "";
	noteIcon: string = "";
	viewIcon: string = "";
	viewruleIcon: string = "";
	inviteIcon: string = "";

	constructor() {
		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}


		this.glyphs.forEach((element) => {
			if (element.code == "ea08") {
				this.insIcon = element.icon;
			}
			if (element.code == "e953") {
				this.scheduleIcon = element.icon;
			}
			if (element.code == "e941") {
				this.scoreIcon = element.icon;
			}
			if (element.code == "e91f") {
				this.noteIcon = element.icon;
			}
			if (element.code == "e9ce") {
				this.viewIcon = element.icon;
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