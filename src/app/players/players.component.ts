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
  team: Player[] = [];
  budget: Number = 100;

  constructor(private playerService: PlayerService, private positionService: PositionService) { }

  ngOnInit() {
    this.getPlayers();
    this.getPositions();
  }

  getPlayers(): void {
    const players = this.playerService.getPlayers()
      .subscribe(players => { this.players = players; this.sortPlayers(); });
  }

  getPositions(): void {
    const positions = this.positionService.getPositions()
      .subscribe(positions => this.positions = positions );
  }

  sortPlayers(): void {
    this.players.sort(this.sortByValue);
  }

  filterByPosition(selectedPosition) {
    if (this.positions !== undefined && this.players !== undefined) {
      const positionId = this.positions.find(x => x.singular_name === selectedPosition).id;
      return this.players.filter(x => x.element_type === positionId);
    }
  }

  updateSelectionList(selectedPlayerId, positionSlot) {
    const playerIndex = this.players.map(function(player) {
      return player.id
    }).indexOf(selectedPlayerId);

    const selectedPlayer = this.players.splice(playerIndex, 1);
    
    if (this.team[positionSlot] === undefined) {
      this.team[positionSlot] = selectedPlayer[0];
    } else {
      this.players.push(this.team[positionSlot]);
      this.team[positionSlot] = selectedPlayer[0];
    }    

    this.updateBudget();
  }

  updateBudget() {
    let transferSpend = 0;

    Object.values(this.team).forEach(function(player) {
      transferSpend += player.now_cost / 10;
    });

    this.budget = parseFloat((100 - transferSpend).toFixed(1));

    if (this.budget < 0) {
      document.getElementById('budget').classList.add('bankrupt');
    }
  }

  sortByValue(a, b) {
    if (a.now_cost < b.now_cost)
      return 1;
    if (a.now_cost > b.now_cost)
      return -1;
    return 0;
  }
}
