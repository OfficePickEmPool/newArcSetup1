import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { Router } from "@angular/router";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';
import observable = require("data/observable");

@Component({
	selector: "Viewrulesletsplay",
	moduleId: module.id,
	templateUrl: "./viewrulesletsplay.component.html",
	styleUrls: ['./viewrulesletsplay.component.css']
})
export class ViewrulesletsplayComponent implements OnInit {
	rules: { name: string }[] = [
		{ name: "The Process" },
		{ name: "Logistics of App" },
		{ name: "Quick Menus" },
		{ name: "FAQ" }
	];

	constructor(private route: Router) {

	}

	ngOnInit(): void {
	}

	onItemTap(args: ItemEventData): void {
		if (args.index == 0) {
			this.route.navigate(['theprocessrules']);
		}
		else if (args.index == 1) {
			this.route.navigate(['logisticsofapprules']);
		}
		else if (args.index == 2) {
			this.route.navigate(['quickmenurules']);

		}
		else if (args.index == 3) {
			this.route.navigate(['faqletsplay']);
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