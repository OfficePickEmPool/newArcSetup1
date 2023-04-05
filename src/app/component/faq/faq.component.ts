import { Component, OnInit } from "@angular/core";

@Component({
	selector: "Faq",
	moduleId: module.id,
	templateUrl: "./faq.component.html",
	styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
	public categoryData: Array<any> = [];
	public clickedArray: Array<any> = [];

	constructor() {
		this.categoryData = [
			{
				category: 'What if I am tied with another player at the end of regular season?',
				categorydetails:
					'<ol>' +
					'' +
					'<li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;The first tiebreaker is head to head.  If you beat that user head to head, then you will advance over that player<br></li>' +
					'<li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;The second tiebreaker is the total combined scores for the year used on the first game of each week.  The closest to the actual number will advance.  For example:  If the total combined score of the game is 36 points and you pick 30, that is a delta of 6.  If your opponent picks 27 for the total score, that is a delta of 9.  You would advance.<br></li>' +
					'</li>' +
					'' +
					'</ol><br>' +
					''
			},
			{
				category: 'What if I miss the deadline for making my pick?',
				categorydetails: '<span style="font-family:sans-serif; color:#4d4d4d;">Unfortunately, and to be fair, if you miss picking before game start, you will get zero points for that game.  Any games that have not started yet, can still be picked.<br><br></span>'
			},
			{
				category: 'If I miss a game, can I still pick others?',
				categorydetails: '<span style="font-family:sans-serif; color:#4d4d4d;">Yes.  As long as a game has not started, you can still pick a winner for that game.<br><br></span>'
			}
		]
	}
	clicked(country) {
		if (this.clickedArray.indexOf(country) != -1) {
			var index = this.clickedArray.indexOf(country)
			this.clickedArray.splice(index, 1)
		} else {
			this.clickedArray.push(country)
		}
	}

	btnMore() {
		const utilityModule = require("utils/utils");
		utilityModule.openUrl("http://www.officepickempool.com/Faq");
	}
	ngOnInit(): void {
	}
}