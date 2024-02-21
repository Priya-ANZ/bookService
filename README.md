# bookService
Service to retrieve list of books

Project Structure
----------------------------------------
The service is divided into the below sections for code modularity and clarity

1. Routes : 	The Route folder consists of routes for this service. It defines the api endpoint path and the controller class which will process the request
2. Controller: 	Controllers are designed such that the logic for validation and parsing of request body is independent. The JOI library has been used for validation
		and the URL class is used for querystring parse
3. Services : 	The service class handles the interaction with the "mysql" db. 
4. KnexFile: 	The KNEX ORM(Object relational mapping) has been used to make this service a "code first" approach. The KnexFile will initialise the mysql database 
		with connection	string data being passed from the environment variables.
5. DB:		The DB folder has all the migration file to create tables in mysql. It also has seed files to populate few data.The command to run is put in the package.json 
6. Middleware:	The middleware function has been added for the below purpose
		a. authenticate.js : Authenticates the JWT token and sends error message if token is invalid or not present.
		b. authorize.js	: Authorizes the user if he/she is an admin or not. Only admin users are currently allowed to access the api.
		c. error.js: The error middleware centralizes all the errors so that we do not have to put redundant try and catch block for every function. 
7. test: 	The test folder has two folders 
		a. Integration : Tests the integrated API route with integrated DB calls
		b. Unit: Tests validation functions for the request body


Design Decisions
-----------------------------------------------

The GET Method is chosen to retrieve the list of books. The GET method is both safe and idempotent and as per the REST protocol it is best to use GET to retreive information. 
Since the search criteria does not contain confidential data therefore it is best to use the GET method instead of POST.

For Login and register POST has been used since it contains sensitive information.

Password retrieved from the user is NOT saved as plain text. it is encrypted using the bcrypt library and then saved in the database.

KNEX has been used for creating and populating tables. It also provides a vast and clear guide for querying/manipulating the data.

Supertest library has been used for integration testing. The supertest provides easy way to replicate the request/response and use the REST methods.

Winston has been used for logging the data to an external log file. It has been particularly used in the error middleware.

express-async-errors has been used to centralize and catch all the application errors at one place (the error middleware)

For unexpected error and unhandled promise rejections which are not part of the request processesing pipeline, the process.on method in the index.js is used to log the error
 
