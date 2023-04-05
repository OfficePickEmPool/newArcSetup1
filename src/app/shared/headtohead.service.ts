import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class HeadToHeadService {
    constructor(private http: HttpClient, private appService: AppService) { }

    getWeeksByPlayerLeague(leagueId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/weeks", { headers: this.appService.getHeaderWithToken() });
    }

    getHTHLeagueGames(leagueId, weekId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/weeks/" + weekId + "/h2h", { headers: this.appService.getHeaderWithToken() });
    }

    getUserListForSelectedWeek(leagueId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/players", { headers: this.appService.getHeaderWithToken() });
    }

    getAllUserListForSelectedWeek(leagueId) {
        return this.http.get(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/players", { headers: this.appService.getHeaderWithToken() });
    }

    geth2hOppPlayer(leagueId, weekId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/weeks/" + weekId + "/h2hOppPlayer", { headers: this.appService.getHeaderWithToken() });
    }

    getSelectedPlayerScoreDetails(leagueId, weekId, userId, oppUserId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/weeks/" + weekId + "/h2h/" + userId + "/vs/" + oppUserId, { headers: this.appService.getHeaderWithToken() });
    }

}