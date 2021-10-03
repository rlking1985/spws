import { defaults } from "../..";
const getCurrentUser = async ({ webURL = defaults.webURL }) => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `${webURL}/_layouts/viewlsts.aspx`, false);
  xhr.send();

  console.log(`xhr.responseText`, xhr.responseText);
};

export default getCurrentUser;
