# PSX Completion Tracker Server

This project is a sister project to psx-completion-client. It is a NodeJS backend that interfaces with a mongoDB collection to store name/img url/completion status of a huge list of PSX games. It serves a very simple API that the client can interact with to update the database as needed when games are completed.

I stored mongoDB credentials in a .env file, which is obviously not included, so if you wish to run this, you will have to create your own mongodb server and fill out a new .env

I have a grand goal to beat every PSX game ever released - the list here is not complete, but it's nearly everything, and I wanted a way to keep track of what I have beaten and not beaten.