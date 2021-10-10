This app is representing fake user authentication
it works with react-create-app and json-server   
   
To run this application you need to:   
1. npm run fakeapi   
2. npm run start   
   
you will get the json-server on port 9999 and react-create-app on 3000    
json server provides 3 users with different data   
   
[1]   
"login": "testuser",   
"password": "testpassword"   
[2]   
"login": "Admin",   
"password": "Admin"   
[3]   
"login": "hacker",   
"password": "hacker"   
   
On entering wrong login/password you will get an alert   
otherwise you will be redirected to /profile page with user data   
successful login will write cookies thus you can refresh the page without losing data   
you will get the friends list where you can add/delete/search your friends   


all data is stored on json-server and iam using fetch custom hooks to get it   
the app is simulating async operations with setTimeout delay   