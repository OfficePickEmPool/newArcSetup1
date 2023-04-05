import { Component, OnInit } from "@angular/core";

@Component({
	selector: "Logisticsofapprules",
	moduleId: module.id,
	templateUrl: "./logisticsofapprules.component.html",
	styleUrls: ['./logisticsofapprules.component.css']
})
export class LogisticsofapprulesComponent implements OnInit {

	htmlString: string = '<ol>' +
		'' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Depending on the number of players who have joined, everyone will be randomly broken into divisions.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;A random schedule will be generated to determine your opponent each week.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Division winners receive automatic berths into the playoffs.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;There are wildcard spots available if you have enough wins to clinch one.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Playoffs Pick Em is executed the same way as the regular season with the exception of being a single elimination bracket.  You win, you move on, you lose, you go home.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;You can select your winners up to the game start time, then the game is locked.</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Once the games starts, you will be able to see your opponents pick. </big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;In the case of a tie, the total combined score will be used as a tiebreaker.  The closest to the total, will get the not (you are encouraged to use decimals to help break ties).</big></li>' +
		'                        <li style="font-size:17px; font-family:sans-serif;color:#4d4d4d;"><big>&nbsp;Note:  League standings will not change until each week is over.</big></li>' +

		'' +
		'                    </ol>';
	constructor() {
	}

	ngOnInit(): void {
	}
}