

# Express Auth (with Sessions)

### Learning Objectives
- Explain Authentication vs Authorization 
- Encrypt a user's password and store a hashed password in the db
- Verify a user's password submission against an encrypted password
- Receive, store, and attach an authorization web token to a JSON api request
- verify an Authorization token in Express using passport and handle both the success and error cases;


## Intro: Who are you and what are you allowed to do?

> You go to a bank to withdraw some money for a fancy dinner you've planned for tonight.  Making your way to the front of the line, the teller asks for either a driver's license or an ATM card.  You present your license and ask to make a withdrawal from a checking account with a number which you (quietly) read to the teller.  The helpful teller checks to make sure that there are sufficient funds in the account and that you are allowed access to the account, and finally hands you the money.  You win.

What's going on in the above anecdote?  Perhaps without noticing it, we've just seen how the two participants enacted a particular authentication and authorization policy.  First, the teller requested that the account holder *prove they are who they say they are*.  Next, the account holder made a request for a particular action, viz., to withdraw funds from a particular account.  The teller checks to make sure that the person the account holder purports to be is authorized to make that particular request, i.e., they are an account holder or something similar for that account.  There's also a side step about sufficient funds, which is arguably a piece of the auth puzzle, but not something we'll worry too much about here.  

Further, there's another (minor) step in the process when the account holder first walks in and is presents as a "guest" to the bank.  Such a state could be described as *stranger danger*, but could also be thought of as *the public*.  Both connotations have their own utility; *stranger danger* I shouldn't trust someone to perform certain actions until I can verify who they are, but on the other hand I have to present some mechanism for randos to get to know me before I ask them to hand over potentially private and sensitive pieces of verifying information, e.g., a driver's license.


> In community the individual is; dialectically, the individual is crucial as the prior condition for forming a community, and within the community the individual is qualitatively essential and can at any moment rise above 'community', that is, as soon as 'the others' give up the idea.  What holds community together is that each is an individual, and then the idea.  The public's cohesion, or its looseness, is that numerality is everything. Every individual in the community guarantees the community; the public is a chimera. In community the single individual is the microcosm who qualitatively repeats the macrocosm; here is a c ase of unum noris omnes in the good sense. In the public there is no single individual, the whole is nothing; here it is impossible to say unum noris omnes, for here there is no One. 'Community' is no doubt more than a sum, but is truly still a sum of units; the public is nonsense: a sum of negative units, of units that are not units, that become units with the sum, instead of the sum being a sum of units.

~ Søren Kierkegaard, Journals

Ouch.  Public interfaces are a necessary piece of any modern web app, or else how could users be _authenticated_, but the work of individuating members of the public into verified users and then appropriately _authorizing_ them to perform a known set of operations pays dividends.

### Authentication vs Authorization
Are you who you say you are?  Prior to being a _known user_ a guest account or public user must be treated as an anonymous, unknown person.  After submitting some private information that only that person would know, do we treat a user as a particular user in our system.  

If we give particular privileges to some users and not others, e.g., an admin user can reset any other user's password, then we say that some users are *authorized* to perform particular actions while others have not been so *authorized*.

## How do we authenticate a User in a web app?
There are two pieces to the authentication puzzle in web apps.  First, we could have a user tell us a password and a unique username, and then ask them to give us the password again any time they want to log in to the app.  Unfortunately, since HTTP is a _stateless_ communication protocol, any individual request has no immediate relation to any other request.  Thus, all requests, at least initially, must be treated as coming anonymous public guest users.

![stranger danger](assets/download.jpg)

If a particular request is received, e.g., a `POST` request with a valid `username` and `password` in the request body, we could then verify or _authenticate_ that particular request as coming from a verified user.  But, given the current scheme, that would require every request be a `POST` with those same fields for any request to be _authenticated_.  
And that dog just isn't gonna hunt.

### Give me a cookie (or token)
![cookie](assets/cookie.jpg)

To amend our requests and make them stateful, we can attach a token to each request.  A token is an encoded bit of information (potentially) including a *timestamp*, a *domain name* from the issuing site, and some other public info.  In theory, no one should be able to read the data inside a token except the issuing website, but in practice this doesn't really hold.  So don't put a user's Social Security # or other crucial info in tokens.

To learn more about json web token, or *jwt*, check [this](https://jwt.io/introduction/) out.

### A workflow
Briefly described, here's a basic workflow of token-based authentication in an example express app.  A user goes to `mywonderfulmemeapp.com` and sees a helpful landing page.  The user clicks on a link to add a new meme to the meme collection.  The server receives the request, and looks to see if there is an authorization header attached to the request.  Having not found a token (or an invalid one), the server redirects the user to a login page.  The user fills out their username and password and hits submit.  A `POST` request  is sent to the server with the username and password in the request body, and the server verifies that the username exists, and that the password is correct (more on this momentarily).  Then, using the `express-session` middleware, the server attaches a token to the response which includes identifying information about the user as well as an expiration date and information about the above domain name.  The user is redirected to the create meme page, where they successfully fill out the relevant form, submit another `POST` request, this time with the auth token attached.  The `express-session` middleware inspects the token, validates it, and then passes on the request to the create meme handler.

You win!

#### A Note on passwords
As you may have guessed.  Passwords and tokens act a bit like golden keys.  Once someone has one, they can pretty much do anything that particular user is authorized to do.  We can clear out a token--by forcing the token to expire by changing the secret salt value with which the token was encoded--but we can't really delete someone's password.

But can't we just tell them we accidentally leaked their password and then make them pick a new one?  Well, not really.

One issue is that despite being told not to, most users still use the same password for almost everything.  So if one place leaks it, their accounts elsewhere could be compromised.  Second, what if we don't know our systems are breached and a password stolen?  The only real solution is to not store a user's password in the first place.  But then how can we remember what was each time a user wants to login?

## Hashing and Encryption
What's the difference?  We can both `encrypt` and `unencrypt` a particular piece of information.  But have you ever heard someone talk about `un-hashing`?  _probably not_.

From the venerable _wikipedia_:
> In cryptography, encryption is the process of encoding a message or information in such a way that only authorized parties can access it and those who are not authorized cannot. Encryption does not itself prevent interference, but denies the intelligible content to a would-be interceptor.

So encryption is akin to a secret message that can be encoded and decoded at some later date.  We could encrypt a user's password, but then we would still have to decode it and keep either one in a database.  In the event of a system breach, an attacker could probably gain access both to the encoded password and whatever means we have for decoding it, thus throwing us back in the original conundrum.

Now, we come to the magic of one-way functions, in this case also known as "cryptographic hash functions".
One way to think about it is if I took a piece of paper, wrote down my password on it, and then in a very specific order, tore the paper into a determined number of pieces, burned some subset of the pieces, then tore a determined number of those pieces, and maybe dropped them in soda.  The result would be a mess, bear little resemblance to the original piece of paper and message, but importantly, _if I repeat the exact same process to another piece of paper with the same message I would get the exact same kind of mess_, thereby ensuring that the first message was identical to the second, even though I only remember the shape of the resulting mass after applying this very detailed and thorough method of destroying it.

### Behold

#### *Warning*
try not to replicate this example directly since it uses `hashSync` which is not ideal in web apps.  It was used here to make the terminal example clearer.

```javascript
> const bcrypt = require('bcrypt')
undefined
> const password = 'my secret'
undefined
> const password_digest = bcrypt.hashSync(password, 11)
undefined
> bcrypt.compareSync('not the right password', password_digest)
false
> bcrypt.compareSync('my secret', password_digest)
true
```
So make ensure to hash your user's passwords into a `password_digest` and store that in the DB.

The async/await version would look something like this:

```js
const makeHash = async (str) => {
  const hashedVal = await bcrypt.hash(str, SECRET);
  return hashedVal;
};
```

### Hackety Hack: Bcrypt Mini-Lab
- create a scratch directory and run `npm init`
- Install `bcrypt` with `npm`
- Make an `app.js` file and `require` bcrypt
- Define a constant `SECRET` at the top of the file and give it some integer
- write an async function `hash` that takes a single argument `password` and returns the hashed password
- Try writing a `main` function that calls `hash` and logs out the hashed value

### Bonus: 

_you can refer to the demo directory for guidance_

- install sequelize and pg
- make a scratch db
- define a User model with a username and password
- Check out the [sequelize docs on hooks](http://docs.sequelizejs.com/manual/tutorial/hooks.html) and try to add a `beforeCreate` hook that automatically hashes a user's password
- Inside `app.js` try to create a user by passing a normal text password and try to verify that only the hashed version gets saved.

## Creating a Token

In order to emulate validating that a user is who they say they are each time they make a request, the client can send a token to the server in order to secure access to protected endpoints or data.  The token is passed to the client right after either registering or logging in.

We can use the `jsonwebtoken` library to "sign" or generate tokens.  We'll encode a user's id and username (and potentially other useful public information to save) within the token so when we decode the token, we can reconstruct a trusted piece of user information that uniquely identifies that user.

For example, a registration route might look something like this (`sign` has been imported from another file from the app):

```js
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const { id, username, nationality } = user.dataValues;
    const token = sign({
      id,
      username,
      nationality
    });
    res.json({user, token});
  } catch(e) {
    console.log(e);
    res.status(500).json({msg: e.message});
  }
});
```

`sign` will take an object to encode in the token, and that is the payload that will be decoded when the user passes the token back to the server.

What does `sign` look like?

```js
const jwt = require('jsonwebtoken');
const SECRET = "please don't tell";
const sign = (payload) => jwt.sign(payload, SECRET);
```

Well that isn't so bad.  In practice `SECRET` would be saved as an .env variable or something similar.  The `sign` function from `jwt` ensures that only the data we intend to be part of the token is decoded when we receive the token back.

With this scheme, we could conceivably generate and send a token to the client.  But how does the token get back to us?  We'll attach it as an `Authorization Bearer` token with `axios`.

```js
const resp = await axios.get(`${BASE_URL}/sodas`, {
	headers: {
		'Authorization': `Bearer ${token}`
	}
});
```

This header will be visible from the `Network` tab in Chrome's DevTools under `Request Headers`.

We're almost there!  Now that the token is being passed back to the server to validate a user's identity, how will we decode and verify it?

Well.  This is where things get a little hairy.  We'll use several other libraries associated with [`passport`](https://www.npmjs.com/package/passport), a user auth library often used when writing Express servers.jj\l

Ultimately, we can "protect" or privatize a route using a passport middleware function like so:

```js
app.get('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({msg: 'logged in'});
});
```

If the client does not send a valid token, this route will reject the request with an error code of `401` or 'Unauthorized'.

We'll need to do just a little bit of configuration to get passport set up.  This is a little hairy, but once you get through it the benefits are pretty good.

```js
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('./models');

const jwt = require('jsonwebtoken');
const SECRET = "please don't tell";
const sign = (payload) => jwt.sign(payload, SECRET);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

passport.use(new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id);
    return done(null, user);
  } catch(e) {
    return done(e, false);
  }
}));



module.exports = {
  passport,
  sign
};
```

The crux of this code is to tell passport to use a jwt strategy and look in the Authorization Header for a Bearer token.

Further, we can have express look up a user and pass that information along to an endpoint, e.g., in order to fetch all of the tweets for just that user or something similar.

```
app.get('/currentuser', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({msg: 'logged in', user: req.user });
});
```

`YAY`
## All Done!
![meeseeks](assets/meeseeks.png)


## References
- http://expressjs-book.com/index.html%3Fp=128.html
