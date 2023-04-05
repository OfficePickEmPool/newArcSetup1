import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class NotesService {

    constructor(private http: HttpClient, private appService: AppService) { }


    saveNotice(allNotice: string, leagueId: number, leagueName: string, leaguePassword: string) {
        var data = {
            Name: leagueName,
            Password: leaguePassword,
            Notes: allNotice
        };
        return this.http.put(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId, data, { headers: this.appService.getHeaderWithToken() })
    }
    hasNewNotice(leagueId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/hasNewNotice", { headers: this.appService.getHeaderWithToken() });
    }
}