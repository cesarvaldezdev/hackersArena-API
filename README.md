# Hacker's Arena - API

Compete with the best developers and challenge yourself!
Hacker's Arena is a web-space where programmers around the world can improve their coding skills and prove who are the best coder.
Everyday you can learn something new, and show everyone other ways to solve problems.

## Our goal

Give to all the programmers around the world a web-page where they can learn, practice and challenge others (and theirselves) everyday, solving problems made and approved by the community.  

We hope to finish in the first weeks of december, and let everyone try this project.

## Modules and funtionalities

In Hacker's Arena you can:
- Submit new problems
  - If you have a challenge, you can submit it with a solution and other people we'll be able to solve your challenge.
- Solve problems submited by another programmers like you
  - You can checkout the available problems and prove your coding skills.
- Evaluate the problems before  
  - If you think a problem is not good enough, you can also evaluate before it is available for everyone.
- See how you are ranked in contests
  - Once a while you'll see the medall you win in a contest.

## Users and permissions

### Unregistered users
- The users can only see other users challenges, and  leaderboards.

### Registered users
For register you can create an account filling a formulary with an email.
- The users can customize their profiles: Add a profile picture, university, country, etc.  
- The users can submit problems.  
- The users can review another people's problems.
- The users can see their ranks in contests, and leaderboards.

### Admin users
Only can be created by another admin.
- The users can do everything as a registred user.
- Can add, update, and delete registered users.
- Checkout the webpage.

## Get Hacker's Arena API

These instructions will help you to get you a copy of the project up and running on your local machine for development and testing purposes.

### Before you get started

For this project you need:
- [Node.js](https://nodejs.org/en/)
- [Async](https://caolan.github.io/async/)
- [Google-Cloud](https://cloud.google.com/storage/docs/gsutil_install)
- [Crypto](https://www.npmjs.com/package/crypto-js)
- [Express](http://expressjs.com/es/starter/installing.html)
- [Knex](https://knexjs.org/)
- [MySQL](https://www.npmjs.com/package/mysql#install)
- [Process](https://www.npmjs.com/package/process)
- [Prompt]()
- [Body-parser](https://nodejs.org/en/)


### Install

First you need to clone this repository

```
$ git clone https://github.com/MatchaFierce/hackersArena-API.git
```
And move to the repository.
```
$ cd hackersArena-API
```
Then install dependencies
```
$ npm install
```
And run the app
```
$ npm start
```

## Hosting
The server is hosted in Google App Engine using Google Cloud:
  - Url
```
https://hackersarena00.appspot.com
```

## Postman

- Download the two files contained in this Drive Folder
```
https://www.getpostman.com/collections/e49606021924977b848a
```
- Open Postman App and Import File for both files (one by one)
- Set Params to avoid conflicts
- Open Runner in Postman App (Use the provided Enviroment)

## Collaboration

* **Daniela Hérnandez** - [naekkeoya](https://github.com/naekkeoya)
* **César Valdez** - [MatchaFierce](https://github.com/MatchaFierce)
* **Franco Ramirez**  - [Franco1010](https://github.com/Franco1010)
* **Fernando**  - [fernandolp98](https://github.com/fernandolp98)

## License

This project is licensed under the MIT License.
