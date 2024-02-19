# Recruitment Task

# Task - 1 - Annotation

    A. Connection:

    users Table: This table stores information about individual users. Each user is uniquely identified by a user_id. The users table contains attributes such as email, first_name, last_name, and phone_number.

    enterprises Table: This table stores information about different enterprises. Each enterprise is uniquely identified by an enterprise_id. The enterprises table contains attributes such as name, tax_id (which serves as a unique identifier for enterprises), and address.

    user_enterprises Table (Joining / Bridge Table): This table establishes a many-to-many relationship between users and enterprises. It enables users to belong to multiple enterprises and enterprises to have multiple users associated with them. This table has two foreign key columns: user_id references the user_id column in the users table, and enterprise_id references the enterprise_id column in the enterprises table. The combination of user_id and enterprise_id forms the primary key, ensuring uniqueness of user-enterprise associations.



    B. Explanation:

    When a user needs to be associated with an enterprise, a record is inserted into the user_enterprises table, specifying the user_id and enterprise_id. This establishes the connection between the user and the enterprise.

    Users can belong to multiple enterprises by having multiple records in the user_enterprises table, each with a different enterprise_id.

    Enterprises can have multiple users associated with them by having multiple records in the user_enterprises table, each with a different user_id.

    The user_enterprises table facilitates easy retrieval of users belonging to a specific enterprise and vice versa.


    C. Query:

        SELECT u.* FROM users u
        JOIN user_enterprises ue ON u.user_id = ue.user_id
        JOIN enterprises e ON ue.enterprise_id = e.enterprise_id
        WHERE e.tax_id = '1234';



    D. Query:

        SELECT * FROM users WHERE "createdAt" > '2024-02-10';



    NOTE - Repository contains visual representation of database (database_structure_visualisation)

# INSTRUCTION

# Prepare BE

## Connect BE to database

    1. Make sure you're inside `server` directory.
    1. Install packages - `yarn install`
    2. Setup environment variables according to .env.example
        PORT=9000 - If you prefer other port for server, you have to change port on the front end side of the applicaiton inside constants.ts file
        DB_USER=joe
        DB_USER_PASSWORD=doe
        DB_NAME=db
        DB_PORT=5432
        DB_HOST=localhost

    3. **Restart Terminal** - if you haven't done that before

`yarn start` - run server

`yarn dev` - run server (development)

_NOTICE - When you run server for the first time with properly configurated `.env` file, server will create 3 tables._

`users` - table that will include users

`enterprises` - table that will include enterprises

`user_enterprises` - table that will information about members of enterprises with permissions

## Prepare test data

Before you run **Unit tests** in order to pass the test you need to create data for specific tables.

    1. Create 2 users with **user_id** set to:
        - *0xHash1*
        - *0xHash2*

    2. Create Enterprise with **tax_id** set to ***7162828483***

## TESTING

If you did all the above steps correctly you can **run** unit tests using **yarn test**
# react-postgres-server
