import { getRequest } from '../blizz/request';
import { default as Task } from '../contracts/task';
import environment  from '../variables/environment';
const action = '/wow/character';

export interface Character {

  lastModified: Date;
  name: string;
  realm: string;
  battlegroup: string;
  class: number;
  race: number;
  gender: number;
  level: number;
  achievementPoints: number;
  thumbnail: string;
  calcClass: string;
  faction: number;
  totalHonorableKills: number;
  [key: string]: any;

}

export default class CharacterTask implements Task<Character>{
  characterName:string;
  realm:string;
  constructor(characterName:string, realm:string) {
    this.characterName = characterName;
    this.realm = realm;
  }

  perform(): Promise<Character> {
    // tslint:disable-next-line:max-line-length
    return getRequest<Character>(`${action}/${this.realm}/${this.characterName}`, { fields : environment.fields, locale : environment.locale }).then((character) => {
      const lastModified = new Date(<any>character.lastModified);

      character.lastModified = lastModified;
      return character;
    });
  }
}
