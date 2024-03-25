const axios = require('axios');

const commitMessage = process.env.COMMIT_MESSAGE;
const commitAuthor = process.env.COMMIT_AUTHOR;
const commitSha = process.env.COMMIT_SHA;
const commitRef = process.env.COMMIT_REF;
const commitRepo = process.env.COMMIT_REPO;
const issueNumber = process.env.ISSUE_NUMBER;
const issueTitle = process.env.ISSUE_TITLE;
const issueBody = process.env.ISSUE_BODY;
const issueRepo = process.env.ISSUE_REPO;
const prNumber = process.env.PR_NUMBER;
const prTitle = process.env.PR_TITLE;
const prBody = process.env.PR_BODY;
const prRepo = process.env.PR_REPO;
const timestamp = process.env.TIMESTAMP;
const eventType = process.env.TYPE;
const username = process.env.USER;


const dataFromAction = {
  type: eventType,
  timestamp: timestamp,
  commitDetails: {
    timestamp: timestamp,
    username: username,
    message: commitMessage,
    repo: commitRepo,
  },
  pullRequestDetails: {
    timestamp: timestamp,
    username: username,
    number: prNumber,
    title: prTitle,
    body: prBody,
    repo: prRepo,
  },
  issueDetails: {
    timestamp: timestamp,
    username: username,
    number: issueNumber,
    title: issueTitle,
    body: issueBody,
    repo: issueRepo,
  },
}

console.log('Data from action:', dataFromAction);

function sendToBackend(data) {
  axios.post('http://localhost:3001/api/blsm_connect', data)
    .then(response => {
      console.log('Response from microservice:', response.data);
    })
    .catch(error => {
      console.error('Error sending data to microservice:', error);
    });
}


sendToBackend(dataFromAction);
