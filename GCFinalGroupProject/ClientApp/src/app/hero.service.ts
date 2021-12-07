import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { User } from 'oidc-client';
import { Hero } from './Hero';
import { secret } from './secret';

import { UserInventory } from './UserInventory';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  apiKey: string = secret.apiKey;
  apiUrl: string = "https://superheroapi.com/api.php/";


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    
  }


  
  //put method that updates heroID in userInventory table. 
  //newAfterDeath put..
  AfterDeath(heroID: string):any {
    return this.http.put(this.baseUrl + `api/hero/AfterDeath?heroID=${heroID}`, {});
  }

  CheckHeroExists():any {
    return this.http.get(this.baseUrl + `api/hero/CheckHeroExists`);
  }

  getById(id: string): any {
    let baseUrl: string = this.apiUrl + this.apiKey;
    return this.http.get(baseUrl  + "/" + id);    
  }

  //while loop on randomID. save as variable. checks for all DB heros that have null powerstats. 
  getRandomId(): number {
    const max: number = 731;
    return Math.floor(Math.random() * max) + 1;
  }


  getRandomHero(): any {
    let baseUrl: string = this.apiUrl + this.apiKey;
    return this.http.get(baseUrl + "/" + this.getRandomId());
  }

  //pass all userInventory parameters through url.
  newAccount(inv: UserInventory): any {
    return this.http.post(this.baseUrl + `api/hero/newAccount?_HeroID=${inv.heroID}&_ItemOne=${inv.itemOne}&_ItemTwo=${inv.itemTwo}&_Money=${inv.money} `, {});
  }

  GetInv(): any {
    return this.http.get(this.baseUrl + 'api/hero/GetInv');
  }





}

