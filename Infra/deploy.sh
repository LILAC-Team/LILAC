#!/usr/bin/env bash

echo "> $DOCKER_REPOSITORY"
true > RESULT
chmod 666 /var/run/docker.sock
RESPONSE=$(curl -s localhost:8080/actuator/health)
echo "> RESPONSE : "$RESPONSE

IS_ACTIVE=$(echo ${RESPONSE} | grep 'UP' | wc -l)
echo "> IS_ACTIVE "$IS_ACTIVE
if [ $IS_ACTIVE -eq 1 ];
then 
	IDLE_PORT=8082
	IDLE_PROFILE=prod-green
	CURRENT_PORT=8080
	CURRENT_PROFILE=prod-blue
else
	IDLE_PORT=8080
	IDLE_PROFILE=prod-blue
	CURRENT_PORT=8082
	CURRENT_PROFILE=prod-green
fi

echo "> 다음 사용할 포트" $IDLE_PORT
echo "> 다음 사용할 프로필" $IDLE_PROFILE

# docker hub에서 pull
docker pull $DOCKER_REPOSITORY
docker rm $(docker ps --filter status=exited -q)
docker rmi -f $(docker images -f "dangling=true" -q)

# docker 로 컨테이너 실행
echo "> sudo nohup docker run -p $IDLE_PORT:8080 -e "USE_PROFILE=$IDLE_PROFILE" --env-file .env $DOCKER_REPOSITORY > nohup.out 2>&1 &"
sudo nohup docker run -p $IDLE_PORT:8080 --env-file .env -e "USE_PROFILE=prod" $DOCKER_REPOSITORY > nohup.out 2>&1 &

echo "> 60초동안 5초마다 Health Check"

for RETRY in {1..12}
do
	for i in {1..5} ;
	do
	echo "> Health Check까지 " $(( 6 - i))초 남음

	sleep 1
	done

	RESPONSE=$(curl -s localhost:${IDLE_PORT}/actuator/health)
	IS_ACTIVE=$(echo ${RESPONSE} | grep 'UP' | wc -l)

	if [ $IS_ACTIVE -ge 1 ]; then
		echo "> Health Check Success"
		echo "IDLE_PORT" $IDLE_PORT
		echo "$IDLE_PORT" > RESULT
		exit 0
	else
		echo "> Health Check Failed"
		echo "> Health Check RESPONSE : " $RESPONSE
	fi

	if [ $RETRY -eq 10 ]; then
		echo "> Health Check Failed"
		echo "FAIL" > RESULT
	fi

done

exit 1
