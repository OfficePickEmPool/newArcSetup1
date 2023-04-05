import { ItemEventData } from "tns-core-modules/ui/list-view"
import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../shared/app.service";
import { MakePickService } from "./../../shared/makePick.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiErrorResponce } from "./../../modal/apierrorresponce";
import { ApiSuccessCollectionResponce } from "./../../modal/apisuccesscollectionresponce";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';
import observable = require("data/observable");

@Component({
    selector: "Makepicksummary",
    moduleId: module.id,
    templateUrl: "./makepicksummary.component.html",
    styleUrls: ['./makepicksummary.component.css']
})
export class MakepicksummaryComponent implements OnInit {
    isBusy: boolean = false;
    screenHeight: number;
    selectedWeekName: string;
    selectedWeekId: number;
    leagueGames: any[] = [];

    onItemTap(args: ItemEventData): void {
        // console.log('Item with index: ' + args.index + ' tapped');
    }

    constructor(private makePickService: MakePickService, private appService: AppService, private route: Router, private router: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getCurrentWeekDetails();
        this.screenHeight = this.appService.screenInformation.heightPixels;
        this.selectedWeekId = this.router.snapshot.params.weekId;
        this.getAllGamesPick();

    }

    isGameStarted(startDate) {
        // console.log("=>: " + this.makePickService.isGameStarted(startDate));
        return this.makePickService.isGameStarted(startDate);
    }
    updateSlider(leaID, index) {
        this.isBusy = false;
        this.route.navigate(['/makepick/' + index]);
    }

    getAllGamesPick() {
        this.isBusy = true;
        let leagueId = this.appService.leagueDetails.LeagueId;
        this.makePickService.getAllGamesPick(leagueId, this.selectedWeekId).subscribe((response: any) => {
            this.leagueGames = response.Result;
            this.isBusy = false;
        })
    }

    onLabelLoaded(args: observable.EventData) {
        //console.log("bkjdvfdhvhf");
        const lbl = args.object as Label;
        if (isAndroid) {
            lbl.android.setGravity(17)
        }
    }
    getCurrentWeekDetails() {
        let leagueId = this.appService.leagueDetails.LeagueId;
        this.makePickService.getCurrentWeekByPlayerLeague(leagueId).subscribe((response: any) => {
            if (response.ErrorMessage == null && response.Result != null) {
                // this.selectedWeekId = response.Result.Id;
                this.selectedWeekName = response.Result.Name;
            }
        });
    }
}
