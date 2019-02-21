export class Team {
    id: number;
    current_event_fixture: [
        {
            is_home: boolean;
            month: number;
            event_day: number;
            id: number;
            day: number;
            opponent: number;
        }
    ];
    next_event_fixture: [
        {
            is_home: boolean;
            month: number;
            event_day: number;
            id: number;
            day: number;
            opponent: number;
        }
    ]
    name: string;
    code: number;
    short_name: string;
    unavailable: boolean;
    strength: number;
    position: number;
    played: number;
    win: number;
    loss: number;
    draw: number;
    points: number;
    form: number;
    link_url: string;
    strength_overall_home: number;
    strength_overall_away: number;
    strength_attack_home: number;
    strength_attack_away: number;
    strength_defence_home: number;
    strength_defence_away: number;
    team_division: number;
}