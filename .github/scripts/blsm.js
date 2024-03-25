const axios = require('axios');

const commitMessage = process.env.COMMIT_MESSAGE;
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
const repo = process.env.REPO;


const dataFromAction = {
  type: eventType,
  timestamp: timestamp,
  repo: repo,
  username: username,
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
  axios.post('https://blossom-ai-rose.vercel.app/api/blsm_connect', data)
    .then(response => {
      console.log('Response from microservice:', response.data);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
}


sendToBackend(dataFromAction);
