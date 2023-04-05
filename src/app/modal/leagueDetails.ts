export class LeagueModel {
    Name: string;
    Password: string;
    Notes: string;
    Id: number;
    Status: string;
}

export class LeagueDetails {
    LeagueId: number;
    LeagueName: string;
    LeaguePassword: string;
    LeagueNotice: string;



    constructor() {

    }
    setleagueName(name) {
        this.LeagueName = name;
    }
    getLeagueName() {
        return this.LeagueName;
    }

    getLeagueId() {
        return this.LeagueId;
    }

    setLeagueId(id) {
        this.LeagueId = id;
    }
    setleaguePassword(password) {
        this.LeaguePassword = password;
    }
    getleaguePassword() {
        return this.LeaguePassword;
    }
    setleagueNotice(notes) {
        this.LeagueNotice = notes;
    }
    getleagueNotice() {
        return this.LeagueNotice;
    }

    setleagueDetails(item) {
        this.LeagueId = item.Id;
        this.LeagueName = item.Name;
        this.LeaguePassword = item.Password;
        this.LeagueNotice = item.Notes;
    }
}