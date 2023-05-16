#!/usr/bin/env bash
# 현재 사용중인 포트를 확인
RESPONSE=$(curl -s -k -L lilac-music.net/api/v1/actuator/health)
echo "> RESPONSE : "$RESPONSE

IS_ACTIVE=$(echo ${RESPONSE} | grep 'UP' | wc -l)
echo "> IS_ACTIVE" "$IS_ACTIVE"
CURRENT_PORT=$(curl -k -L lilac-music.net/port | grep 'BLUE' | wc -l)
echo "현재 구동중인 포트: " "$CURRENT_PORT"
if [ "$IS_ACTIVE" -eq 1 ];
then
	if [ "$CURRENT_PORT" -eq 1 ];
	then
		IDLE_PORT=8081
		IDLE_PROFILE=GREEN
		CURRENT_PORT=8080
		CURRENT_PROFILE=BLUE
	else
		IDLE_PORT=8080
		IDLE_PROFILE=BLUE
		CURRENT_PORT=8081
		CURRENT_PROFILE=GREEN
	fi
else
	IDLE_PORT=8080
	IDLE_PROFILE=BLUE
	CURRENT_PORT=8081
	CURRENT_PROFILE=GREEN
fi
echo "전환할 포트: " "$IDLE_PORT"

echo "> 포트 세팅 변경"
echo "set \$active_server $IDLE_PROFILE;" | sudo tee /etc/nginx/conf.d/port.conf
echo "> 기존 컨테이너 삭제"
sudo docker kill $(docker ps -qf publish=$CURRENT_PORT)
echo "> nginx 재시작"
sudo systemctl reload nginx

