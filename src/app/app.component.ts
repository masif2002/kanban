import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  clicked = false;

  products = [
    {
      name: 'Iphone',
      price: 999 
    },
    {
      name: 'IMac',
      price: 1499
    }
  ]
  
}
