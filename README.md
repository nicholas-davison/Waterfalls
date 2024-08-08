# FallsFinder

FallsFinder is a platform to discover, share, and save information about waterfalls in the beautiful state of Tennessee. Users can create pages with detailed information on waterfalls in their area, save their favorite falls from the site, and get map directions to any of their favorite falls.

## Table of Contents

- [Installation](##installation)

- [Purpose](#purpose)

- [Usage](##usage)

- [Development](#development)

## Installation

Make sure you have the following installed:

- [Git](https://git-scm.com/)

- [Node.js](https://nodejs.org/) (including npm or yarn)

Navigate to the database repo for this project and follow the instructions on the it's readme:
	https://github.com/nicholas-davison/Waterfalls-api

Once the API directions are complete, clone this repository on Github.

Then navigate to the project directory and run the following commands:

```

cd waterfalls

npm install

npm run dev

```

Finally, navigate to http://localhost:5173 in your browser.
## Purpose

Tennessee is home to hundreds of beautiful waterfalls, with a great number of them accessible on public land. My motivation for this project was to reinforce methods and techniques for CRUD application development, while learning about and displaying some of the waterfalls in Tennessee. I also was motivated to interact with commonly used APIs to gain experience in reading documentation and implementing code based on these instructions.

## Usage

Upon registering with the site, users can browse waterfalls added by other users on the home page. By clicking on a waterfall card, the user will be navigated to a page where details and photos for that falls with be displayed. The user can then like that waterfall if they wish to save it to their "favorites" page; if they authored that waterfall, a button will appear to edit it's details. Once a waterfall has been added to the user's "favorites" page, the user can select any number of waterfalls on this page and a "route trip" button will appear at the top of the page; this button, when clicked, will access Google Maps and provide detailed driving directions and a map to the user, starting at their address and ending at the last selected waterfall's location. Should the user wish to add a new waterfall to the site, they can click the link in the navbar which will direct them to a form page. This form uses Google Places to provide the address for a searched waterfall. Finally, a user can edit their profile details and view the waterfalls they have authored in the "profile" section of the site.

## Development

This application was developed using React and Vite, with state being managed within the application. Data is stored and retrieved via JSON server and Google Maps API.


