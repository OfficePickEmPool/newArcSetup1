import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class StatisticsService {
    constructor(private http: HttpClient, private appService: AppService) { }

    pickedGame(leagueId, weekId, leagueGameId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/weeks/" + weekId + "/pickGame/" + leagueGameId, { headers: this.appService.getHeaderWithToken() });
    }

    getGameStatisticsByLeagueGameId(leagueId, weekId, leagueGameId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/weeks/" + weekId + "/statistics/" + leagueGameId, { headers: this.appService.getHeaderWithToken() });
    }

}