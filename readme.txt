1)  change config/config.json for database Accordingly 
2)  npm install
3)  npx sequelize-cli db:migrate
4)  npx sequelize-cli db:seed:all
5)  npm start  

is up and running http://localhost:4000

=> for demo : user with id "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b"
    already added who has previous bookings data

=> Swagger documentation : http://localhost:4000/api-docs/

=> Rate limited APIs using ips 

how to :

1)  create a user at : post > http://localhost:4000/users

note down that id which it returns

2)  book cabe with that id at : post > http://localhost:4000/booking/{userid}

3)  view previous bookings with that id at : get > http://localhost:4000/booking/{userid}

4)  get newrby cabs with that id at : get > http://localhost:4000/cabs/{userid}

5)  get all registered users at : get > http://localhost:4000/users

6)  get details of specific user using id : get > http://localhost:4000/users/{userid}
