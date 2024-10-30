<h1 align=center> Fitness Workout Tracker API</h1>
<h1>Overview</h1>
<img src="https://assets.roadmap.sh/guest/fitness-workout-tracker-82uux.png" alt="project architecture">

<p>The Fitness Workout Tracker is a robust backend application designed to help users manage their workout routines effectively. 
  The application supports user sign-up and secure authentication via JWT, allowing users to create, schedule, and track their workouts seamlessly.</p>

<h2>Key Features:</h2>

<h3>User Authentication:</h3>
<ul>
    <li>Implemented a secure user sign-up and log-in flow using JWT for authentication, ensuring a personalized experience for multiple users.</li>
</ul>

<h3>Workout Creation:</h3>
<ul>
    <li>Users can create workouts by selecting from a list of 30 predefined exercises or adding their own custom exercises.</li>
    <li>Workouts can be scheduled for specific dates and set as one-time or recurring sessions.</li>
</ul>

<h3>Workout Management:</h3>
<ul>
    <li>Users can view all their workouts categorized by status: pending, active, missed, or completed.</li>
    <li>Completed workouts can be marked as done, and recurring workouts will be automatically rescheduled for the following week.</li>
</ul>

<h3>Comments & History:</h3>
<ul>
    <li>After completing a workout, users can optionally add comments to reflect on their experience.</li>
    <li>Users can access their workout history to review completed workouts and comments.</li>
</ul>

<h3>Progress Reports:</h3>
<ul>
    <li>Users can generate reports detailing their total completed workouts and exercises performed, aiding in tracking progress over time.</li>
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
