# Presentation

## Overview

---

today I'm presenting Crowd pilot, it's a React SPA that allows project owners to
create and manage their own crowdfunding campaigns. the goal of this project if to create a single page app that support user authentication, campaign creation and management via a restful API and managing a relatively complex client state using Redux Toolkit.

## tech-stack

---

I've used a lot of different tools and packages in this project, mainly because I didn't have any team mates to split the workload with and also because I'm new to the redux ecosystem, so, I had to take some shortcuts and use pre-built solutions to save time and effort. the main tools and packages that I've used are:

- ### UI

  for the UI I used shadcn UI, which is a collection of pre-built React components that are designed to be easy to use and customize.

- ### form

  for the forms I used react-hook-form along with zod for validation, which is a great combination for handling forms in React.

- ### data fetching

  for communicating with the backend API, I used react-query, which is a powerful library for managing server state in React applications along with axios for making HTTP requests.

## architecture

---

In terms of the architecture, I went with the feature-based architecture, I organized the codebase into different folders based on the features of the application. for example, I have a folder for authentication, a folder for projects, and a folder for shared components. this approach allows me to keep the code organized and makes it easier to find and work on specific features.

I've also separated the client state (managed by redux) from the server state (managed by react-query), this allows me to keep the client state simple and focused on the UI, while the server state is focused on data fetching and caching.
