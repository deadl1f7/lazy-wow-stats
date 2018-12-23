# lazy-wow-stats

Pulling character stats from Blizzards WoW api and stuffs it into an elasticsearch index

## Requirements:
- Docker
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

1.  Bring up the E(L)K stack, docker-compose up
2.	Build the TS tsc app.ts
3.	npm start -- --key=value ... (env variables in PS $env:REGION="eu")

