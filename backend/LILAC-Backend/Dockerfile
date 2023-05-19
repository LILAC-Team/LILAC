FROM adoptopenjdk/openjdk11:alpine-jre

COPY build/libs/*.jar app.jar

EXPOSE 8080

ENV USE_PROFILE prod

ENTRYPOINT ["java","-Dspring.profiles.active=${USE_PROFILE}","-jar","/app.jar"]

