FROM adoptopenjdk/openjdk11:alpine-jre

COPY build/libs/*.jar /app.jar

EXPOSE 8080

CMD ["java", "-jar", "/app.jar"]

