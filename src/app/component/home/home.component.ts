import { ItemEventData } from "tns-core-modules/ui/list-view"
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Page } from "tns-core-modules/ui/page";
import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import * as appSettings from "tns-core-modules/application-settings";
import { SubscriptionService } from "./../../shared/subscription.service";
import { AppService } from "./../../shared/app.service";
import { ApiSuccessResponce } from "./../../modal/apisuccessresponce";
import { Router } from "@angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { LeagueModel, LeagueDetails } from "./../../modal/leagueDetails";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    userName: string = appSettings.getString("userName");
    glyphs = [];
    playIcon: string = "";
    subscriptionIcon: string = "";
    settingIcon: string = "";
    constructor(private subscriptionService: SubscriptionService, private appService: AppService, private route: Router) {
        for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
            let glyph = {
                icon: String.fromCharCode(charCode),
                code: charCode.toString(16)
            };
            this.glyphs.push(glyph);
        }


        this.glyphs.forEach((element) => {
            if (element.code == "e9a5") {
                this.playIcon = element.icon;
            }
            if (element.code == "e93f") {
                this.subscriptionIcon = element.icon;
            }
            if (element.code == "e994") {
                this.settingIcon = element.icon;
            }

        });
    }

    onTapManageLeagues() {
        this.subscriptionService.isValidOrganizerSubscription().subscribe((response) => {
            if (response.hasOwnProperty("ErrorMessage")) {
                let data = this.appService.map(response, new ApiSuccessResponce());
                if (data.StatusCode == "200") {
                    if (data.Result) {
                        this.route.navigate(["/availableleague"]);
                    } else {
                        dialogs.confirm({
                            title: "Office Pick Em Pool",
                            message: "Please subscribe to proceed.",
                            okButtonText: "Yes",
                            cancelButtonText: "No"

                        }).then(result => {
                            if (result) {
                                this.route.navigate(["/subscribe"]);
                            } else {
                                this.route.navigate(["/home"]);
                            }

                        });
                        this.route.navigate(["/subscription"]);
                    }
                }
            }
        });
    }

    ngOnInit() {
        //console.log("Home");
        this.appService.leagueDetails = new LeagueDetails();
    }
}