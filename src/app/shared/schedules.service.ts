import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./../modal/user";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class SchedulesService {
    constructor(private http: HttpClient, private appService: AppService) { }

    getWeeksForAdmin(leagueId) {
        return this.http.get(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/weeks", { headers: this.appService.getHeaderWithToken() });
    }

    getCurrentWeekByPlayerLeagueForAdmin(leagueId) {
        return this.http.get(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/currentWeek", { headers: this.appService.getHeaderWithToken() });
    }

    saveSelectedGameForWeek(leagueId, weekId, selectedGameId) {
        return this.http.post(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/weeks/" + weekId + "/allGames", { GameIds: selectedGameId }, { headers: this.appService.getHeaderWithToken() });
    }

    getAllGames(leagueId, weekId) {
        return this.http.get(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/weeks/" + weekId + "/allGames", { headers: this.appService.getHeaderWithToken() });
    }

}