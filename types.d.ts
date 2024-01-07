type User = {
  id?: string;
  username: string;
  email?: string;
  image?: string;
  games?: GameSession[];
};
type CardType = {
  image: string;
  text?: string;
};

type Score = {
  id?: string;
  home_player_score: number;
  guess_player_score: number;
  round_id: string;
};

type Round = {
  id?: string;
  gamesession_id: string;
  game: GameSession;
  score: Score;
  proposals: string[];
  round_number: number;
  number_of_rounds: number;
  category: string;
};

type GameSession = {
  id?: string;
  home_player_id?: string;
  guess_player_id?: string;
  winner: string;
  home_player_score: number;
  guess_player_score: number;
  user?: User;
  rounds?: Round[];
  role: string;
};

type Choice = {
  id: string;
  round_id?: string;
  home_player_id: string;
  guess_player_id: string;
  home_player_choice: string;
  guess_player_choice: string;
  home_player_hint: string;
  guess_player_hint: string;
  user: User;
  round: Round;
  guess: Guess;
};

type Guess = {
  id?: string;
  round_id?: string;
  home_player_id: string;
  guess_player_id: string;
  home_player_guess: string;
  guess_player_guess: string;
  home_guess_isCorrect: string;
  guess_guess_isCorrect: string;
  user?: User;
  round?: Round;
  choice?: Choice;
};

type StatType = {
  choice_id: string;
  guess_player_guess: string;
  home_player_choice: string;
  home_player_score: number;
  round: string;
  guess_player_choice: string;
  home_player_guess: string;
  guess_player_score: number;
};
