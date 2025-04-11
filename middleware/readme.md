

* a middleware to track when the request hit & at which time 

1. a log file created in index.js when user hit a / route it will create the log file  (index.js)
2. middleware==> at which date , req & url 
3.  append (2)  in a file inside the directory log/request.log



* when you hit the public route it generates the token

(how token generate ):
1. a token generation route 
2. in utils use crypto module to generate the token  & also validate it (aimple validation length check uptill now)
3. call it in the token generate route 

==>save the token 

==>b/c private route is accessed by that token
1. auth middleware before accessing the dashboard