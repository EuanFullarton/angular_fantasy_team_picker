import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { Position } from '../position';
import { PlayerService } from '../player.service';
import { PositionService } from '../position.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];
  positions: Position[];
  test: Object[];

  constructor(private playerService: PlayerService, private positionService: PositionService) { }

  ngOnInit() {
    this.getPlayers();
    this.getPositions();
  }

  getPlayers(): void {
    const players = this.playerService.getPlayers()
      .subscribe(players => this.players = players);
  }

  getPositions(): void {
    const positions = this.positionService.getPositions()
      .subscribe(positions => { this.positions = positions; });
  }

  filterByPosition(selectedPosition) {
    if (this.positions !== undefined && this.players !== undefined) {
      const positionId = this.positions.find(x => x.singular_name === selectedPosition).id;
      return this.players.filter(x => x.element_type === positionId);
    }
  }
}
