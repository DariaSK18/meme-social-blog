# Meme Social Blog

**Meme Social Blog** is a full-stack web application built with **Node.js**, **Express**, **MySql**, **Sequelize**, **React**, and **Vanilla JavaScript** for posting and viewing memes. Users can register, login, manage their profiles, upload memes, deleting, like, comment users and their own posts and explore content created by others. The platform features a modern UI with search, tags, and date formatting for posts.

Deployed on Render: [https://meme-social-blog.onrender.com/](https://meme-social-blog.onrender.com/)

---

## Features:

- User authentication (register, login, logout), passwords are hashed with bcrypt
- Password change and profile deletion
- **CRUD operations** for meme posts (Create, Read, Update, Delete)
- MySQL database managed through Sequelize ORM.
- Clear client–server architecture (frontend + backend). 
- Optional seed data for testing and development. 
- Display the latest 10 posts on the homepage (using pagination)
- Blog tags and search functionality
- **User session management** with cookies
- Responsive UI
- Date formatting using dayjs

---

## Technologies Used:

**Frontend:**  
- React  
- JavaScript / JSX  
- CSS

**Backend:**  
- Node.js
- Express
- Sequelize ORM
- MySQL

**Authentication:** 
- Passport.js
- bcrypt
- Middleware for validation and error handling

**Deployment:**
- Render.com

**Other:**  
- Environment variables with `.env`  
- npm scripts for development and production  
- Seed data utilities 

---

## Installation & Setup:

1. Clone the repository:

```bash
git clone https://github.com/MemeSocialTeam/meme-social-blog.git
cd meme-social-blog
```

2. Install dependencies:

- Backend
```bash
cd server
npm install
```
- Frontend
```bash
cd client
npm install
```

3. Create and configure the database:

```bash
mysql -u root -p
```
inside MySQL:
```bash
source server/db/schema.sql
quit;
```

4. Create a .env file in the client and server directory and add (use .env.example files to set it up):

- Frontend
```bash
VITE_API_URL=your_localhost_url
```
- Backend
```bash
SECRET_KEY=!!!SECRET!!!
DB_DATABASE=meme_social_db
DB_USERNAME=root
DB_PASSWORD=!!!PASSWORD!!!
DB_HOST=localhost
DB_DIALECT=mysql
DB_PORT=3306

COOKIE_SECRET==!!!SECRET!!!

FRONTEND_URL=your_localhost
NODE_ENV=development

CLOUDINARY_API_KEY=!!!SECRET!!!
CLOUDINARY_API_SECRET=!!!SECRET!!!
CLOUDINARY_CLOUD_NAME=!!!SECRET!!!
```

5. (Optional) Seed the database:

```bash
npm run seed
```

6. Start the server and client:

- Frontend
```bash
npm run dev
```
- Backend
```bash
npm run dev
```

7. Open your browser and go to:

Frontend runs on 
```bash
http://localhost:5173
```
Backend runs on 
```bash
http://0.0.0.0:3000 
(depending on your .env)
```
---

## Future Improvements

- Implement user profiles with avatars and personal pages
- Add follower/friends system to build user connections
- Add notifications (new comments, likes, followers, etc.)
- Add direct messages or chat between users
- Add report system for inappropriate content 
- Add unit tests, integration tests, and API tests
- Deploy full CI/CD pipeline (GitHub Actions) 

---

Feel free to submit issues and pull requests to improve Meme Social Blog. Contributions are welcome!

**Happy Meme-ing! Happy socialising!**
