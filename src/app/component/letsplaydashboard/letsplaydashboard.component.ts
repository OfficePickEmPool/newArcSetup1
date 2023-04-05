import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
	selector: "Letsplaydashboard",
	moduleId: module.id,
	templateUrl: "./letsplaydashboard.component.html",
	styleUrls: ['./letsplaydashboard.component.css']
})
export class LetsplaydashboardComponent implements OnInit {
	glyphs = [];
	leaderIcon: string = "";
	homeIcon: string = "";
	headtoheadIcon: string = "";
	makeIcon: string = "";
	
	private _activatedUrl: string;


	constructor(private router: Router, private routerExtensions: RouterExtensions) {
		this._activatedUrl = this.router.url;

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
			if (element.code == "e921") {
				this.homeIcon = element.icon;
			}
		});
	}

	ngOnInit(): void {
		this.router.events
			.pipe(filter((event: any) => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
	}

	isComponentSelected(url: string): boolean {
		return this._activatedUrl === url;
	}
	onNavItemTap(navItemRoute: string): void {
		this.routerExtensions.navigate([navItemRoute], {
			transition: {
				name: "fade"
			},
			clearHistory: true
		});
	}
}