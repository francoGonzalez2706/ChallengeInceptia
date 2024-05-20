NODE=`docker-compose ps | grep npm | cut -d\  -f 1 | head -n 1`
FILE=docker-compose.yml
ENV_STAGE = ``

#########
#ACTIONS#
#########

build:
	sudo docker-compose -f $(FILE) build

up:
	sudo docker-compose -f $(FILE) up -d

start:
	sudo docker-compose -f $(FILE) start

stop:
	sudo docker-compose -f $(FILE) stop


clean: stop
	sudo docker-compose rm -f

restart: clean build up
	@echo "Restarted all containers"


########
#SHELLS#
########


shell-app:
	docker exec -ti $(NODE) bash

######
#LOGS#
######



log-app:
	docker-compose logs app

log-app-live:
	docker logs --tail 50 --follow --timestamps $(NODE)


