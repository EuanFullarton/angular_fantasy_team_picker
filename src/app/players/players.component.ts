import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { Position } from '../position';
import { Team } from '../team';
import { PlayerService } from '../player.service';
import { PositionService } from '../position.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];
  positions: Position[];
  team_players: Player[] = [];
  selected_player_teams: Team[] = [];
  teams: Team[];
  budget: Number = 100;

  constructor(
    private playerService: PlayerService, 
    private positionService: PositionService, 
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.getPlayers();
    this.getPositions();
    this.getTeams();
  }

  getPlayers(): void {
    const players = this.playerService.getPlayers()
      .subscribe(players => { this.players = players; this.sortPlayers(); });
  }

  getPositions(): void {
    const positions = this.positionService.getPositions()
      .subscribe(positions => this.positions = positions );
  }

  getTeams(): void {
    const teams = this.teamService.getTeams()
      .subscribe(teams => this.teams = teams );
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

  getTeamName(team_id) {
    if (this.teams !== undefined) {     
      let team_object = this.teams.find(team => team.code === team_id);
      return team_object.short_name;
    }
  }

  updateSelectionList(selectedPlayerId, positionSlot) {
    const playerIndex = this.players.map(function(player) {
      return player.id
    }).indexOf(selectedPlayerId);

    const selectedPlayer = this.players.splice(playerIndex, 1);
    
    if (this.team_players[positionSlot] === undefined) {
      this.team_players[positionSlot] = selectedPlayer[0];
    } else {
      this.players.push(this.team_players[positionSlot]);
      this.team_players[positionSlot] = selectedPlayer[0];
    }

    const team_name = this.getTeamName(selectedPlayer[0].team_code);
    this.selected_player_teams[positionSlot + '_team'] = team_name;

    this.updateBudget();
  }

  updateBudget() {
    let transferSpend = 0;

    Object.values(this.team_players).forEach(function(player) {
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
