import { Component } from '@angular/core';

@Component({
  selector: 'home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent {
  cards = [
    { title: 'READ.ME', cols: 2, rows: 1 },
    { title: 'Pull Requests', cols: 1, rows: 1 },
    { title: 'Issues', cols: 1, rows: 2 },
    { title: 'Contributors', cols: 1, rows: 1 }
  ];
}
