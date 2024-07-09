# BlossomAI

## Table of Contents
1. [Project Overview](#project-overview)
2. [Motivation](#motivation)
3. [What I Learned](#what-i-learned)
4. [Tech Stack and Architecture](#tech-stack-and-architecture)
5. [Features](#features)
6. [Installation and Usage](#installation-and-usage)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgements](#acknowledgements)

## Project Overview
BlossomAI is a tool designed to enhance progress awareness in web application development. By tracking commits, pull requests, and issues in real-time, BlossomAI helps developers feel more productive and informed about their progress. The tool uses OpenAI's chat completions API to convert these updates into shareable content such as blog posts and tweets, making it easier to communicate and showcase project progress.

## Motivation
The motivation behind BlossomAI stems from the common challenge developers face with feeling unproductive despite making progress. This project aims to address this issue by providing a real-time tracking and content generation tool. Professionally, it aligns with the goal of improving developer workflows and increasing transparency in the development process.

## What I Learned
Building BlossomAI provided insights into integrating real-time tracking features with modern web technologies. It also offered experience in using OpenAI's API for content generation, enhancing skills in TypeScript and Next.js, and deepening understanding of deploying applications with Vercel and using Supabase for backend functionalities.

## Tech Stack and Architecture
**Tech Stack:**
- **Frontend:** Next.js, TypeScript
- **Backend:** Supabase
- **Deployment:** Vercel

**Architecture:**
BlossomAI's architecture consists of a Next.js frontend that interfaces with a Supabase backend. The frontend handles user authentication and displays real-time project updates. The backend manages data storage and interaction with GitHub's API to track commits, pull requests, and issues. OpenAI's chat completions API is integrated to convert these updates into blog posts and tweets.

## Features
- **Real-time Progress Tracking:** Monitors commits, pull requests, and issues.
- **Content Conversion:** Converts project updates into shareable blog posts and tweets.
- **OpenAI Integration:** Uses OpenAI's API for generating content.
- **User Authentication:** Secure login using GitHub account.


### Installation:
1. Clone the repository: `git clone https://github.com/username/blossomai.git`
2. Navigate to the project directory: `cd blossomai`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

### Usage:
- Log in using your GitHub account.
- Install the workflow script in your project.
- BlossomAI will track your project updates in real-time.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
- Inspired by the #buildinpublic trend.
- Leveraging OpenAI's powerful API for content generation.
