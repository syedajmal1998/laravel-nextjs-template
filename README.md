<p align="center">
    <h1>Laravel, Next.js, Typescript Template</h1>
</p>

See the [Original Frontend Part by @roketid](https://github.com/roketid/windmill-dashboard-nextjs-typescript) i just modified some staff


## Installation

``` bash
# clone the repo
$ git clone https://github.com/syedajmal1998/laravel-nextjs-template <project-name>
```
# Server Side
## Server Features
- session based auth
- role & permission based auth using [spatie-permission](https://spatie.be/docs/laravel-permission/v5/introduction)
- Authentication Logging using [laravel-authentication-log](https://rappasoft.com/docs/laravel-authentication-log)
- handing media like images and other attachments using [spatie-media-library](https://spatie.be/docs/laravel-medialibrary/v10/introduction)

## Server Installation

``` bash
# go into app's directory
$ cd <project-name>/server

# install app's dependencies
$ composer install

# copy .env.example to .env
$ cp .env.example .env

```

### If you choice to use MySQL

in file ".env" complete this database configuration:
* DB_CONNECTION=mysql
* DB_HOST=127.0.0.1
* DB_PORT=3306
* DB_DATABASE=laravel
* DB_USERNAME=root
* DB_PASSWORD=

#### If you choice to use SQLite

``` bash
# create database
$ touch database/database.sqlite
```
in file ".env" replace this database configuration:
* DB_CONNECTION=mysql
* DB_HOST=127.0.0.1
* DB_PORT=3306
* DB_DATABASE=laravel
* DB_USERNAME=root
* DB_PASSWORD=

To this:

* DB_CONNECTION=sqlite


### Next step

``` bash
# in your app directory
# generate laravel APP_KEY
$ php artisan key:generate

# run database migration and seed
$ php artisan migrate:fresh --seed
```

## Usage

``` bash
# start local server
$ php artisan serve
```

# Client Side

## Client Installation

First, install dependencies :
```bash
npm install
# or
yarn install
```

then, you can run the development server:

```bash
npm run dev
# or
yarn dev
```
> **_NOTE:_**  please make sure server is running.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.