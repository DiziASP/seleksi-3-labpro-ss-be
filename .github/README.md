<h1 align="center">
  <br>
  <a href="https://github.com/DiziASP/seleksi-3-labpro-monolith">
    <img src="https://github.com/DiziASP/seleksi-3-labpro-monolith/blob/master/.github/image/monolith-logo.png?raw=true" alt="Monolith FS">
  </a>
</h1>

<h4 align="center">A monolithic full stack website made with <s>Django</s>.</h4>
<p align="center"><sub > but this is the other backend :D<sub/><p/>

<p align="center">
    <a href="https://github.com/DiziASP/seleksi-3-labpro-ss-be/commits/master">
      <img src="https://img.shields.io/github/last-commit/DiziASP/seleksi-3-labpro-ss-be.svg?style=flat-square&logo=github&logoColor=white"
           alt="GitHub last commit">
</p>

<p align="center">
  <a href="#about">About</a> •
  <a href="#installation">Installation</a> •
  <a href="#docker">Docker</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#my-design-patterns">My Design Patterns</a> •
  <a href="#bonus">Bonus</a> •
  <a href="#license">License</a>
</p>

---

## About

<table>
<tr>
<td>
  
**BelanjaBelinji** SS-BE is single service backend for [BelanjaBelinji Monolith](https://github.com/DiziASP/seleksi-3-labpro-monolith). This project is made for the purpose of Seleksi 3 LabPro 2023.  This project is made using NestJS (TypeScript) and PostgreSQL. The reason why i use NestJS is because it implements Object Oriented Approach making it easier to implement **SOLID Principle**.

![Landing](https://github.com/DiziASP/seleksi-3-labpro-ss-be/blob/master/.github/images/landing.png?raw=true)
<p align="right">
<sub>(Preview)</sub>
</p>

</td>
</tr>
</table>

## Installation

### Prerequisites

* [Install](https://nodejs.org/en/download/) the latest version of **Node.js**
* [Install](https://www.npmjs.com/get-npm) the latest version of **NPM**
* [Install](https://www.postgresql.org/download/) the latest version of **PostgreSQL**

### Installation Steps

1. Clone the repository

    ```bash
    git clone https://github.com/DiziASP/seleksi-3-labpro-ss-be.git
    ```

2. Change the working directory

    ```bash
    cd seleksi-3-labpro-ss-be
    ```

3. Install dependencies

    ```bash
    npm install
    ```

4. Create `.env` file using `.env.example`

    ```bash
    # .env
    JWT_SECRET=<YOUR_SECRET_TOKEN>
    CLIENT_URL=<FRONTEND_URL>
    PORT=8080
    NODE_ENV=<development|production>
    CORS_WHITELIST=<CORS_WHITELIST_URL>
    DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?schema=public
    DATABASE_HOST=<POSTGRES_HOST>
    DATABASE_USER=<POSTGRES_USER>
    POSTGRES_PASSWORD=<POSTGRES_USER_PASSWORD>
    POSTGRES_USER=<POSTGRES_USER>
    POSTGRES_DB=<POSTGRES_DB>
    ```

5. Generate Prisma Client and Migrate the database

    ```bash
    # generate prisma client
    $ npx prisma generate

    # migrate database
    $ npx prisma migrate dev
    ```

6. (If you want to seed the database) Seed the database using this command

    ```bash
    # seed database
    $ npx prisma db seed
    ```

7. Generate Secret Key for JWT

    ```bash
    # generate secret key
    $ npm run generate:key
    ```

    Copy the generated secret key and paste it to the `.env` file

    ```bash
    # .env
    JWT_SECRET=<GENERATED_SECRET_KEY>
    ```

8. Run the app

    ```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
    ```

9. You can manage your database by using `Prisma Studio`

    ```bash
    # open prisma studio
    $ npx prisma studio
    ```

    ![Prisma](https://github.com/DiziASP/seleksi-3-labpro-ss-be/blob/master/.github/images/prisma.png?raw=true)

    <p align="right">
    <sub>(Preview)</sub>
    </p>

## Docker

You can also run the application using Docker. Make sure you have Docker installed on your machine.

1. **[Clone this](https://github.com/DiziASP/seleksi-3-labpro-ss-be.git)** repository to your local machine.

2. Create a `.env` file in the root directory of the project. The `.env` file should contain the following environment variables:

    ```bash
    JWT_SECRET=<YOUR_SECRET_TOKEN>
    CLIENT_URL=<FRONTEND_URL>
    PORT=8080
    NODE_ENV=<development|production>
    CORS_WHITELIST=<CORS_WHITELIST_URL>
    DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?schema=public
    DATABASE_HOST=<POSTGRES_HOST>
    DATABASE_USER=<POSTGRES_USER>
    POSTGRES_PASSWORD=<POSTGRES_USER_PASSWORD>
    POSTGRES_USER=<POSTGRES_USER>
    POSTGRES_DB=<POSTGRES_DB>
    ```

3. Build and Run the Docker Container using Docker Compose. Make sure your PostgreSQL server is not running on your machine.

      ```bash
      docker-compose up
      ```

4. Change the `DATABASE_URL` in the `.env` with the docker postgresql container instance and build it again using

      ```bash
      docker-compose up --build
      ```

5. Your docker is up and running. Open the website url `http://localhost:8000/` on your browser.

   ![Docker](https://github.com/DiziASP/seleksi-3-labpro-ss-be/blob/master/.github/images/docker.png?raw=true)

## Tech Stack

 ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
 ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## My Design Patterns

* **[Singleton](https://refactoring.guru/design-patterns/singleton)**

    The Singleton design pattern is a software design pattern that restricts the instantiation of a class to one object. This is useful when exactly one object is needed to coordinate actions across the system. This pattern is used in this project on `JwtService` class. JWT class is global for the whole application and cannot be instantiated other than in the `app.module.ts` All you need to do is inject the class in the constructor of the class that you want to use.

    ```typescript
    // src/auth/auth.service.ts
    @Injectable()
    export class AuthService {
      constructor(
        private readonly usersService: UsersService, // Injected Class
        private readonly jwtService: JwtService, // Injected Class
      ) {}

      // ...
    }
    ```

* **[Dependency Injection](https://www.tutorialsteacher.com/ioc/dependency-injection)**

  Dependency Injection (DI) is a design pattern that allows the creation of dependent objects outside of a class and provides those objects to a class through different ways. Using DI, we move the creation and binding of the dependent objects outside of the class that depends on them. `@Injectable()` decorator in NestJS provides way to inject a class into another class.

* **[Chain of Responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility)**

  Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain. This was used in the Interceptors and Filters because the catch a request in the middle of the transaction and process it before it reaches the controller and vice versa. Take a look at this `transform.interceptors.ts` file.

  ```typescript
  // src/interceptors/transform.interceptor.ts
  export interface Response<T> { // Response Interface
    status: 'success';
    message: string;
    data: T | null;
  }

  @Injectable()
  export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
  {
    intercept( // Intercept the request
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => ({ // Map the response with this format
          status: 'success',
          message: getReasonPhrase(
            context.switchToHttp().getResponse().statusCode,
          ),
          data: data || null,
        })),
      );
    }
  }
  ```

## Bonus

* **B01 - OWASP**

    Beloman cok.(coba class-validator dan DTO pattern bisa kebal dari SQL Injection)

* **B02 - Deployment**

    The application is deployed on railway. You can access the API [here](https://seleksi-3-labpro-ss-be.up.railway.app/).

* **B03 - Single Service Implementation**

    The single service is implemented using TypeScript. The configuration for the TypeScript are as follow:

    ```json
    // tsconfig.json
    {
    "compilerOptions": {
      "module": "commonjs",
      "declaration": true,
      "removeComments": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "allowSyntheticDefaultImports": true,
      "target": "ES2021",
      "sourceMap": true,
      "outDir": "./dist",
      "baseUrl": "./",
      "incremental": true,
      "strict": true,
      "skipLibCheck": true,
      "strictNullChecks": false,
      "noImplicitAny": true,
      "strictBindCallApply": false,
      "forceConsistentCasingInFileNames": true,
      "noFallthroughCasesInSwitch": false
      }
    }
    ```

* **B04 - Polling**

    Not Implemented.

* **B05 - Lighthouse**

    This bonus is implemented on the [monolith](https://github.com/DiziASP/seleksi-3-labpro-monolith).

* **B06 - Responsive Layout**

    This bonus is implemented on the [monolith](https://github.com/DiziASP/seleksi-3-labpro-monolith).

* **B07 - API Documentation**

    The API Documentation is available on the website's [API Documentation Page](https://seleksi-3-labpro-ss-be.up.railway.app/api).

    Implemented with [Swagger](https://swagger.io/).

* **B08 - SOLID Principle**

    The SOLID principle in this project are the following:

  * **S**ingle Responsibility Principle

    Some class in this project has a single responsibility. For example, the `AuthService` class has a single responsibility which is to handle the authentication process.

  * **O**pen-Closed Principle

    Some class in this project is open for extension but closed for modification. For example, the `NestInterceptor` interface are open for extension because it can be implemented to other classes such as `TransformInterceptor` but closed for modification because we don't need to modify the `NestInterceptor` interface at any way.

  * **L**iskov Substitution Principle

    Some class in this project can be substituted with its subtypes. For example, in the `UpdateBarangDTO` class the fields are actually comes from `CreateBarangDTO` class which is the parent of the UpdateBarangDTO class. We can actually use the `CreateBarangDTO` class to update the barang but we use the `UpdateBarangDTO` class instead because we don't need some of the fields and also `{ OmitType, PartialType }` enables the class to have optional fields.
  
  * **I**nterface Segregation Principle

    Some class in this project has multiple interfaces that are specific to the client. For example, `Barang` has entity interfaces `BarangEntity` that are specific to `Barang`. The `BarangEntity` interface is used to return the data to the client.
  
  * **D**ependency Inversion Principle

    Some class in this project depends on abstractions rather than concrete implementations. For example, the `AuthService` class depends on the `UsersService` class and the `JwtService` class. The `UsersService` class is an abstraction of the `Users` entity and the `JwtService` class is an abstraction of the `@nestjs/jwt` library.

* **B09 - Wireshark**

    Beloman Cok.

* **B10 - Automated Testing**

    Beloman cok.

* **B11 - Additional Feature**

    This bonus is implemented on the [monolith](https://github.com/DiziASP/seleksi-3-labpro-monolith).

* **B12 - FE Admin Bug**

    Not Implemented.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Other
<!-- 
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

 -->
