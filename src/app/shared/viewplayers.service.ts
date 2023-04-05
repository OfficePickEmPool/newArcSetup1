import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class ViewPlayersService {

    constructor(private http: HttpClient, private appService: AppService) { }


    getPlayerList(leagueId: number) {

        return this.http.get(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId + "/players", { headers: this.appService.getHeaderWithToken() })
    }

    sendEmailToPlayer(id: number, subject: string, body: string, leagueId: number) {
        var data = {
            Subject: subject,
            Body: body
        };

        return this.http.post(this.appService.api_end_point + "api/me/organizer/leagues/" + leagueId.toString() + "/contactPlayer/" + id.toString(), data, { headers: this.appService.getHeaderWithToken() })
    }
}