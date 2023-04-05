import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./../modal/user";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class ScoreService {
    constructor(private http: HttpClient, private appService: AppService) { }

    getSeletedGames(leagueId, weekId) {
        return this.http.get(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/weeks/" + weekId + "/selectedGames", { headers: this.appService.getHeaderWithToken() });
    }

    isWeekEndedCheck(leagueId, weekId) {
        return this.http.get(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/weeks/" + weekId + "/isWeekEnded", { headers: this.appService.getHeaderWithToken() });
    }

    saveTeamScores(leagueId, weekId, teamScoresDetail) {
        var data =
        {
            "Team1Score": teamScoresDetail.Team1Score,
            "Team2Score": teamScoresDetail.Team2Score,
            "IsTeam1Winner": "true",
            "IsTeam2Winner": "false"
        };
        return this.http.put(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/weeks/" + weekId + "/leagueGames/" + teamScoresDetail.Id, data, { headers: this.appService.getHeaderWithToken() });
    }
}