import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { NewHeroComponent } from './new-hero/new-hero.component';
import { ItemShopComponent } from './item-shop/item-shop.component';
import { BattleComponent } from './battle/battle.component';
import { FaqComponent } from './faq/faq.component';
import { AfterdeathComponent } from './afterdeath/afterdeath.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NewHeroComponent,
    ItemShopComponent,
    BattleComponent,
    FaqComponent,
    AfterdeathComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'newHero', component: NewHeroComponent, canActivate: [AuthorizeGuard] },
      { path: 'ItemShop', component: ItemShopComponent, canActivate: [AuthorizeGuard] },
      { path: 'Battle', component: BattleComponent, canActivate: [AuthorizeGuard] },
      { path: 'Death', component: AfterdeathComponent },
      { path: 'FAQ', component: FaqComponent }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
