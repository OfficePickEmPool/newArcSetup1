import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./../modal/user";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class LeaderService {

    constructor(private http: HttpClient, private appService: AppService) { }

    getDevisionList(leagueId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/divisions", { headers: this.appService.getHeaderWithToken() });
    }

    getCurrentDevision(leagueId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/currentDivision", { headers: this.appService.getHeaderWithToken() });
    }

    getScoreCard(leagueId, divisionId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/divisions/" + divisionId + "/scoreboard", { headers: this.appService.getHeaderWithToken() });
    }

}