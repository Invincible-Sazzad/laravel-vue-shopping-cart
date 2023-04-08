## Laravel Shopping Cart Backend

Backend APIs developed in Laravel framework with JWT based authentication feature.

## Installation

1. First, install the composer dependencies

    ```
    composer install
    ```

2. Install NPM dependencies

    ```
    npm install
    ```

3. Copy the *.env.example* file and rename it to *.env*

4. Generate an app encryption key

    ```
    php artisan key:generate
    ```

5. Create an empty database for our application

6. In the *.env* file, add database information to allow Laravel to connect to the database

7. Migrate the database

    ```
    php artisan migrate
    ```

8. Seed the database

    ```
    php artisan db:seed
    ```

9. Create the JWT secret key

    ```
    php artisan jwt:secret
    ```
    This command will create the following keys in your *.env* file:
    ```
    JWT_SECRET=******************************
    JWT_ALGO=********
    ```
10. Run the application

    ```
    php artisan serve
    ```

    Now you will be able to make request to the routes specified in the `routes/api.php` file.
