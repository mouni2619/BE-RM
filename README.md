## ReactMarkdown Backend
The backend of the ReactMarkdown project is responsible for managing user authentication, project creation, and storage of project details.
It provides RESTful API endpoints for user registration, login, password reset, and CRUD operations for projects.
The backend ensures data integrity and security by implementing validation and authentication mechanisms. 
It also handles file uploads and conversion of Markdown content to HTML or PDF format.
Additionally, the backend manages user sessions and permissions, ensuring that users can only access and modify their own projects.
Overall, the backend plays a crucial role in providing a robust and secure backend infrastructure for the ReactMarkdown application.

## Installation
- Clone the repository
- Install dependencies
  - cd reactmarkdown-backend
  - npm install
- Set up environment variables
- Create a .env file in the root directory and add the BASE-URL, PORT, MONGODB-URL
- Start the server
  - npm start

## API Endpoints
- User Registration

  **POST /register:** *Registers a new user with a username, email, and password. Checks if the email already exists in the database and 
  generates a hashed password before creating the user.*

- User Login

  *POST /login: Logs in a user with an email and password. Validates the credentials, generates a JWT token for authentication, and sends 
  it back to the client upon successful login.*

- Password Reset
  
  *POST /forgot: Handles the request for resetting a forgotten password. Finds the user by email, generates a password reset token, and 
  sends an email with a password reset link that expires after 10 minutes.*
  
  *POST /passwordReset: Resets the user's password. Uses the password reset token to verify the request and updates the user's password in 
  the database with the new hashed password.*

- Create a New Player

  *POST /players: Creates a new player. Requires authentication (auth middleware).*

- Get Players

  *GET /players/markdown/:id: Retrieves players using the getPlayers service method. Requires authentication.*
 
- Get Projects by Email

  *GET /players/projects/:email: Retrieves projects for a specific email address. Requires authentication.*
 
- Get Player by ID

  *GET /players/:id: Retrieves a single player by ID. Requires authentication.*
 
- Update Player by ID

  *PUT /players/:id: Updates a player by ID. Requires authentication.*
 
- Delete Player by ID

  *DELETE /players/:id: Deletes a player by ID. Requires authentication.*
## Technologies Used
- Node.js
- Express
- MongoDB
- Bcrypt
- JWT
- Nodemailer
