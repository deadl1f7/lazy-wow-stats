import elasticsearch, { Client } from 'elasticsearch';
import environment from '../variables/environment';

const hosts = environment.elasticSearchHosts;

const elasticsearchClient = new Client({
  hosts,
});

export default elasticsearchClient;
