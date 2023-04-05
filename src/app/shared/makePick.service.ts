import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./../modal/user";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class MakePickService {
    constructor(private http: HttpClient, private appService: AppService) { }

    isGameStarted(date) {
        var seletedDate = new Date(date);
        var currentDate = new Date();
        if (seletedDate < currentDate) {
            return true;
        } else {
            return false;
        }
    }

    isGameStartedM(date) {
        if (this.appService.isApplyDateConstraint) {
            var seletedDate = new Date(date);
            var currentDate = new Date();
            if (seletedDate < currentDate) {
                return true;
            } else {
                return false;
            }
        }
        else {
            return true;
        }
    }

    getAllGamesPick(leagueId, weekId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/weeks/" + weekId + "/allGamesPick", { headers: this.appService.getHeaderWithToken() });
    }

    getCurrentWeekByPlayerLeague(leagueId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/currentWeek", { headers: this.appService.getHeaderWithToken() });
    }

    pickGame(leagueGameId, selectedTeamId, leagueId, weekId, tieBreaker) {
        var pickData = {};
        if (tieBreaker) {
            pickData = {
                LeagueGameId: leagueGameId,
                SelectedTeamId: selectedTeamId,
                TieBreaker: tieBreaker
            };
        } else {
            pickData = {
                LeagueGameId: leagueGameId,
                SelectedTeamId: selectedTeamId
            };
        }
        //console.log(pickData);
        return this.http.post(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/weeks/" + weekId + "/pickGame", pickData, { headers: this.appService.getHeaderWithToken() });
    }
    getLeagueGames(leagueId, weekId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/weeks/" + weekId + "/games", { headers: this.appService.getHeaderWithToken() });
    }
}