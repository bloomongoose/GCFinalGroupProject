import { Component } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
/** FAQ component*/
export class FaqComponent {
  /** FAQ ctor */
  display: boolean = false;
  constructor(private heroService: HeroService) {

  }

  toggleDisplay(): void {
    this.display = !this.display;
  }
}
