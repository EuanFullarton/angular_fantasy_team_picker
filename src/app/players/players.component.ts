import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers();
    // this.getPositions();
  }

  getPlayers(): void {
    const players = this.playerService.getPlayers()
      .subscribe(players => this.players = players);
  }

  getPositions() {
    // map positions from 'element_type'
    // Positions = key value array
  }

  filterPlayersByPosition(position) {
    // return this.players.filter(x => x. == type);
  }
  
  
}
