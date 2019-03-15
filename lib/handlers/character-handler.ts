import { default as  Handler } from '../contracts/handler';
import { Character } from '../tasks/character-task';
import { default as elasticsearchClient } from '../elasticsearch/client';
import { IndexDocumentParams, BulkIndexDocumentsParams } from 'elasticsearch';

const index = 'character';
const type = 'stats';
const maxBulk = 50;

export default class CharacterHandler implements Handler<Character>{

  handle(param: Character[]): Promise<void> {
    // tslint:disable-next-line:max-line-length
    return new Promise<void>(async (resolve, reject) => {
      try {
        const bulk:any[] = [];
        param.forEach((c) => {
          bulk.push({ index:{ _index:index, _type:type } });
          c['timestamp'] = new Date();
          bulk.push(c);
        });
        console.log(`Bulk inserting ${param.length} characters`);
        let splice = [];
        let spliceCount = 0;
        while ((splice = bulk.splice(0, maxBulk)).length > 0) {
          spliceCount += splice.length;
          console.log(`Inserted ${spliceCount}/${bulk.length} players`);
          await elasticsearchClient.bulk(<BulkIndexDocumentsParams>{
            body:splice,
          });
        }

        resolve();
      }catch (error) {
        console.log(error);
        reject();
      }
    });
  }

}
