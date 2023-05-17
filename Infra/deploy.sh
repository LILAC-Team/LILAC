#!/usr/bin/env bash

echo "> $DOCKER_REPOSITORY"
true > RESULT
chmod 666 /var/run/docker.sock
RESPONSE=$(curl -s http://lilac-music.net:8081/api/v1/actuator/health)
echo "> RESPONSE : "$RESPONSE

IS_ACTIVE=$(echo ${RESPONSE} | grep 'UP' | wc -l)
echo "> IS_ACTIVE "$IS_ACTIVE
if [ $IS_ACTIVE -eq 1 ];
then 
	IDLE_PORT=8080
	IDLE_PROFILE=prod-green
	CURRENT_PORT=8082
	CURRENT_PROFILE=prod-blue
else
	IDLE_PORT=8082
	IDLE_PROFILE=prod-blue
	CURRENT_PORT=8080
	CURRENT_PROFILE=prod-green
fi

echo "> 다음 사용할 포트" $IDLE_PORT
echo "> 다음 사용할 프로필" $IDLE_PROFILE

# docker hub에서 pull
docker pull $DOCKER_REPOSITORY
docker rm $(docker ps --filter status=exited -q)
docker rmi -f $(docker images -f "dangling=true" -q)

# docker 로 컨테이너 실행
echo "> docker run -d -p $IDLE_PORT:8080 -e "USE_PROFILE=$IDLE_PROFILE" --env-file .env $DOCKER_REPOSITORY"
docker run -d --name $IDLE_PROFILE -p $IDLE_PORT:8080 -e ADMIN_NAME=${ADMIN_NAME} -e ADMIN_PASSWORD=${ADMIN_PASSWORD} -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} -e AWS_SECRET_KEY=${AWS_SECRET_KEY} -e CLOUDFRONT_PREFIX=${CLOUDFRONT_PREFIX} -e IAM_ROLE=${IAM_ROLE} -e JWT_SECRET_KEY=${JWT_SECRET_KEY} -e KAKAO_ID=${KAKAO_ID} -e KAKAO_SECRET=${KAKAO_SECRET} -e MEDIACONVERT_ENDPOINT=${MEDIACONVERT_ENDPOINT} -e MONGO_PASSWORD=${MONGO_PASSWORD} -e MONGO_USER=${MONGO_USER} -e MYSQL_PASSWORD=${MYSQL_PASSWORD} -e MYSQL_USER=${MYSQL_USER} -e REDIS_PASSWORD=${REDIS_PASSWORD} -e REDIS_USER=${REDIS_USER} -e S3_BUCKET=${S3_BUCKET} -e AWS_REGION=${AWS_REGION} -e "USE_PROFILE=prod" $DOCKER_REPOSITORY 

echo "> 60초동안 5초마다 Health Check"

for RETRY in {1..3}
do
	for i in {1..5} ;
	do
	echo "> Health Check까지 " $(( 6 - i))초 남음

	sleep 1
	done

	RESPONSE=$(curl -s http://lilac-music.net:${IDLE_PORT}/api/v1/actuator/health)
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
