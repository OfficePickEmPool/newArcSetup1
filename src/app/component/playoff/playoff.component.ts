import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../shared/app.service";
import { PlayoffService } from "./../../shared/playoff.service";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import { Router, ActivatedRoute } from "@angular/router";
import { Label } from 'tns-core-modules/ui/label';
import { isAndroid } from 'tns-core-modules/platform';
import observable = require("data/observable");

@Component({
	selector: "Playoff",
	moduleId: module.id,
	templateUrl: "./playoff.component.html",
	styleUrls: ['./playoff.component.css']
})
export class PlayoffComponent implements OnInit {
	textFieldValue: string = "";
	leagueId: number = 0;
	isBusy: boolean = false;
	SEsampleTeamsData = null;
	SEsampleTournamentData = null;
	DEsampleTeamsData = null;
	DEsampleTournamentData = null;
	tournamentData: any = {};
	team: any[] = [];
	matches: any[] = [];
	isEditable = false;


	constructor(private appService: AppService,
		private playoffService: PlayoffService,
		private route: Router
	) {
	}

	ngOnInit(): void {
		this.isBusy = true;
		this.leagueId = this.appService.leagueDetails.LeagueId;
		this.playoffService.getPlayOffGraph(this.leagueId).subscribe((response: any) => {
			if (response.ErrorMessage == null) {
				if (response.Result.schedule == null || response.Result.teams == null) {
					alert({
						title: "Office Pick Em Pool",
						message: "Playoffs graph not available.",
						okButtonText: "OK"
					}).then((data) => {
						this.route.navigate(["/leaderboard"]);
					})
				} else {
					this.SEsampleTeamsData = response.Result.teams;
					this.SEsampleTournamentData = response.Result.schedule;
					this.DEsampleTeamsData = response.Result.teams;
					this.DEsampleTournamentData = response.Result.schedule;
					this.loadTournament("SE");
				}
			}
		})
		this.isBusy = false;
	}

	editableTeam() {
		this.isEditable = true;
	}

	endEditable() {
		this.isEditable = false;
	}

	loadTournament(sample) {
		this.isBusy = true;
		if (sample === 'SE') {
			try {
				this.startTournament(this.SEsampleTournamentData, this.SEsampleTeamsData);
			} catch (e) { }
		} else if (sample === 'DE') {
			this.startTournament(this.DEsampleTournamentData, this.DEsampleTeamsData);
		} else if (sample === 'CL') {
			try {
				this.startTournament(this.SEsampleTournamentData, this.SEsampleTeamsData);
			} catch (e) { }
		}
		this.isBusy = false;
	}

	findTeamMemberDetails(id) {
		var team = null;
		this.team.forEach((item) => {
			item.forEach((item1) => {
				if (item1.id == id) team = item1;
			});

		})
		return team;
	}

	showDetails(index, match) {

		if (match.team1.id == '99999' || match.team2.id == '99999') return;
		var team1 = this.findTeamMemberDetails(match.team1.id);
		var team2 = this.findTeamMemberDetails(match.team2.id);
		if (match.meta != null && match.meta != undefined && match.meta.weekId != undefined && match.meta.weekId != null && team1 != null && team2 != null) this.route.navigate(["/headtoheadsummary/" + match.meta.weekId + "/" + team1.name + "/" + team2.name]);
		else this.route.navigate(["/headtoheadsummary"]);

	}

	startTournament(tournamentData, teams) {
		this.team = teams;
		this.tournamentData = tournamentData;
		if (!this.tournamentData.doubleConference) this.matches = this.tournamentData.conferences[0].matches;
	}
	onLabelLoaded(args: observable.EventData) {
		//console.log("bkjdvfdhvhf");
		const lbl = args.object as Label;
		if (isAndroid) {
			lbl.android.setGravity(17)
		}
	}
}