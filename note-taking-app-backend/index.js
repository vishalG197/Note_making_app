 const express =require('express');
//  require("dotenv").config();
 const app = express();
const connection=require("./db")
const cors =require("cors");
const NotesRouter = require('./router/NotesRouter');
const userRouter =require("./router/userRoutes")
app.use(cors())
app.use(express.json());
app.use("/notes",NotesRouter)
app.use("/users",userRouter);

app.get("/",(req,res)=>{
   res.setHeader("Content-Type", "text/html");
   res.status(200).send(`<!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Server Home Page</title>
     <style>
       body {
         font-family: Arial, sans-serif;
         margin: 0;
         padding: 0;
         background-color: gray;
       }
   
       .header {
         background-color: #333;
         color: white;
         text-align: center;
         padding: 1rem;
       }
   
       .container {
         max-width: 800px;
         margin: 0 auto;
         padding: 2rem;
         background-color: white;
         border-radius: 10px;
         box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
       }
   
       .welcome-message {
         font-size: 24px;
         text-align: center;
         margin-bottom: 1.5rem;
       }
   
       .content {
         font-size: 16px;
         line-height: 1.5;
         color: #444;
       }
   
       .footer {
         text-align: center;
         margin-top: 2rem;
         color: #888;
       }
     </style>
   </head>
   <body>
     <div class="header">
       <h1>Server Home Page</h1>
     </div>
     <div class="container">
       <div class="welcome-message">
         Welcome to the server's home page!
       </div>
       <div class="content">
         This is where you can provide information, links, or any content relevant to  server.
         <div class="welcome-message">
         <br/>
         <br/>
          <a href="/users">/users</a> 
          
          <br/>
          <a href="/notes">/notes</a> 
                   <br/>
          </div>
       </div>
     </div>
     <div class="footer">
       &copy; 2023 vishu server.
     </div>
   </body>
   </html>
   `)
})
// const PORT = process.env.PORT || 8080;
app.listen(8080, async () => {
  try {
    await connection; // Await the database connection
    console.log('Connected to the database');
    console.log(`Server is running at http://localhost:${8080}`);
  } catch (err) {
    console.error('Connection to the database failed');
    console.error(err);
  }
});
   