Hi 
Below is a step by step procedure on how to run the project 
Make sure you have postgres installed in the system 
After cloning the repo please run npm install separtely inside both frontend and backend folders to install the necessary dependencies
In pg admin create a database with a name of chatbot and connect to it by putting in the correct user, host, database, password and port in db.js inside the backend folder once that is done the backend will be connected to 
the database 
After that in order to create the tables run the command : npm run create-tables 
This will run the createTables.js script file which will create the necessary tables for the functioning of the backend 
Now we populate the database with some dummy data which is needed for the ui and backend to work smoothly, to do that run the command: npm run add-seed-data
Once that is done we are ready to run the backend, use the command: npm run start
You will see the message: "Server is running on port 5000" in the console
Now to run the frontend cd into the frontend folder and run npm run start
The application will look something like this intially: 

![intial](https://github.com/megu2820/chatbot/assets/66476812/0d901896-e5d8-46f7-913c-54e15d63853e)

After that u can start sending messages to the bot, currently the bot will reply only three times in this version: 

![new](https://github.com/megu2820/chatbot/assets/66476812/d0440aff-ecc4-444c-8f2a-ca08746b2185)

In case of any queries feel free to reach me 

Thanks 
Megha
