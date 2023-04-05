import { ItemEventData } from "tns-core-modules/ui/list-view";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-ui-autocomplete";
import { Component, OnInit } from "@angular/core";
import { LeagueService } from "./../../shared/league.service";
import { AppService } from "./../../shared/app.service";
import { Router } from "@angular/router";
import { LeagueModel, LeagueDetails } from "./../../modal/leagueDetails";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';
import observable = require("data/observable");

@Component({
    selector: "Availableleague",
    moduleId: module.id,
    templateUrl: "./availableleague.component.html",
    styleUrls: ['./availableleague.component.css']
})
export class AvailableleagueComponent implements OnInit {
    isBusy: boolean = true;
    screenHeight: number;

    leaguesDetails: LeagueDetails = new LeagueDetails();
    public realLeague: ObservableArray<LeagueModel> = new ObservableArray<LeagueModel>();
    public tempLeague: ObservableArray<LeagueModel> = new ObservableArray<LeagueModel>();

    glyphs = [];
    addIcon: string = "";

    // onItemTap(args: ItemEventData): void {
    //     console.log('Item with index: ' + args.index + ' tapped');
    // }
    searchPhrase: string;
    // onSearchSubmit(args): void {
    //     let searchBar = <SearchBar>args.object;
    //     console.log("You are searching for " + searchBar.text);
    // }

    constructor(private appservice: AppService, private leagueService: LeagueService, private appService: AppService, private route: Router) {

        this.leagueService.getLeagueDetail().subscribe((responce: Response) => {
            if (responce.hasOwnProperty("ErrorMessage")) {
                let responce1 = this.appService.map(responce, new LeagueResponce());
                let leaguedata = JSON.stringify(responce1.Result);
                this.realLeague = <ObservableArray<LeagueModel>>JSON.parse(leaguedata);
                this.tempLeague = <ObservableArray<LeagueModel>>JSON.parse(leaguedata);
                this.isBusy = false;
            } else {
                //console.log("Error :" + responce);
                this.isBusy = false;
            }
        }, (error) => {
            this.isBusy = false;
        })

    }
    ngOnInit(): void {
        this.screenHeight = this.appService.screenInformation.heightPixels;
        for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
            let glyph = {
                icon: String.fromCharCode(charCode),
                code: charCode.toString(16)
            };
            this.glyphs.push(glyph);
        }


        this.glyphs.forEach((element) => {
            if (element.code == "ea0a") {
                this.addIcon = element.icon;
            }

        });
        this.appService.isManageLeagueDashBord = true;
        this.appService.leagueDetails = new LeagueDetails();
        //console.log("Manage League");
    }
    //search bar    
    public onTextChanged(args) {
        this.isBusy = true;
        let searchBar = <SearchBar>args.object == undefined ? null : <SearchBar>args.object;
        if (searchBar != null && searchBar.text != undefined && searchBar.text != null) {
            let searchValue = searchBar.text.toLowerCase();
            this.realLeague = new ObservableArray<LeagueModel>();
            if (searchValue !== "") {
                for (let i = 0; i < this.tempLeague.length; i++) {
                    if (this.tempLeague[i].Name.toLowerCase().indexOf(searchValue) !== -1) {
                        this.realLeague.push(this.tempLeague[i]);
                    }
                }
            }
        }

        this.isBusy = false;
    }
    // clear search bar
    public onClear(args) {
        this.isBusy = true;
        this.realLeague = new ObservableArray<LeagueModel>();

        this.tempLeague.forEach(item => {
            this.realLeague.push(item);
        });
        this.isBusy = false;
    }

    //set league details globally in app service
    setLeagueDetails(league) {
        this.appService.leagueDetails.setleagueDetails(league);
        this.isBusy = false;
        this.route.navigate(['/leaguedashboardhome/']);
    }
    onLabelLoaded(args: observable.EventData) {
        const lbl = args.object as Label;
        if (isAndroid) {
            lbl.android.setGravity(17)
        }
    }
}
class LeagueResponce {
    constructor() {
    }
    Version: string = "";
    StatusCode: string = "";
    ErrorMessage: string = "";
    Result: object = {};

}