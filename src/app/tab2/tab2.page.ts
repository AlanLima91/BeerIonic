import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BeerService } from '../beer.service';
import { Beer } from '../beer';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page
{
  constructor(private router:Router, private beerService: BeerService) { }

  onSubmit(form)
  {
    this.beerService.addBeer(form.form.value).subscribe(beer =>
      {
        this.router.navigateByUrl('../tabs/tab1.module#Tab1PageModule');
      });
  }
}
