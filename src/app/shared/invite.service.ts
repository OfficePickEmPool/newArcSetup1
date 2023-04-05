import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./../modal/user";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class InviteService {
    constructor(private http: HttpClient, private appService: AppService) { }

    sendInvitation(invitePlayerAndFriendEmail: string, leagueId: number) {

        if (invitePlayerAndFriendEmail != "") {
            //return this.http.post(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/invite", '"' + invitePlayerAndFriendEmail + '"', { headers: this.appService.getHeaderWithToken() })
            return this.http.post(this.appService.api_end_point + "api/me/organizer/leagues/inviteNew", { Email: invitePlayerAndFriendEmail, LeagueId: leagueId }, { headers: this.appService.getHeaderWithToken() })
        }
        else {
            dialogs.alert({
                title: "failed",
                message: "Please Enter Email",
                okButtonText: "OK"
            });
        }
    }
}