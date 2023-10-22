# SOEN 341
***
## Objective
***
Learn how to work in teams by developing a web application with the Agile development approach.<br>
## Project
***
<h3> Description </h3> 
<p align="justify"> The team must create a Real Estate Web Application to allow the client to buy, sell, and rent properties. The website will offer a platform where the user will be able to narrow down the available properties based on their preferences and needs.
<br><br> Our platform should offer a user-friendly experience in which the visual interface of the program should be simple while highlighting the key features and functionalities implemented for the client. 
</p>

<h3>Key Features of our application</h3>


   1. <h4> Filtering System </h4>
      <p align="justify"> 
      The client will be able to find their ideal property by using our filtering system which allows the client to narrow down the available properties based on their preferences and needs. Such search functionalities include the property's location, the number of bedrooms, the price range, and much more. 
      </p>

   2. <h4> Property Visits </h4>
      <p align="justify">
      A calendar will be implemented to allow the client to book an appointment based on their availabilities to visit their property of interest.
      <br>The application should keep track of the booked appointments, in other words, reduce the available time slots based on the currently set appointments.
      <!-- //The user should be able to cancel their appointment. -->  
      </p>

   3. <h4> Visual Description of the Property </h4>
      <p align="justify">
      Under each property listing, multiple images depicting the different rooms, common areas, and exterior of the property will be made available to the client with a detailed description of the house. 
      Such descriptions include the dimensions of the house, the amount of bedrooms and bathrooms, the presence of an attic or a basement, the year the house was built, any major renovations made to the house, etc.
      </p>

   4. <h4> Choosing a broker </h4>
      <p align="justify"> 
      A list of brokers will be made available to the client to choose from, containing the brokers' contact information, their contract history, and previous clients' reviews and ratings.
      </p>

   5. <h4> Mortgage Calculator </h4> 
      <p align="justify"> 
      A mortgage calculator will be implemented to allow the clients to estimate their monthly payments based on their loan with the appropriate interest rate.
      </p>

   6. <h4>Additional Feature: Favorites </h4>
      <p align="justify"> 
      A "Favorite" feature will be implemented which allows the client to bookmark and save the listing of a certain property that they find interesting.
      Each "Favorite" property will be added to the "Favorite" list, where the client can easily access all of their saved properties.
      <br>
      This feature also includes a "Compare" functionality which allows the client to compare the different key features of two to three properties in a single page.
      </p>


## Team Members
***
### Alessandro Tiseo - 40262416 - Alessandro-Tiseo<br>
* Strengths: Java <br>
* Role: Front-end  <br>
### Amine Arrachid - 40263585 - Amine-Arrachid<br>
* Strengths: Java <br>
* Role: Front-end <br>
### Darren Vafi - 40246358 - d-vafi<br>
* Strengths: Java, JavaScript, PHP, Python, C, <br>
* Role: Back-end, Database Manager<br>
### Nao Lalancette - 40244431 - YeeHawCordinator2 <br>
* Strengths: Java, Git, PHP, JavaScript <br>
* Role: Back-end, Team Leader, Code Reviewer <br>
### Nooralmustafa Abbas - 40249828 - MusmusIRQ<br>

* Strengths: Java <br>
* Role: Full-stack<br>

### Richard Vo - 40236722 - SeroLycoris <br>
* Strengths: Java, JavaScript, HTML, CSS <br>
* Role: Front-end, Website Designer<br> 

## Technologies
***
<p align="justify">
The following list regroups the technologies that will be used to develop the Real Estate Web Application.
</p>

<ul>
   <li>Javascript</li>
   <li>Node.js</li>
   <li>Express.js</li>
   <li>Bootstrap</li>
   <li>MongoDB</li>
</ul>

<h3> Why JavaScript? </h3>

<p align="justify">
      
As a team, we chose to develop the web application by using JavaScript for both the front-end and back-end since
all the team members have prior experience with programming using this language, which would save time and resources
by avoiding learning a new programming language. 
</p>
<h3>Supporting Technologies</h3>
<h4>Back-End</h4>

<p align="justify">
For this project, we chose to use the most popular back-end framework for JavaScript, Express.js, since it is also compatible with Node.js. 
<br><br>
We have taken in consideration other popular frameworks such as Django for Python and Lavarel for PHP,
but we ultimately decided to opt with Express.js and Node.js since our team members feel more confident programming with JavaScript compared with Python or PHP.
Furthermore, we have concluded that JavaScript was the easiest language to learn with Express being one of the easier framework to program with.
On the other hand, Django is an excellent framework that requires a strong foundation in Python that works great for bigger projects, but not for smaller projects. 
Lavarel is also not difficult to learn,  but requires a lot of MVC framework knowledge in order to be operate properly. 
Unfortunately, only a few members from our team were familiar with Python and PHP. 
Thus, having the majority of the team having a prior experience working with JavaScript, Express was chosen for its easy and intuitive application, which Express is known to be good for beginners, for its scalability, and its efficiency.
</p>

<h4>Pros and Cons</h4>
<ul>
      <li>Express
            <ul>
                  <li>Pros:
                        <ul>
                              <li>Simple</li>
                              <li>Flexible</li>
                              <li>Scalable</li>
                              <li>Cross-Platform Compatible</li>
                              <li>Light Weight</li>
                              <li>Template Engine</li>
                              <li>Database Support</li>
                        </ul>
                  </li>
                  <li>Cons:
                        <ul>
                              <li>Frequent Software Updates</li>
                              <li>Lack of Structure</li>
                              <li>Limited Built-In Features</li>
                        </ul>
                  </li>
            </ul>
      </li>
      <li>Django
            <ul>
                  <li>Pros:
                        <ul>
                              <li>Fast Processing</li>
                              <li>Rapid-Development</li>
                              <li>Scalable</li>
                              <li>Lots of Functionality</li>
                              <li>Secure</li>
                        </ul>
                  </li>
                  <li>Cons:
                        <ul>
                              <li>Strong Python Foundation Required</li>
                              <li>Monolithic</li>
                              <li>Not Good for Small Projects</li>
                        </ul>
                  </li>
            </ul>
      </li>
      <li>Lavarel
            <ul>
                  <li>Pros:
                        <ul>
                              <li>Simple</li>
                              <li>Secure</li>
                              <li>Robust Deployment</li>
                              <li>Good Integration</li>
                              <li>Template Engine</li>
                        </ul>
                  </li>
                  <li>Cons:
                        <ul>
                              <li>Frequent Software Updates</li>
                              <li>PHP Foundation Required</li>
                              <li>Unoptimized Performance Efficiency</li>
                              <li>Not Intuitive/Confusing</li>
                              <li>Steep Learning Curve</li>
                        </ul>
                  </li>
            </ul>
      </li>
</ul>
<p>
As such, Express is the preferred framework for our team to use for its simplicity, flexibility, scalability, and template engine.
For this project, we believe that we can produce a better product through JavaScript and save time and resources by avoiding the need to learn a new language.
</p>
<h4>Front-End</h4>
<p>
When choosing the front-end framework, our team came across three options: Bootstrap, Angular, and React.
All three options are excellent front-end frameworks for JavaScript that fulfill different needs for different programmers.
For instance, Bootstrap is objectively the easiest framework to work with as it proposes pre-made templates for programmers to use which simplifies the coding.
On the other hand, React is a component base framework that requires the programmer to create manually their own components to use which is great as you have less constraint of how the program should look, but is less evident to use for beginners. This issue is solved with Bootstrap through its pre-made templates which avoids the need to create your own components.
For the same reason, both Angular and React are more challenging to work with since it is not template-based.
Due to the limited time constraint of this project, Bootstrap became the best option for our team as it can save us a lot of time programming for its simplicity of use and its set of available templates, at the cost of creativity.
</p>

<h4>Pros and Cons</h4>
<ul>
      <li>React
            <ul>
                  <li>Pros:
                        <ul>
                              <li>Easy to Learn</li>
                              <li>Great for Dynamic Web Apps</li>
                              <li>Reusable Components</li>
                              <li>High Performance</li>
                              <li>Component Base</li>
                        </ul>
                  </li>
                  <li>Cons:
                        <ul>
                              <li>High-Pace Development</li>
                              <li>Poor Documentation</li>
                              <li>Missing Features</li>
                              <li>Lack of Conventions</li>
                              <li>Steep Learning Curve</li>
                        </ul>
                  </li>
            </ul>
      </li>
      <li>Angular
            <ul>
                  <li>Pros:
                        <ul>
                              <li>Component Based</li>
                              <li>Reusable Components</li>
                              <li>Readability</li>
                              <li>Maintainability</li>
                              <li>MVC Architecture</li>
                        </ul>
                  </li>
                  <li>Cons:
                        <ul>
                              <li>Complex</li>
                              <li>Steep Learning Curve</li>
                              <li>Poor Documentation</li>
                        </ul>
                  </li>
            </ul>
      </li>
      <li>Bootstrap
            <ul>
                  <li>Pros:
                        <ul>
                              <li>Responsive</li>
                              <li>Simple</li>
                              <li>Superior Components</li>
                              <li>User-Made Templates</li>
                              <li>Lots of Available Features</li>
                              <li>Fast</li>
                              <li>Cross-Browser Compatible</li>
                              <li>Consistent</li>
                        </ul>
                  </li>
                  <li>Cons:
                        <ul>
                              <li>Steep Learning Curve</li>
                              <li>Limited Customization Freedom</li>
                              <li>Requires Many Style Overrides</li>
                        </ul>
                  </li>
            </ul>
      </li>
</ul>
<p align="justify">
In conclusion, our team has chosen to use Bootstrap for its simplicity, consistency, and for its numerous templates and available features.
Angular was omitted as it is a lot more difficult to learn compared to Bootstrap while providing less features. 
React is an excellent but difficult front-end framework that works well for an expert of JavaScript as it requires the components to be created individually to function. 
For these reasons, Bootstrap became the better framework option for our team for its implemented templates, which reduce the overall workload for our members.  
</p>


## Installation Instruction and Usage Guidelines
***
<h3>Installation of Node.js and NPM</h4>
1- Install Node.js and NPM following these [steps](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac) <br>
2- Clone the repository on github by downloading the zip file or using the GitHub link. <br>
3- Navigate inside the project folder on terminal and find package.json file. <br>
4- Run "npm install" to install all the project dependencies. <br>
5- Run "node server.js" in root directory to get the localhost running. <br>
6- Open the html page called "Homepage.html"

### [This file](https://github.com/YeeHawCordinator2/VTALVN-soen341projectF2023/wiki/Team-rules) contains the team, management, and Git rules.
