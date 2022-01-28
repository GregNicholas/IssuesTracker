Issue tracking app with React and firebase

In the app, a user must sign up, and can create, and edit/delete issues they have created. 
There is a popup modal to confirm deletions. A user may comment on other issues as well,
and only delete their own comments.

Authentication is set up using firebase, email, username and password sign up, log in
with email, log out, and update profile.

All is updated in real time and stored in the firebase firestore database.

Using react-router-dom version 6.2.1 to implement component routing.

React Bootstrap is included for authentication buttons and cards, buttons on issues.

Custom hooks: useWindowWidthAndHeight to determine window size and either show the navbar
at the top of the screen or in a closable side nav

Context: AuthContext for all authentication functions, including current user's info
         IssuesContext fetches issues related data for use in the app.
         
Form is used for both add and editing an issue.

Issues Table is displayed with important info, color coded for importance, and sortable with react-table.
Any issue can be clicked to see its details
         
More dependencies;
react-datepicker for setting due date in the form.
react-minimal-pie-chart used to show stats.


