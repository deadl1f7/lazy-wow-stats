# lazy-wow-stats

Pulling character stats from Blizzards WoW api and stuffs it into an elasticsearch index.
Using Elasticsearch, we can formulate any kind of visualization for the data retrieved. Examples are Guild Class partition, Item levels, raid kills, active members etc...

Basically, the sky is the limit of what kind of representations you can achieve.


![alt text](https://github.com/deadl1f7/lazy-wow-stats/blob/master/elk-utils/dashboard_example.PNG)

## Requirements:
- Docker
- Typescript
- Client id/client secret from Blizzard 

## Running 

###	Args/Env variables

Omit -- with env

- **--region=** region (eu/us etc.)
- **--guilds=** Comma separated list of guildname:server ("Best Guild:ragnaros"), to add all players from this guild to the polling.
- **--players=** Comma separated list of playername:server ("DiscPräst:ragnaros"), to the specified players to the polling.
- **--clientid=** Blizz API clientid
- **--clientsecret=** Blizz API clientsecret
- **--eshosts=** Comma separated list of the elasticsearch database (default localhost:9200)

### Running from the current the built
1.  docker-compose up

### Alternatively building it yourself:
1.  Bring up the E(L)K stack, docker-compose up
2.	Build the TS tsc app.ts
3.	npm start -- --key=value ... (env variables in PS $env:REGION="eu")

Kibana can be found at localhost:5601
