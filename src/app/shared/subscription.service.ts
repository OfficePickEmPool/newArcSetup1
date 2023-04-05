import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./../modal/user";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class SubscriptionService {
    constructor(private http: HttpClient, private appService: AppService) { }

    getSubscriptionList() {
        return this.http.get(this.appService.api_end_point + "api/me/subscriptions", { headers: this.appService.getHeaderWithToken() });
    }

    getSubscriptionTypes() {
        return this.http.get(this.appService.api_end_point + "/api/me/subscriptionTypes", { headers: this.appService.getHeaderWithToken() });
    }

    proceedPayment(data: any) {
        return this.http.post(this.appService.api_end_point + "api/me/subscription", data, { headers: this.appService.getHeaderWithToken() });
    }
    isValidOrganizerSubscription() {
        return this.http.get(this.appService.api_end_point + "api/me/subscriptions/isValidOrganizer", { headers: this.appService.getHeaderWithToken() });
    }
    isValidPlayerSubscription() {
        return this.http.get(this.appService.api_end_point + "api/me/subscriptions/isValidPlayer", { headers: this.appService.getHeaderWithToken() });
    }
}