sign-up 

api route: http://localhost:6000/api/v1/auth/sign-up

req.body :
{
  "name": "lalitha",
  "email": "lalitha@example.com", //the google account is in two factor authentication turn on
  "password": "123123"
}


steps to do two factor authentication 
  go to manage account 
  search for 2 step verfication
  set it

-------------------- 


sign-in

api route- 

req.body: 
{
  "email": "lalitha@example.com",
  "password": "123123"
}
copy token, user id

to setup workflow 

post api route - http://localhost:6000/api/v1/workflows/subscription/reminder 


-create subscription 

api route - http://localhost:6000/api/v1/subscriptions

  req.body :
  {
    "name": "Amazon Prime",
    "price": 299,
    "frequency": "monthly",
    "category": "entertainment",
    "paymentMethod": "Credit Card",
    "startDate": "2025-06-09"
  }

  paste token in auth 


-get all subscription 
http://localhost:6000/api/v1/subscriptions/user/user.id 

user id in req.params


