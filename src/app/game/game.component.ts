import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;



  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params);

      this.firestore
        .collection('games')
        .doc(params['id'])
        .valueChanges()
        .subscribe((game: any) => {
          console.log('game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;

        });
    });

  }

  newGame() {
    this.game = new Game();
   


  }





  takeCard() {
    if (!this.pickCardAnimation)
      this.currentCard = this.game.stack.pop()!;
    console.log(this.currentCard);
    this.pickCardAnimation = true;

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1200)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(playerName => {
      if (playerName && playerName.length > 0) {
        this.game.players.push(playerName);
      }
    });
  }
}




