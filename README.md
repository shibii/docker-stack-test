# docker-stack-test

This project is a simple docker practice test case.

The project is a todo-like web app that lets the user to insert and remove json objects to/from the backend postgres database.

details:

- a svelte frontend served as a pile of static files from nginx server
- a express api that is reverse proxied from said nginx server
- a postgres database to persist inserted objects
- a scheduled non-composed test program that connects to the same stack and inserts to the database
