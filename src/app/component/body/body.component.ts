import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, Input } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Page } from "tns-core-modules/ui/page";
import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { isAndroid, isIOS } from "tns-core-modules/platform";
import * as appSettings from "tns-core-modules/application-settings";
import { Router } from "@angular/router"
import { AppService } from "./../../shared/app.service";
import { Location } from '@angular/common';

@Component({
	selector: "Body",
	moduleId: module.id,
	templateUrl: "./body.component.html",
	styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

	private _currentLocation: SideDrawerLocation;
	private userName: string = appSettings.getString("userName");
	glyphs = [];
	menuIcon: string = "";

	@Input() IsVisibleBackButton: string = 'visible';

	constructor(private page: Page, private _changeDetectionRef: ChangeDetectorRef, private route: Router, private appService: AppService, private location: Location) {
		this.page.on("loaded", this.onLoaded, this);

		for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
			let glyph = {
				icon: String.fromCharCode(charCode),
				code: charCode.toString(16)
			};
			this.glyphs.push(glyph);
		}


		this.glyphs.forEach((element) => {
			if (element.code == "e9bd") {
				this.menuIcon = element.icon;
			}


		});
	}

	public onLoaded() {
		if (this.drawer.android) {
			this.drawer.android.setDrawerCloseThreshold(20);
		}
	}

	ngOnInit() {
		this.currentLocation = SideDrawerLocation.Right;
	}

	@ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
	private drawer: RadSideDrawer;

	ngAfterViewInit() {
		this.drawer = this.drawerComponent.sideDrawer;
		this._changeDetectionRef.detectChanges();
	}

	get currentLocation(): SideDrawerLocation {
		return this._currentLocation;
	}

	set currentLocation(value: SideDrawerLocation) {
		this._currentLocation = value;
	}

	get isManageLeageDashBord() {
		return this.appService.leagueDetails.LeagueId != null && this.appService.leagueDetails.LeagueId != undefined ? this.appService.isManageLeagueDashBord : null;
	}
	public openDrawer() {
		this.drawer.toggleDrawerState();
	}

	public onCloseDrawerTap() {
		this.drawer.closeDrawer();
	}

	isAndroid(): boolean {
		return isAndroid;
	}

	logout() {
		appSettings.remove("userName");
		appSettings.remove("tokenKey");
		this.route.navigate(["/login"]);
	}

	goback() {
		this.location.back();
	}
}