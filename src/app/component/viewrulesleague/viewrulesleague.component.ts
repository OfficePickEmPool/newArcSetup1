import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Router } from "@angular/router";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';
import observable = require("data/observable");

@Component({
	selector: "Viewrulesleague",
	moduleId: module.id,
	templateUrl: "./viewrulesleague.component.html",
	styleUrls: ['./viewrulesleague.component.css']
})


export class ViewrulesleagueComponent implements OnInit {
	rules: { name: string }[] = [
		{ name: "League Organizer Rules" },
		{ name: "FAQ" },
	];

	constructor(private route: Router) {

	}

	ngOnInit(): void {
	}

	onItemTap(args: ItemEventData): void {
		if (args.index == 0) {
			this.route.navigate(['leagueorganizerrules']);

		}
		if (args.index == 1) {
			this.route.navigate(['faq']);
		}

	}
	onLabelLoaded(args: observable.EventData) {
		//console.log("bkjdvfdhvhf");
		const lbl = args.object as Label;
		if (isAndroid) {
			lbl.android.setGravity(17)
		}
	}
}
