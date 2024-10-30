<h1 align=center> Fitness Workout Tracker API</h1>
<h1>Overview</h1>
<img src="https://assets.roadmap.sh/guest/fitness-workout-tracker-82uux.png" alt="project architecture">

<p>The Fitness Workout Tracker is a backend application designed to help users create, manage, and track their workout schedules. 
  This project allows users to log exercises, provide feedback on their workouts, and view their workout history. 
  The primary focus is on user-specific data storage and enhancing the workout experience with customizable features.</p>
.</p>


<h3>Key Features</h3>
<ul>
    <li><strong>User Authentication</strong>: Implemented a secure user sign-up and log-in flow using JWT for authentication, ensuring a personalized experience for multiple users.</li>
    <li><strong>Workout Management</strong>: Users can create workouts consisting of multiple exercises, track their progress, and update their workouts with personal comments.</li>
    <li><strong>Date-Time Management</strong>: Each workout is associated with a specific date, allowing users to list active, pending and completed workouts sorted by date.</li>
    <li><strong>Progress Reporting</strong>: Users can access reports of their past workouts, including the total number of completed workouts and total exercises performed.</li>
    <li><strong>Custom Comments</strong>: Users can add a comment for each workout, detailing how they felt and any adjustments they might want to make in the future.</li>
</ul>



<h4>Project idea from: <a href="https://roadmap.sh/projects/fitness-workout-tracker">https://roadmap.sh/projects/fitness-workout-tracker</a></h4>

<h2>How to Run the Project</h2>

<ol>
  <li><strong>Clone the project repo</strong></li>
  <pre><code>git clone https://github.com/NAJIB-B/fitness-workout-tracker.git</code></pre>

  <li><strong>Navigate into the project directory</strong></li>
  <pre><code>cd fitness-workout-tracker</code></pre>

  <li><strong>Install the dependencies</strong></li>
  <pre><code>npm install</code></pre>

  <li><strong>Create your own MongoDB database</strong></li>
  <p>(I used <a href="https://www.mongodb.com/products/platform/atlas-database">MongoDB Atlas</a>)</p>

  <li><strong>Create your <code>.env</code> file</strong></li>
  <pre><code>touch .env</code></pre>

  <li><strong>Add the following environment variables</strong></li>
  <p>Populate the <code>.env</code> file with the following variables, replacing the placeholders with your own details:</p>

  <pre><code>DATABASE="mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/&lt;database-name&gt;?retryWrites=true&amp;w=majority&amp;appName=Cluster0"
JWT_SECRET=&lt;your-access-token-secret&gt;
JWT_EXPIRES_IN=&lt;time-for-expiry&gt;
  </code></pre>



  <li><strong>Run the project</strong></li>
  <pre><code>npm start</code></pre>
</ol>
