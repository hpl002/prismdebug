//To run: yarn; yarn test

const fs = require("fs");
const {
  createClientFromOperations,
} = require("@stoplight/prism-http/dist/client");
const {
  getHttpOperationsFromSpec,
} = require("@stoplight/prism-cli/dist/operations");

const initiateSandbox = async () => {
  const operations = await getHttpOperationsFromSpec("bundle.json");
  /* write operations to file for easy debugging */
  fs.writeFileSync("operations.json", JSON.stringify(operations));
  const client = createClientFromOperations(operations, {
    mock: true,
    validateRequest: false,
    validateResponse: false,
  });
  return client;
};

initiateSandbox().then((client) => {
  client
    .request("/accounts", {
      method: "get",
      headers: {
        Prefer: "example=scenario-3",
      },
    })
    .then((response) => console.log(response.data));
});

//Docs: https://meta.stoplight.io/docs/prism/docs/guides/01-mocking.md#response-examples
//should have returned the scenario 3 example. This example was declared in bundle.json and also carried over to the operations obj
