import { Component, OnInit } from "@angular/core";

@Component({
	selector: "Leagueinstructions",
	moduleId: module.id,
	templateUrl: "./leagueinstructions.component.html",
	styleUrls: ['./leagueinstructions.component.css']
})
export class LeagueinstructionsComponent implements OnInit {
	htmlContent: string = '<span style="font-size:19px; font-family:sans-serif; color:#4d4d4d;">CRITICAL: These actions below must be completed on a weekly and is what distributes the player points and standings.<br><br></span>' +
		'<span style="font-size:19px; font-family:sans-serif; color:#4d4d4d;"><b><big><u>How to be a “League Organizer”</u></big></b><br></span> <br/>' +
		'                    <ol>' +
		'' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Games will be loaded each week by Office Pick Em staff and available by Wednesdays.</big><br></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Go to “Edit Schedule” weekly after games are loaded, and select the games you would like to use and hit “Save Changes”.</big><br></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;As games end, go to “Edit Scores” and enter the scores of the games and “Save Changes”. (Do as often as you like).</big><br></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;CRITICAL: After the last game of the week’s score is entered, you MUST hit “End Week”.</big><br></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Repeat each week.<br><br>' +
		'<span style=" font-size:17px; text-decoration:underline;"><big>Important:</big></span>  Make sure that all game scores are correct before hitting “End Week”.  This action cannot be undone and distributes points and standings to the players.' +
		'</big></li>' +
		'' +
		'</ol><br>' +
		'';
		
	constructor() {
	}

	ngOnInit(): void {
	}
}