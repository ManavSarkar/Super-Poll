# Super Poll

This is a **polling application**. We can create polls as well as participate in them. Participation is unique since we can participate from one account only.

There are lots of features that are to be implemented. If you want to contribute, you first need to setup the development environment.

## Required Environment:

 - System capable of running React as well as Node.js.
 - MongoDB Account.

## Steps to setup:

 1. Clone to project by forking.
 2. Then in the project directory, enter the following code.

    npm install
    cd client/
    npm install

 3. Now create a file .env in the project directory(not in client folder).
 4. Write the following fields.

     AUTH_COOKIE="auth-cookie"
    
    CONNECTION_PORT="CONNECTION_PORT_RECEIVED_FROM_MONGODB"
    
    SECRET_KEY="ANYKEYTHATYOUWANTENOUGHLONG"

 5. In the client/ folder, inside the package.json file, add the following line before dependencies,

    "proxy": "http://localhost:5000/",

 6. Now start the server using the command `npm run dev` and inside the client/ folder, `npm start`. Your application will launch in our default browser.
Hooray! you have successfully setup the project in your local machine.

If you found any issues, mention them in issues section. 
Thank you, Happy Coding. 
