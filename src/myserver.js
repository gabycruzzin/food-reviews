var express = require("express");
var cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  input EmployeeInput {
    sid: String
    name: String
  }

  type Employee {
    id: ID!
    sid: String
    name: String
  }

  type Query {
    getEmployee(id: ID!): Employee
    getAllEmployees: [Employee]
  }

  type Mutation {
    createEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): [Employee]
  }
`);

class Employee {
  constructor(id, { sid, name }) {
    this.id = id;
    this.sid = sid;
    this.name = name;
  }
}

var employeeDatabase = [];

var root = {
  getEmployee: ({ id }) => {
    if (!employeeDatabase[id]) {
      throw new Error("no Employee exists with id " + id);
    }
    return employeeDatabase[id];
  },
  getAllEmployees: () => {
    return employeeDatabase;
  },
  createEmployee: ({ input }) => {
    var id = require("crypto").randomBytes(10).toString("hex");

    employeeDatabase.push(new Employee(id, input));
    return new Employee(id, input);
  },
  updateEmployee: ({ id, input }) => {
    if (!employeeDatabase.find((emp) => emp.id === id)) {
      throw new Error("no Employee exists with id " + id);
    }

    let foundIndex = employeeDatabase.findIndex((element) => element.id === id);
    employeeDatabase[foundIndex] = { id, ...input };
    return new Employee(id, input);
  },
  deleteEmployee: ({ id }) => {
    if (!employeeDatabase.find((emp) => emp.id === id)) {
      throw new Error("no Employee exists with id " + id);
    }
    employeeDatabase = employeeDatabase.filter((element) => element.id !== id);
    return employeeDatabase;
  },
};

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
