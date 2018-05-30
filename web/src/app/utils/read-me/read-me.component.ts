import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-read-me',
  templateUrl: './read-me.component.html',
  styleUrls: ['./read-me.component.css']
})
export class ReadMeComponent implements OnInit {

  @Input() Title: string = 'Title';

  constructor() { }

  ngOnInit() {
  }

}
