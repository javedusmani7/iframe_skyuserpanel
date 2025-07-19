import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MobMyProfileComponent } from './components/mobile/mob-my-profile/mob-my-profile.component';
import { MobSportsComponent } from './components/mobile/mob-sports/mob-sports.component';
import { MobInPlayComponent } from './components/mobile/mob-in-play/mob-in-play.component';
import { MobInplayTodayComponent } from './components/mobile/mob-inplay-today/mob-inplay-today.component';
import { MobInplayTomorrowComponent } from './components/mobile/mob-inplay-tomorrow/mob-inplay-tomorrow.component';
import { MobResultsComponent } from './components/mobile/mob-results/mob-results.component';
import { MobMultiMarketComponent } from './components/mobile/mob-multi-market/mob-multi-market.component';
import { MobBtesComponent } from './components/mobile/mob-btes/mob-btes.component';
import { MobLoginPanelComponent } from './components/mobile/mob-login-panel/mob-login-panel.component';
import { MobMainPageCupwinnerComponent } from './components/mobile/mob-main-page-cupwinner/mob-main-page-cupwinner.component';
import { MobMainPageComponent } from './components/mobile/mob-main-page/mob-main-page.component';
import { MultiMarketsComponent } from './components/multi-markets/multi-markets.component';
import { TodayComponent } from './components/today/today.component';
import { TomorrowComponent } from './components/tomorrow/tomorrow.component';
import { InplayComponent } from './components/inplay/inplay.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CommonSportComponent } from './components/common-sport/common-sport.component';
import { ResultsComponent } from './components/results/results.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BalnaceOverviewComponent } from './components/balnace-overview/balnace-overview.component';
import { AccStmtComponent } from './components/acc-stmt/acc-stmt.component';
import { BetsHistoryComponent } from './components/bets-history/bets-history.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { ProfitAndLossComponent } from './components/profit-and-loss/profit-and-loss.component';
import { RegulationsComponent } from './components/regulations/regulations.component';
import { MyBetsComponent } from './components/my-bets/my-bets.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'inplay', component: InplayComponent },
  { path: 'inplay-today', component: TodayComponent },
  { path: 'inplay-tomorrow', component: TomorrowComponent },
  { path: 'multiMarkets', component: MultiMarketsComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'sport/:id', component: CommonSportComponent },
  { path: 'match/:sportId/:eventId', component: MainPageComponent },
  { path: 'checkresults', component: ResultsComponent },
  { path: 'balance-overview', component: BalnaceOverviewComponent },
  { path: 'account-statement', component: AccStmtComponent },
  { path: 'regulations', component: RegulationsComponent },
  { path: 'mybet', component: MyBetsComponent },
  { path: 'activity-log', component: ActivityLogComponent },
  { path: 'bet-history', component: BetsHistoryComponent },
  { path: 'profit-loss', component: ProfitAndLossComponent },
  // mobile
  { path: 'mob-myProfile', component: MobMyProfileComponent },
  { path: 'mob-sport', component: MobSportsComponent },
  { path: 'Mchecksportwiseresult', component: MobResultsComponent },
  { path: 'mob-inplay', component: MobInPlayComponent },
  { path: 'mob-inplay/today', component: MobInplayTodayComponent },
  { path: 'mob-inplay/tomorrow', component: MobInplayTomorrowComponent },
  { path: 'mob-multiMarket', component: MobMultiMarketComponent },
  { path: 'mob-bets', component: MobBtesComponent },
  { path: 'mob-login', component: MobLoginPanelComponent },
  { path: 'mob-match-cupwinner', component: MobMainPageCupwinnerComponent },
  { path: 'mob-match', component: MobMainPageComponent },


];
