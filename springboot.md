# Springboot notes

## Requestmapping

```java
@RequestMapping(
  path = "/{email}/authenticate",
  method = RequestMethod.POST,
  consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
  produces = {
    MediaType.APPLICATION_ATOM_XML_VALUE,
    MediaType.APPLICATION_JSON_VALUE
  })
```

## Multipart form data

- enable in application properties.
  spring.servlet.multipart.enabled=true
  spring.servlet.multipart.max-file-size=200MB
  spring.servlet.multipart.max-request-size=200MB
  spring.servlet.multipart.file-size-threshold=1MB

- @RequestPart MultipartFile file has to match formcontrolname in angular
- Retrieve blob with ResultSetExtractor

JkKM/l6YRLMBYcsac5nRxuvbNeejIkNYZM3Nq6pKzUg

## CSF dependencies

```java
  <!-- https://mvnrepository.com/artifact/org.glassfish/jakarta.json -->
  <dependency>
   <groupId>org.glassfish</groupId>
   <artifactId>jakarta.json</artifactId>
   <version>2.0.1</version>
  </dependency>
<!-- https://mvnrepository.com/artifact/org.glassfish.jaxb/jaxb-runtime -->
  <dependency>
   <groupId>org.glassfish.jaxb</groupId>
   <artifactId>jaxb-runtime</artifactId>
   <version>4.0.2</version>
  </dependency>

        <!-- https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-s3 -->
        <dependency>
            <groupId>com.amazonaws</groupId>
            <artifactId>aws-java-sdk-s3</artifactId>
            <version>1.12.435</version>
        </dependency>
<!-- https://mvnrepository.com/artifact/javax.xml.bind/jaxb-api -->
  <dependency>
   <groupId>javax.xml.bind</groupId>
   <artifactId>jaxb-api</artifactId>
   <version>2.4.0-b180830.0359</version>
  </dependency>
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
  <dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
   <version>8.0.32</version>
  </dependency>
```

Application Properties for digital ocean

```java
spring.servlet.multipart.enabled=true
spring.datasource.url=${MYSQL_DB_URL}
spring.datasource.username=${MYSQL_DB_USERNAME}
spring.datasource.password=${MYSQL_DB_PASSWORD}
spring.datasource.hikari.connectionTimeout=20000
spring.datacourse.hikari.maximumPoolSize=5

do.storage.access.key=${DO_ACCESS_KEY}
do.storage.secret.key=${DO_SECRET_KEY}
do.storage.endpoint=${DO_ENDPOINT}
do.storage.endpoint.region=${DO_ENDPOINT_REGION}
```
