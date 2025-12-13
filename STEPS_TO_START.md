# Steps to Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rajdeepthaosen7/Todo-Application-backend.git
    ```
2.  **Start the database using Docker:**
    - Make sure you have Docker installed and running on your machine.
    - Open a terminal and navigate to the root directory of the project.
    - Run the following command to start the PostgreSQL database in a Docker container:
      ```bash
      docker-compose up -d
      ```
    - This will also start a pgAdmin container, which you can use to manage the database.
    - You can access pgAdmin at `http://localhost:5050`.
    - The default credentials for pgAdmin are:
        - Email: `admin@local.com`
        - Password: `admin`
3.  **Run the application:**
    - You can run the application from your IDE or by using the following Maven command:
      ```bash
      ./mvnw spring-boot:run
      ```
4.  **Access the application:**
    - The application will be running at `http://localhost:8080`.
