import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-ui-autocomplete";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Instructions",
    moduleId: module.id,
    templateUrl: "./instructions.component.html",
    styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {


    htmlString: string = '<span style="font-size:19px; font-family:sans-serif; color:#4d4d4d;"><b><big><u>"League Player" Instructions</u></big></b></span> <br/>' +
        '                    <ol>' +
        '' +
        '                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Go to ‘Subscription’ and purchase an “Annual League Player” subscription.</big></li>' +
        '                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Go to “Let’s Play”</big></li>' +
        '                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Select “Join League” and type in the League Name and Password given to you by your League Organizer.</big></li>' +
        '                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Once the games of the week are loaded, by your organizer, select “Make Picks” and Good Luck!!</big></li>' +
        '' +
        '                    </ol><br>' +
        '' +
        '                    <span style="font-size:19px;font-family:sans-serif;color:#4d4d4d;"><b><big><u>"League Organizer" Instructions</u></big></b></span>' +
        '                    <ol class="orderedList1">' +
        '' +
        '                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Go to ‘Subscription’ and purchase an “Annual League Organizer” subscription.</big></li>' +
        '                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Go to “Manage Leagues”</big></li>' +
        '                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Go to “Create New League”</big></li>' +
        '                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Go back to “Manage Leagues” or “Let’s Play” and select the newly created League to enter app.</big></li>' +
        '                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Begin inviting friends until you get at least 9 more Players.</big></li>' +
        '                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;NOTE: See further instructions under “Manage Leagues” to learn your role as an Organizer. </big></li>' +
        '' +
        '                    </ol>';




    constructor() {
    }

    ngOnInit(): void {
    }
}