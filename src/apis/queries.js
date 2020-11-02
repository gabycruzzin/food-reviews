import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

var createQuery = `mutation create($sid: String, $name: String) {
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
        resolve(JSON.stringify(response.data, null, 1));
      })
      .catch(function (error) {
        alert(error);
      });
  });
};

var updateQuery = `mutation update($id: ID!, $sid: String, $name: String) {
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
        resolve(JSON.stringify(response.data, null, 1));
      })
      .catch(function (error) {
        alert(error);
      });
  });
};

var deleteQuery = `mutation delete($id: ID!) {
  deleteEmployee(id: $id) {
     id, name, sid
   }
}`;

export const deleteEmployee = (id) => {
  return new Promise((resolve) => {
    axios
      .post(
        "http://localhost:4000/graphql",
        {
          query: deleteQuery,
          variables: { id },
        },
        { headers: headers }
      )
      .then(function (response) {
        resolve(JSON.stringify(response.data, null, 1));
      })
      .catch(function (error) {
        alert(error);
      });
  });
};
