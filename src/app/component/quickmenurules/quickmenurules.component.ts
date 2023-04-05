import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { Component, OnInit } from "@angular/core";
import { WebView } from "tns-core-modules/ui/web-view";

@Component({
	selector: "Quickmenurules",
	moduleId: module.id,
	templateUrl: "./quickmenurules.component.html",
	styleUrls: ['./quickmenurules.component.css']
})
export class QuickmenurulesComponent implements OnInit {
	public data: Array<any> = [];

	public clickedArray: Array<any> = [];

	constructor() {
		this.data = [
			{
				category: 'Dashboard',
				categorydetails: '<span style="font-family:sans-serif; color:#4d4d4d;">Use this menu to return to the main app dashboard for most of your in app navigation.</span> <br/>',
			},
			{
				category: 'Make Pick',
				categorydetails: '<span style="font-family:sans-serif; color:#4d4d4d;">Go into this menu each week to select your choices for game winners.  Also, pick your tie breaking score (total combined points) on the first game of the week.  Save after each pick.  View Summary to see a list of all games and highlighted picks.</span> <br/>' +
					'<ol>' +
					'' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;Touch to highlight the team you choose to win</li>' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;Enter tiebreaking score for game one (total combined final score)</li>' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;Save Pick</li>' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;Select next winner and Save Pick</li>' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;Repeat for all games for the week</li>' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;Select ‘View Summary’ to ensure your picks are highlighted and saved</li>' +


					'' +
					'                    </ol>',

			},
			{
				category: 'Head to Head',
				categorydetails: '<span style="font-family:sans-serif; color:#4d4d4d;">Go into this menu to see your competition for the given week.  After the game start time expires, you can see your opponent’s pick for that game.  Also view the running tally of your performance (points) for the week along with your opponents.</span> <br/>' +
					'<ol>' +
					'' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;Swipe through to compare game by game to your opponent</li>' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;After the game ends, swipe game by game to see your points vs your opponents</li>' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;View Summary to see all picks and points to see who won the week</li>' +



					'' +
					'                    </ol>',
			}
			,
			{
				category: 'Leaderboard',
				categorydetails: '<span style="font-family:sans-serif; color:#4d4d4d;">Go into this menu to see the standings for the season.  See your win/loss record and where you sit in your standings.  Flip to all divisions to see how your division compares to others and how your friends in other divisions are faring.</span> <br/>' +
					'<ol>' +
					'' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;Use drop down to see other division standings</li>' +
					'                        <li style="font-family:sans-serif; color:#4d4d4d;">&nbsp;Select Playoffs to see the playoff bracket at season end</li>' +




					'' +
					'                    </ol>',
			}
			,
			{
				category: 'Statistics',
				categorydetails: '<span style="font-family:sans-serif; color:#4d4d4d;">Go into this menu to see specific matchups and the total picks made for each team.  You can also see the running list of which players selected each.  Look for more statistics to be available in version 2 of the app released next year.</span> <br/>'

			}
			,
			{
				category: 'View Notice',
				categorydetails: '<span style="font-family:sans-serif; color:#4d4d4d;">Go into this menu to see when your league admin has posted a message or important update for you to read.</span> <br/>'

			}
			,
			{
				category: 'Menu',
				categorydetails: '<span style="font-family:sans-serif; color:#4d4d4d;">Go to this menu for settings and contact information for your league admin and Pick Em Pool administration.  In addition, logout and invite friends to join from here.</span> <br/>'

			}
		]
	}

	ngOnInit(): void {
	}
	clicked(rule) {
		if (this.clickedArray.indexOf(rule) != -1) {
			var index = this.clickedArray.indexOf(rule)
			this.clickedArray.splice(index, 1)

		} else {
			this.clickedArray.push(rule)

		}
	}
}