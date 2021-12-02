import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { secret } from '../secret';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  apiKey: string = secret.apiKey;
  apiUrl: string = "https://superheroapi.com/api.php/";


  constructor(private http: HttpClient) {
    
  }
   

  getRandomId(): number {
    const max: number = 731;
    return Math.floor(Math.random() * max) + 1;
  }


  getRandomHero(): any {
    let baseUrl: string = this.apiUrl + this.apiKey;
    return this.http.get(baseUrl + "/" + this.getRandomId());
  }

  //pass all userInventory parameters through url.
  NewAccount(heroID: string): any {
    let baseUrl: string = this.apiUrl + this.apiKey;
    return this.http.post(baseUrl + `/api/Hero/newAccount?heroID=${heroID}&`, {});
  }



}

