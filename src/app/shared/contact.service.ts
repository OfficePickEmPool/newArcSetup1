import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./../modal/user";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class ContactService {
    constructor(private http: HttpClient, private appService: AppService) { }

    sendcontactLeagueAdmin(leagueId, subject, message) {
        let contactLeagueAdminViewModel = {
            Subject: subject,
            Body: message
        };

        return this.http.post(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/contactOrganizer", contactLeagueAdminViewModel, { headers: this.appService.getHeaderWithToken() })
    }

    sendcontactOpem(leagueId, subject, message) {
        let contactOpemViewModel = {
            Subject: subject,
            Body: message
        };

        return this.http.post(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/contactSuperAdmin", contactOpemViewModel, { headers: this.appService.getHeaderWithToken() })
    }
}