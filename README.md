## Pangaea Take-home assignment Node.js Application

This project is a simple HTTP notification system with node.js.
Below are steps required to reproduce and run the application.

---

## NodeJS

- #### Version

      $ node --version
      14.17.4

      $ npm --version
      7.24.0

- #### Steps to run nodejs server api

- git clone https://github.com/phixtalk/pangaea
- cd pangaea
- npm install
- npm start or bash start-server.sh or ./start-server.sh

if server successfully starts, you should see the output below in your terminal

    Subscriber server is running on port 9000
    Publisher server is running on port 8000.

- #### Publisher Server Endpoints

- Create a subscription

    POST /subscribe/{topic} ==> http://localhost:8000/subscribe/topic1 <br/>
    Expected Body: { url: string } ==> http://localhost:9000/test1 <br/>
    Success Response:  201 { "url": "http://localhost:9000/test2", "topic": "topic1" } <br/>

- Publish message to topic

    POST /subscribe/{topic} ==> http://localhost:8000/publish/topic1 <br/>
    Expected Body: { [key: string]: any } ==> customMessage = hello👋 <br/>
    Success Response:  200 { "status": "success", "data": "Notification sent successfully" } <br/>

- Screenshot of terminal


- #### Architecture Pattern

  MVVM / Repository pattern was used in the architecture of the nodejs application. This pattern emphasizes seperation of concerns and single responsibility design pattern. For example, the controllers delegates tasks to the services, and the services accesses data via the data-access layer. So incase we wish to substitute one data storage for another, it's only a matter of swapping out the data access functions with the a new one that returns data in the same format.

- #### Testing API in Postman

      For POST or PUT requests, you can input data in any of these sections in the body tab
        - raw: JSON
        - x-www-form-urlencoded

- #### Unit Testing

      The following test libraries was used for writing the test cases:
        - chai
        - chai-http
        - mocha
        - jest
