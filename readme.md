# RESTful APIs Automation test framework 

## Pre-requisites
1. Install npm, node
2. Install Visual Studio Code 
2. Api should be running on local machine on localhost i.e. `http://localhost:51544`

## How to install & Run 
1. Please extract the project at your desired path
2. Go to `RestfulAPITestProject\utils\constants.js` file and update configurations. (optional) 
	* Update `url` in constants.js file, i.e. where api is hosted  e.g. `localhost:51544`
3. Open the command prompt/terminal window and go to the project path.
4. Run `npm install` command to download all dependencies.
5. Run `npm run test`to command to execute all tests and generate a html report for test results.
6. Please find html report under `RestfulAPITestProject\mochawesome-report` directory and open in any browser. 