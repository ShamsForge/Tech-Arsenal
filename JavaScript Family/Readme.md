1. Build the Docker image:
> docker build -t calc-js .

2. Run the container and map port 80 in the container to port 8080 on your computer:
> docker run -d -p 8080:80 calc-js

3. Open your web browser and go to:
> http://localhost:8080

// For Development Envoirment! //

- Start a new container with a Volume Mount:
> docker run -d -p 8080:80 -v "${PWD}:/usr/share/nginx/html" calc-js