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
   
entering the wrong password you will see an alert otherwise you will be redirected to /profile page with user data   
successful login will write cookies and you free to refresh the page   
   
nearly update:   
    you will be able to change user data. remove/add friends and manage users   