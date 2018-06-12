#PCBuilder

##The Task

To create a MERN Stack application with RESTful resources in 9 days.

###Site Goals:

To create a user-driven experience that can help system builders of all skill levels to plan out their builds.

The site had to allow individual computer parts as well as entire builds to be created by the users.

Finally, those parts and builds had to be rated by others, to give those who are new to PC building a good idea of what they should use when they visit the site.

##Link:
https://restaurant-review-project.herokuapp.com/

##Site Guide:

###Homepage:

* On entering the site, you will be greeted by a homepage giving a short description of the site. There's also a navbar allowing users to create an account, login or view the index page.

* The homepage can be reached at any time via the 'About PCBuilder' navbar button.

###Index page:

* The index page contains all the computer builds and parts that have been added by users so far. A filter-bar gives easy access to filters that allow you to find parts with ease.

![Index Page]()

###Show pages:

* Clicking into a computer or a part takes you to their respective show page. This page shows key information on the product or build. All show pages include comments with ratings, and allow logged in users to edit or delete their own listings, and also leave a comment and review.

* Show pages for parts include comparison to similar products, a 'where to buy' button linking to a retailer, and the part's price.



* Computer show pages give a total price for the computer, a table listing every part used in the build and links to go to those parts' show pages.

###New part page:

* This page allows logged in users to add any part you like, with selects ensuring precise information is provided.

###New computer page:
* A logged in user can create a computer based on the parts available on the site. The form guides you through the process, ensuring you pick everything you need as well as warning you of any incompatibilites found.

###Technologies used:
* HTML 5
* CSS 3
* SASS
* JavaScript
* GitHub
* Git
* Bulma
* Node.js
* React
* MongoDB

##Approach & The Experience

###Starting off

For the first day of the project, I brainstormed ideas for what I would like to create. At first I thought I would make something utilising google maps, like a food delivery service, as it would fall in line with what we had done before. Eventually I decided to go with something a little closer to my interests, and make a website to help and inform users on their computer builds. I sketched out some rough drawings of what I wanted the side to look like and include, and then went to work.

The challenges involved in this process took what we had learned with backend models a few steps further. While working out exactly how I could let users create their own PC builds on a website, I quickly realised there had to be at the very least seven models for parts alone. On top of that, all seven had to be incorporated into one all-encompassing computer model.

###Starting the Backend

I initially started working on the backend with the goal of implementing seven different RESTful routes for each part, all doing very similar things. I quickly realised that alongside the fact that having so many routes would prove extremely difficult when it came to the frontend, the code I was writing was very repetitive, very wet. After doing some more research, I found that model requirements could be determined via a function, and that by giving each of the seven parts their own 'type', I could successfully integrate them all into one model, and one RESTful route.

With the backend created, I created tests with chai to ensure its functionality before heading into the frontend. Doing this brought up a few bugs in my code that I was able to quickly identify and sort out, which made writing the tests feel really worthwhile.

###The Frontend

Moving on to the frontend, I started with the index page. Having both parts and computers to show meant sending two get requests and handling two arrays of data on one page, which came with its own challenges. To keep my code dry, I mapped over the two state keys and wrote one function that created cards from both arrays.

Making the show pages was very similar to what we had done in the past, aside from two things. The first was the need for deep population, as in the case of the computer model I had objects that were referenced three levels deep. To properly display the information, I looked at the mongoose documentation on population and found a way to populate an object through any number of levels.

The second problem came with the parts comparison table, that lets you open different parts of the same type. Attempts to navigate to the new show page failed, as React did not change the state on an id change in the url. To get around this, a function had to be made that got the right part that you had selected, pushed the id to the new url, and set state with the part's data, forcing the page to contain the correct information.

The computer form was the key to this project, and also the hardest part. The carousel took a very long time to get functional, in particular getting the viewed part to give its id for the form. The hardest part was the part validation, ensuring the right parts were chosen and not allowing the user to proceed until they had done so.

Once the form was in a functional state, the site had reached MVP, and I proceeded to think of ways to present the data given (such as with the tables), add other, less key functionality such as the average star ratings and filters, and finally work on styling the site, which I dedicated the last day to do.

###Wishful thinking

With more time, I would have added a basket/checkout-style option for choosing parts to go in your PC. That way, users of the site could add parts to their build as they viewed them. The form data would most likely have to be stored in the user's object, and part validation would also prove to be challenging.

Greater integration with retailers such as Amazon could have greatly improved upon the otherwise static pricing on parts, and also add some more depth to where users could purchase the parts they were interested in.

Adding more parts such as fan controllers, CPU coolers, watercooling parts etc. would make for really great additions too.

Finally, refactoring the logic behind the parts validation to be more secure is also on my to-do list, as currently there are ways to get around the restrictions that would allow a user to create a computer out of incompatible parts.
