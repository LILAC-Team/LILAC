FROM adoptopenjdk/openjdk11:alpine-jre

COPY build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-Dspring.profiles.active=prod","-jar","/app.jar"]

