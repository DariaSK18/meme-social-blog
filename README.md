# Meme Social Blog


Meme Social Blog is a Meme sharing app for artists, developers and any kind of users built with React for the frontend and a Sequelize/Node/MySQL/Cloudinary backend. 
This application provides a robust platform for everyone to share and upload their memes.

We developed essential components such as:
1. **Authentication**: We implemented a user login, logout, and registration system. 
2. **User Interaction**: We implemented data input forms, search bar, pagination and APIs.


## Features
React-powered frontend for a dynamic user experience
Sequelize ORM for seamless database interactions
MySQL backend for efficient data storage 
Cloudinary to store uploaded pictures
Node.js server for handling API requests
Full-stack integration with streamlined development workflow

## Installation
Follow these steps to install and set up Meme Social Blog locally:

### 1. Clone the Repository
``` bash
git clone https://github.com/MemeSocialTeam/meme-social-blog.git
cd MemesArt
```

### 2. Create the Database
Open a terminal and enter MySQL:
``` bash
mysql -u root -p
```
Enter your MySQL password when prompted, then create the database by running:

source server/db/schema.sql;
quit;

### 3. Install Dependencies
Run the following command in the root directory to install dependencies for both server and client:
``` bash
npm install
```

### 4. Set up Environment Variables
Copy .env.example file in the server folder, to cerate .env files. In the server folder, ** change your MySQL password **

> DB_PASSWORD=!!!PASSWORD!!!

### 5. Seed the Database (Optional)
If you want to populate the database with sample data, run:
``` bash
npm run seed
```

### 6. Start the Application
Run the following command to start the development server:
``` bash
npm run dev
```

The application should now be running locally.

## Usage
- Open your browser and navigate to (http://localhost:5173) to access the Meme Social Blog application.
- Explore features such as uploading memes, give likes and share your favourite meme.
The Sequelize/NodeJS backend can be accessed via (http://0.0.0.0:3000)
Contributing
Feel free to submit issues and pull requests to improve Meme Social Blog. Contributions are welcome!

Happy Meme-ing! Happy socialising!