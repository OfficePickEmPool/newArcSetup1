import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class PlayoffService {
    constructor(private http: HttpClient, private appService: AppService) { }

    getPlayOffGraph(leagueId) {
        return this.http.get(this.appService.api_end_point + "api/me/player/leagues/" + leagueId + "/playOffGraph", { headers: this.appService.getHeaderWithToken() });
    }
}