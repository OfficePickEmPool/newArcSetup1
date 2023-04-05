import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./../modal/user";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class LeagueService {

    constructor(private http: HttpClient, private appService: AppService) { }

    getLeagueDetail() {
        return this.http.get(this.appService.api_end_point + "api/me/organizer/leagues", { headers: this.appService.getHeaderWithToken() });
    }
    createNewLeague(leagueName, leaguePassword, note) {
        var createNewLeagueViewModel = {
            Name: leagueName,
            Password: leaguePassword,
            Notes: note
        };
        //console.log(createNewLeagueViewModel);
        return this.http.post(this.appService.api_end_point + "api/me/organizer/leagues/create", createNewLeagueViewModel, { headers: this.appService.getHeaderWithToken() });
    }
    getJoinedLeagueList() {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues", { headers: this.appService.getHeaderWithToken() });
    }
    joinLeague(leagueName: string, leaguePassword: string) {
        var joinLeagueViewModel = {
            Name: leagueName,
            Password: leaguePassword
        };
        return this.http.post(this.appService.api_end_point + "api/me/player/leagues/join", joinLeagueViewModel, { headers: this.appService.getHeaderWithToken() })
    }
}