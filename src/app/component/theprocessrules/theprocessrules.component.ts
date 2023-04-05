import { Component, OnInit } from "@angular/core";

@Component({
	selector: "Theprocessrules",
	moduleId: module.id,
	templateUrl: "./theprocessrules.component.html",
	styleUrls: ['./theprocessrules.component.css']
})
export class TheprocessrulesComponent implements OnInit {
	htmlString: string = '<ol>' +
		'' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Each week, your league admin will make a group of games visible to pick winners from.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Once the week is started, each player can go in to the app, and easily select your winners.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;The first game of every week, you will choose a total combined score, which will only be used in the case of a tiebreaker.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;There are no spreads to cover, however there will be an underdog and favorite.  More points are awarded for picking a correct underdog.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Points are awarded as follows: 1 point for a correct favorite, 1.75 for a correct underdog.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Each week, you are randomly paired up head to head with another player. If you score more points you will get the win. If your score less, then you will get a loss.  A tie, will utilize the tiebreaker.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;You will be gathering wins and losses and be able to see your standing as compared to others in your division. </big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;At the end of the regular season, the division winners and highest wildcards will make the single elimination playoff bracket.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;At the end of the single game elimination bracket, the champion will be awarded at the conclusion of the Superbowl.</big></li>' +
		'' +
		'                    </ol>';
	constructor() {
	}

	ngOnInit(): void {
	}
}