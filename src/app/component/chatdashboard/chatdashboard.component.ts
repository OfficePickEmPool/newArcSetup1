import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
	selector: "Chatdashboard",
	moduleId: module.id,
	templateUrl: "./chatdashboard.component.html",
	styleUrls: ['./chatdashboard.component.css']
})
export class ChatdashboardComponent implements OnInit {
	private _activatedUrl: string;
	glyphs = [];
	homeIcon: string = "";
	newchatIcon: string = "";
	constructor(private router: Router, private routerExtensions: RouterExtensions) {
		this._activatedUrl = this.router.url;
	}



	ngOnInit(): void {
		this.router.events
			.pipe(filter((event: any) => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}


		this.glyphs.forEach((element) => {
			if (element.code == "e96c") {
				this.homeIcon = element.icon;
			}
			if (element.code == "e972") {
				this.newchatIcon = element.icon;
			}
		});
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