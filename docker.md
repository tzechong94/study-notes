# docker notes

## nginx not allowing POST. Change the nginx config file to set up proxy

{
listen 80;
location / {
root /usr/share/nginx/html;
index index.html index.htm;
try_files $uri $uri/ /index.html =404;
}

    location /api {
        proxy_pass http://app-server:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}

## deploy springboot angular mysql to kubernetes

https://www.javachinna.com/angular-nginx-spring-boot-mysql-docker-compose/

1. Build
   docker build -t ultra/app-client .

2. Tag image with repo url, then push
   docker tag ultra/app-client tc1994/app-client

3. Login and push to repo.
   docker push tc1994/app-client.

Kubernetes

kubectl create secret generic mysql-root-pass --from-literal=password=<password>

kubectl create secret generic mysql-db-url --from-literal=database=demo --from-literal=url="jdbc:mysql://db:3306/<dbname>?useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false&allowPublicKeyRetrieval=true"

https://cert-manager.io/docs/installation/kubectl/ -> unsinstall all the cert etc

https://github.com/kubernetes/ingress-nginx/issues/5884 - DELETE INGRESS NGINX JOB

https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes#step-2-setting-up-the-kubernetes-nginx-ingress-controller DIGITAL OCEAN NGINX SET UP

docker build -t <image_name>:<tag> .
docker login
docker tag <image_name>:<tag> <repository>:<tag>
docker push <repository>:<tag>
