import { Component, OnInit } from "@angular/core";

@Component({
	selector: "Leagueorganizerrules",
	moduleId: module.id,
	templateUrl: "./leagueorganizerrules.component.html",
	styleUrls: ['./leagueorganizerrules.component.css']
})
export class LeagueorganizerrulesComponent implements OnInit {
	htmlString: string = ' <ol>' +
		'' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Once the games are available for your to choose, go into Edit Schedules, and select all the games that you want your league to be able to choose from.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;After a game has ended, you must go into Edit Scores, and enter the final game score to allow players to accumulate their points.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;After the last score has been entered, you MUST select “end Week” to allow the leaderboards to be updated and players to accumulate their win / loss for the week.</big></li>' +

		'' +
		'                    </ol>';
	constructor() {
	}

	ngOnInit(): void {
	}
}