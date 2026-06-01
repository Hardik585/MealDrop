FROM eclipse-temurin:17

LABEL maintainer="hardikaksuhik83126@gmail.com"

WORKDIR /app

COPY target/mealDrop.jar mealDrop.jar

EXPOSE 9091

ENTRYPOINT ["java", "-jar", "mealDrop.jar"]