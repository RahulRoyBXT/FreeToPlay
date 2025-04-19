export interface Game {
    id:                     number;
    title:                  string;
    thumbnail:              string;
    short_description:      string;
    game_url:               string;
    genre:                  string;
    platform:               string;
    publisher:              string;
    developer:              string;
    release_date:           string;
    freetogame_profile_url: string;
}
export interface SystemReq {
    os : string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string
}
export interface SingleGame {
    status: string;
    minimum_system_requirements: SystemReq;
    screenshots:{id: number; image: string}[];

}