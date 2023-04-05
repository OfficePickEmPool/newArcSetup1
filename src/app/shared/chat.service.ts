import { Injectable } from '@angular/core';
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Chat, UserModel, DeleteIds } from "./../modal/chat";
import { ChatModel } from "./../modal/chatModel";
import * as appSettings from "tns-core-modules/application-settings";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable()
export class ChatService {

    constructor(private http: HttpClient, private appService: AppService) { }
    getChatDetails() {
        return this.http.get(this.appService.api_end_point + "api/Chatdetails/getallchatdetails", { headers: this.appService.getHeaderWithToken() });
    }

    getGroupLists() {
        return this.http.get(this.appService.api_end_point + "api/Chatdetails/getgrouplist", { headers: this.appService.getHeaderWithToken() });
    }

    getAllUsers() {
        return this.http.get(this.appService.api_end_point + "api/Chatdetails/getalluserslist", { headers: this.appService.getHeaderWithToken() });
    }

    getChatUserList() {
        return this.http.get(this.appService.api_end_point + "api/Chatdetails/getchatuserlist", { headers: this.appService.getHeaderWithToken() });
    }

    getFullName(name: string) {
        var data = {
            Name: name
        };
        return this.http.post(this.appService.api_end_point + "api/Chatdetails/getfullname", data, { headers: this.appService.getHeaderWithToken() });
    }
    insertMessage(modelData: ChatModel) {

        return this.http.post(this.appService.api_end_point + "api/Chatdetails/sendmessagedetails", modelData, { headers: this.appService.getHeaderWithToken() });
    }

    deleteMessage(modelData: DeleteIds[]) {
        return this.http.post(this.appService.api_end_point + "api/Chatdetails/deletemessages", modelData, { headers: this.appService.getHeaderWithToken() });
    }
    //deleteuserchat
    deleteUserChat(modelData: UserModel[]) {
        return this.http.post(this.appService.api_end_point + "api/Chatdetails/deleteuserchat", modelData, { headers: this.appService.getHeaderWithToken() });
    }

    createMessage(modelData: ChatModel) {

        return this.http.post(this.appService.api_end_point + "api/Chatdetails/createmessagedetails", modelData, { headers: this.appService.getHeaderWithToken() });
    }
}