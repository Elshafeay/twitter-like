<p align="center">
  <img src="resources/images/nestjs-graphql.png" alt="tech stack"/>
</p>

## Description

Twitter-like project, built with a purpose of trying a completely new stack to me.
It has some basic twitter features like (Tweeting - Liking Tweets - Following someone - Searching for users)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

now you can access it through **localhost:3000/graphql**


## Documentation

It's provided by GraphQL Playground. So once you run the server and go to */graphql* you can click on **docs** to see all queries and mutations you can do.

<p align="center">
  <img src="resources/images/docs.png" width=800 height=500 alt="docs"/>
</p>

#### **Please Notice:**
- All the queries and mutations -except for login & signup of course- require Authentication. <br>So you need to create an account using *signup()* mutation and then log in.

- when you login, you will be provided with a Bearer token that you can use in your requests header.<br>
If you want to use GraphQL Playground, Something like this <br>``` { "Authorization": "Bearer then_put_your_token_here" }``` should be added to the Query Variables *HTTP HEADERS* area at the bottom left. 

- **homeTweets()** brings the latest tweets from the people you're following + your latest tweets Compined and ordered by latest.  # represents the home page

- **userTweets()** brings the latest tweets from a specific user. # represents that user's profile

- **homeTweets()** and **userTweets()** can take optional parameters *offset* and *limit*, which are set by default to 0 and 20 accordingly.

- **updateTweetLike()** and **updateFollowing()** act like a toggle button. <br>
So if you used **updateTweetLike()** on some tweet, It will be liked.
but if you used it again on the same tweet the like will be removed. same as **updateFollowing()** to follow/unfollow a specific user.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
