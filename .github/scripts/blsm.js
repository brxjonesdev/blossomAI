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

console.log('Commit Message:', commitMessage);
console.log('Commit Author:', commitAuthor);
console.log('Commit SHA:', commitSha);
console.log('Commit Ref:', commitRef);
console.log('Commit Repo:', commitRepo);
console.log('Issue Number:', issueNumber);
console.log('Issue Title:', issueTitle);
console.log('Issue Body:', issueBody);
console.log('Issue Repo:', issueRepo);
console.log('PR Number:', prNumber);
console.log('PR Title:', prTitle);
console.log('PR Body:', prBody);
console.log('PR Repo:', prRepo);
console.log('Timestamp:', timestamp);

const dataFromAction = {
  type: eventType,
  timestamp: timestamp,
  commitDetails: {
    message: commitMessage,
    author: commitAuthor,
    sha: commitSha,
    ref: commitRef,
    repo: commitRepo,
  },
  pullRequestDetails: {
    number: prNumber,
    title: prTitle,
    body: prBody,
    repo: prRepo,
  },
  issueDetails: {
    number: issueNumber,
    title: issueTitle,
    body: issueBody,
    repo: issueRepo,
  },
}

function sendToBackend(data) {
  switch (data.type) {
    case 'issue':
      console.log('Sending issue data to backend:', data.issueDetails);
      try {
        axios.post('http://localhost:3000/api/blsm_connect', data.issueDetails)
        .then(response => response.json()) // Parse response JSON
        .then(data => console.log('Response from backend:', data)) // Log response
        .catch(error => console.error('Error:', error)); // Handle errors
      } catch (error) {
        console.error('Error:', error);
      }
      break;
    case 'pull_request':
      console.log('Sending pull request data to backend:', data.pullRequestDetails);
      try {
       axios.post('http://localhost:3000/api/blsm_connect', data.pullRequestDetails)
        .then(response => response.json()) // Parse response JSON
        .then(data => console.log('Response from backend:', data)) // Log response
        .catch(error => console.error('Error:', error)); // Handle errors
      } catch (error) {
        console.error('Error:', error);
      }
      break;
    case 'push':
      console.log('Sending commit data to backend:', data.commitDetails);
      try {
        axios.post('http://localhost:3000/api/blsm_connect', data.commitDetails)
        .then(response => response.json()) // Parse response JSON
        .then(data => console.log('Response from backend:', data)) // Log response
        .catch(error => console.error('Error:', error)); // Handle errors
      } catch (error) {
        console.error('Error:', error);
      }
      break;
    default:
      console.log(':)');
  }
}

sendToBackend(dataFromAction);
