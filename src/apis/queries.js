import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

var createQuery = `mutation EmployeeInput($sid: String, $name: String) {
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
          query: createQuery,
          variables: { sid, name },
        },
        { headers: headers }
      )
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        alert(error);
      });
  });
};

var updateQuery = `mutation EmployeeInput($id: ID!, $sid: String, $name: String) {
  updateEmployee(id: $id, input: {sid: $sid, name: $name}) {
     id, name, sid
   }
}`;

export const updateEmployee = (id, sid, name) => {
  return new Promise((resolve) => {
    axios
      .post(
        "http://localhost:4000/graphql",
        {
          query: updateQuery,
          variables: { id, sid, name },
        },
        { headers: headers }
      )
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        alert(error);
      });
  });
};
