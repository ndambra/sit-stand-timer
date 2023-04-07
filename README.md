# sit-stand-timer
A web-app that keeps track of the amount of time spend standing and sitting at work.

# Overview
I recently acquired a standing desk at work to break up the amount of time I spent sitting throughout the day. I did some research online as to how much time should be spent standing vs. sitting and for how long at sit or stand at a time. I was given a lot of good information, but too much to keep track off. I also never seemed to remember how long I was standing/sitting for or when I should switch to standing or sitting. So, like all developers, I made an app to do the remembering for me.

The app will suggest the amount of time you should stand based on some user inputs and keep track of the amount of time spent standing and sitting. This was one of my first projects using pure html/css/js, no other frameworks or tools. My goal with this web app to improve upon it with more features and enhance it with new frameworks I learn, such as React and Redux. 

# How to use it
For this version, just download the repo and open the html file in your browser.

Select the stand to sit ratio you are aiming for and enter the number of hours you intend to work that day. The app will run some calculations in the background and suggest the number of hours you should aim for standing through out the day.

Click 'Begin Day' and the app essentially "starts".

Choose 'Sit' or 'Stand' and start the stopwatch. You'll notice the stopwatch begin and the table at the bottom populate. The app will keep track of the total time spent sitting and standing, and the table shows the breakdown of each sit/stand session. 

'Reset Day' when you are ready to track the next day. *Note* There is no history or tracking at the moment, so when you exit or rest the day, everything goes away.

# Future Improvements
- Transition the app to a React based project
- Add user accounts to save history
- Allow users to export the tables
- Create an analytics section to see a snapshot of the users 
- Transition to a timer?
