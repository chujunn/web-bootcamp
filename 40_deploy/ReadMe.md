#Basic Heroku Cli

``` bash
# Login
$ heroku login

# Create an app on Heroku
$ heroku create

# Deploy the code to remote github repo
$ git push heroku master

# Check the log
$ heroku logs

# Open the URL
$ heroku open
```

#Notes
1. Remember to add start script in package.json

```js
"start": "node app.js"
```

2. Must use env variables to set the port and ip

```js
app.listen(process.env.PORT, process.env.IP);
```

