// // 1. Import and cache the object
// import http from "http";
// import { parse } from "path";

// // 1a. lets define some data
// let Employees = [
//   { EmpNo: 1, EmpName: "A", DeptName: "D1" },
//   { EmpNo: 2, EmpName: "B", DeptName: "D2" },
//   { EmpNo: 3, EmpName: "C", DeptName: "D1" },
//   { EmpNo: 4, EmpName: "D", DeptName: "D2" },
//   { EmpNo: 5, EmpName: "E", DeptName: "D1" },
//   { EmpNo: 6, EmpName: "F", DeptName: "D2" },
//   { EmpNo: 7, EmpName: "G", DeptName: "D1" },
//   { EmpNo: 8, EmpName: "H", DeptName: "D2" },
// ];

// // 2. Create a Server, that will return data based on
// // Lets define API based on Http Request methods
// let server = http.createServer((request, response) => {
  
//   let id = parseInt(request.headers.id);
  
//   console.log("Here"+ id);
//   // 2a. the GET Request
//   if (request.method === "GET") {
//     if (id === 0) {
//       // 2b. return all records
//       response.writeHead(200, { "Content-Type": "application/json" });
//       response.write(JSON.stringify(Employees));
//       response.end();
//     } else {
//       // 2c. response specific Employee Record based on id
//       let emp = Employees.find((e) => {
//         return e.EmpNo === id;
//       });
//       response.writeHead(200, { "Content-Type": "application/json" });
//       response.write(JSON.stringify(emp));
//       response.end();
//     }
//   }

//   // 3. The POST method
//   if(request.method === "POST"){
//      let receivedData;
//     // 3a. lets receive the data first using 'data' event 
//     // by calling 'on()' method of the request object
//     request.on('data', (chunk)=>{
//       // parse the received data into the JSON format
//       receivedData = JSON.parse(chunk);
//     });
//     // 3b. Process the received data and end the  request
//     request.on('end',()=>{
//       Employees.push(receivedData);
//       // send the response of all data with new record
//       response.writeHead(200, { "Content-Type": "application/json" });
//       response.write(JSON.stringify(Employees));
//       response.end();
//     }); 
//   }
//   if(request.method === "PUT"){
//     let receivedData;
//     // Search record based on header, if found update it in array and return the modified array
//     let id = parseInt(request.headers.id);
//     let new_emp = request.body;
//     let emp = [];
//     for(let i=0;i<Employees.length;i++){
//       emp = Employees[i];
//       if(emp.EmpNo === id){
//         Employees[i] = new_emp;
//       }
//     }
//     // if not found return Not Found Error Message  
//   }
//   if(request.method === "DELETE"){
//      // Search record based on header, if found delete it from array and return the modified array
//     // if not found return Not Found Error Message  
//   }
// });

// // 4. Start Listening on the port
// server.listen(7013);
// console.log("Server Started on port 7013");

// 1. Import and cache the object
import http from "http";

// 1a. lets define some data
let Employees = [
    { EmpNo: 1, EmpName: "A", DeptName: "D1" },
    { EmpNo: 2, EmpName: "B", DeptName: "D2" },
    { EmpNo: 3, EmpName: "C", DeptName: "D1" },
    { EmpNo: 4, EmpName: "D", DeptName: "D2" },
    { EmpNo: 5, EmpName: "E", DeptName: "D1" },
    { EmpNo: 6, EmpName: "F", DeptName: "D2" },
    { EmpNo: 7, EmpName: "G", DeptName: "D1" },
    { EmpNo: 8, EmpName: "H", DeptName: "D2" },
];

let auth = { login: 'huma', password: '1234' }

// 2. Create a Server, that will return data based on
// Lets define API based on Http Request methods
let server = http.createServer((request, response) => {
    let id = parseInt(request.headers.id);


    // parse login and password from headers
    const b64auth = (request.headers.authorization || '').split(' ')[1] || ''
    console.log("b64auth", b64auth);
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // 2a. the GET Request
    if (request.method === "GET" && login && password && login === auth.login && password === auth.password) {
        if (id === 0) {
            console.log("I am here2");
            // 2b. return all records
            console.log("request", request.headers.authorization);
            response.writeHead(200, { "Content-Type": "application/json", 'Authorization': auth, });
            response.write(JSON.stringify(Employees));
            response.end();
        } else {

            // 2c. response specific Employee Record based on id
            console.log("I am here");
            let emp = Employees.find((e) => {
                return e.EmpNo === id;
            });
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(emp));
            response.end();

        }

    }



    // 3. The POST method
    if (request.method === "POST" && login && password && login === auth.login && password === auth.password) {
        let receivedData;
        // 3a. lets receive the data first using 'data' event 
        // by calling 'on()' method of the request object
        request.on('data', (chunk) => {
            // parse the received data into the JSON format
            receivedData = JSON.parse(chunk);
        });
        console.log("receivedData", receivedData);

        // 3b. Process the received data and end the  request
        request.on('end', () => {
            Employees.push(receivedData);
            // send the response of all data with new record
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(Employees));
            response.end();
        });
    }




    if (request.method === "PUT") {
        let body = "";
        let id = parseInt(request.headers.id);
        let UserName = (request.headers.username);
        let Password = (request.headers.password);
        console.log("kkk", UserName, Password);
        let emp = [];
        request.on("data", (chunk) => {
            body += chunk; // convert Buffer to string
        });
        request.on("end", () => {
            const result = JSON.parse(body);
            // console.log("res",result);
            for (let i = 0; i < Employees.length; i++) {
                emp = Employees[i]
                if (emp.EmpNo === id) {
                    Employees[i] = result;
                }

            }
            console.log("employees", Employees);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(Employees));
            response.end("ok");

        });


        // Search record based on header, if found update it in array and return the modified array
        // if not found return Not Found Error Message  
    }

    if (request.method === "DELETE") {
        let id = parseInt(request.headers.id);
        if (id === 0) {
            // 2b. return all records
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(Employees));
            response.end();
        } else {
            // 2c. response specific Employee Record based on id
            Employees = Employees.filter(e => {
                if (e.EmpNo !== id) {
                    return true;
                }
                return false;
            });
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(Employees));
            response.end("Deleted!");
        }
        // Search record based on header, if found delete it from array and return the modified array
        // if not found return Not Found Error Message  
    }
});

// 4. Start Listening on the port
server.listen(100);
console.log("Server Started on port 100");
