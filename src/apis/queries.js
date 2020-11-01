import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

var query = `mutation EmployeeInput($sid: String, $name: String) {
  createEmployee(input: {sid: $sid, name: $name}) {
     id, name, sid
   }
}`;

export const createEmployee = (sid, name) => {
  return new Promise((resolve) => {
    axios
      .post(
        "http://localhost:4000/graphql",
        {
          query,
          variables: { sid, name },
        },
        { headers: headers }
      )
      .then(function (response) {
        resolve(response.data.data.createEmployee);
      })
      .catch(function (error) {
        alert(error.response);
      });
  });
};
