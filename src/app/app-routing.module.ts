import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { HomeComponent } from './component/home/home.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { InstructionsComponent } from './component/instructions/instructions.component';
import { SubscribeComponent } from './component/subscribe/subscribe.component';
import { SubscriptiondetailComponent } from './component/subscriptiondetail/subscriptiondetail.component';
import { CreateleagueComponent } from './component/createleague/createleague.component';
import { AvailableleagueComponent } from './component/availableleague/availableleague.component';
import { LeaguedashboardComponent } from './component/leaguedashboard/leaguedashboard.component';
import { LeaguedashboardhomeComponent } from './component/leaguedashboardhome/leaguedashboardhome.component';
import { SchedulesComponent } from './component/schedules/schedules.component';
import { ScoresComponent } from './component/scores/scores.component';
import { NotesComponent } from './component/notes/notes.component';
import { ViewplayersComponent } from './component/viewplayers/viewplayers.component';
import { InvitefriendComponent } from './component/invitefriend/invitefriend.component';
import { SendemailtoplayerComponent } from './component/sendemailtoplayer/sendemailtoplayer.component';
import { LeagueinstructionsComponent } from './component/leagueinstructions/leagueinstructions.component';
import { LeagueorganizerrulesComponent } from './component/leagueorganizerrules/leagueorganizerrules.component';
import { ViewrulesleagueComponent } from './component/viewrulesleague/viewrulesleague.component';
import { TheprocessrulesComponent } from './component/theprocessrules/theprocessrules.component';
import { LogisticsofapprulesComponent } from './component/logisticsofapprules/logisticsofapprules.component';
import { QuickmenurulesComponent } from './component/quickmenurules/quickmenurules.component';
import { FaqComponent } from './component/faq/faq.component';
import { LetsplaydashboardComponent } from './component/letsplaydashboard/letsplaydashboard.component';
import { LetsplaydashboardhomeComponent } from './component/letsplaydashboardhome/letsplaydashboardhome.component';
import { MakepickComponent } from './component/makepick/makepick.component';
import { HeadtoheadComponent } from './component/headtohead/headtohead.component';
import { LeaderboardComponent } from './component/leaderboard/leaderboard.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { ViewrulesletsplayComponent } from './component/viewrulesletsplay/viewrulesletsplay.component';
import { FaqletsplayComponent } from './component/faqletsplay/faqletsplay.component';
import { ViewnoticeComponent } from './component/viewnotice/viewnotice.component';
import { AvailableleagueletsplayComponent } from './component/availableleagueletsplay/availableleagueletsplay.component';
import { JoinleagueComponent } from './component/joinleague/joinleague.component';
import { HeadtoheadsummaryComponent } from './component/headtoheadsummary/headtoheadsummary.component';
import { MakepicksummaryComponent } from './component/makepicksummary/makepicksummary.component';
import { ContactleagueadminComponent } from './component/contactleagueadmin/contactleagueadmin.component';
import { ContactofficepickempoolComponent } from './component/contactofficepickempool/contactofficepickempool.component';
import { InvitenewplayerComponent } from './component/invitenewplayer/invitenewplayer.component';
import { PlayoffComponent } from './component/playoff/playoff.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { ChatdashboardComponent } from './component/chatdashboard/chatdashboard.component';
import { ChathomeComponent } from './component/chathome/chathome.component';
import { NewchatComponent } from './component/newchat/newchat.component';
import { AddchatComponent } from './component/addchat/addchat.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'resetpassword/:email', component: ResetpasswordComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'subscriptiondetail', component: SubscriptiondetailComponent },
  { path: 'createleague', component: CreateleagueComponent },
  { path: 'availableleague', component: AvailableleagueComponent },
  { path: 'leaguedashboard', component: LeaguedashboardComponent },
  { path: 'leaguedashboardhome', component: LeaguedashboardhomeComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'scores', component: ScoresComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'viewplayers', component: ViewplayersComponent },
  { path: 'invitefriend', component: InvitefriendComponent },
  { path: 'sendemailtoplayer', component: SendemailtoplayerComponent },
  { path: 'leagueinstructions', component: LeagueinstructionsComponent },
  { path: 'leagueorganizerrules', component: LeagueorganizerrulesComponent },
  { path: 'viewrulesleague', component: ViewrulesleagueComponent },
  { path: 'theprocessrules', component: TheprocessrulesComponent },
  { path: 'logisticsofapprules', component: LogisticsofapprulesComponent },
  { path: 'quickmenurules', component: QuickmenurulesComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'letsplaydashboard', component: LetsplaydashboardComponent },
  { path: 'letsplaydashboardhome', component: LetsplaydashboardhomeComponent },
  { path: 'makepick', component: MakepickComponent },
  { path: 'makepick/:index', component: MakepickComponent },
  { path: 'headtohead', component: HeadtoheadComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'viewrulesletsplay', component: ViewrulesletsplayComponent },
  { path: 'faqletsplay', component: FaqletsplayComponent },
  { path: 'viewnotice', component: ViewnoticeComponent },
  {
    path: 'availableleagueletsplay',
    component: AvailableleagueletsplayComponent,
  },
  { path: 'joinleague', component: JoinleagueComponent },
  { path: 'headtoheadsummary', component: HeadtoheadsummaryComponent },
  {
    path: 'headtoheadsummary/:weekId/:player1Id/:player2Id',
    component: HeadtoheadsummaryComponent,
  },
  { path: 'makepicksummary/:weekId', component: MakepicksummaryComponent },
  { path: 'contactleagueadmin', component: ContactleagueadminComponent },
  {
    path: 'contactofficepickempool',
    component: ContactofficepickempoolComponent,
  },
  { path: 'invitenewplayer', component: InvitenewplayerComponent },
  { path: 'playoff', component: PlayoffComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'chatdashboard', component: ChatdashboardComponent },
  { path: 'chathome', component: ChathomeComponent },
  { path: 'newchat', component: NewchatComponent },
  { path: 'addchat', component: AddchatComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
