import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
@Input() name;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    //Start game F
    this.router.navigateByUrl('/game');
  }
}
