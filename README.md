# Blog About It
![repo License](https://img.shields.io/github/license/rbkeyes/team-profile-generator?color=green)
![GitHub language count](https://img.shields.io/github/languages/count/rbkeyes/team-profile-generator?color=purple)
![GitHub top language](https://img.shields.io/github/languages/top/rbkeyes/team-profile-generator)


## Description

A CMS-style blog site where developers can sign in to publish blog posts and read or comment on posts by other developers. 

Technologies used include: 
- node
- express
- express-session
- express-handlebars
- mysql2
- sequelize
- connect-session-sequelize
- bcrypt

This application was deployed using Heroku.

The biggest challenge for this project was determining the most efficient way to utilize the handlebars templates. I wanted to be able to reuse templates as much as possible and avoid duplications. I made liberal use of partials and conditionals to reduce the need for new views for each page. Given more time I would like to explore handlebars' custom helper feature and see if there is a cleaner way to structure the templates.

I used jass.css and a custom style.css sheet for styling. I did edit the jass stylesheet as needed where I was unable to adjust the styling with the custom stylesheet (for example, button styling).

The one bug I noticed that I was unable to fix is a delay in the homepage changing from 'login' to 'logout' upon logging in. The site redirects to the hompage after logging in, and the login link is supposed to switch to 'logout'. However, it still reads 'login' until the page is refreshed or you navigate to another page. I plan to continue working to resolve this issue.

## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [Credits](#credits)

- [License](#license)

- [Tests](#tests)


## Installation

There is no installation required to use the web application.

For development purposes, you must have Node.js installed on your computer. Instructions to install can be found [here](https://nodejs.org/en/).

Clone the [GitHub repo](https://github.com/rbkeyes/blog-about-it) to a local repo. The package-json includes the necessary packages and can be installed by running 
```
npm i
```
in the terminal command line. 

To ensure sequelize can connect, be sure to add a .env file containing the following, and update the password to your mysql password:
```
DB_NAME='blog_db'
DB_USER='root'
DB_PASSWORD=[your password]
```
.

## Usage

To use, navigate to the [homepage](https://blog-about-it.herokuapp.com/). On the homepage, the user can view previous posts by other users, but will be prompted to sign in when attempting to navigate to any other pages. New users can create an account by selecting the option to "Create an account" at the bottom of the log in card. 

Upon signing up or logging in, the user is directed to the homepage. Select a previous post to view existing comments and/or add a comment.

Users can view their own posts, write a new post, or delete previous posts from the dashboard page. 

To logout, click "logout" in the nav links at the top of the page.


## Credits

Coursework for the bootcamp was used as reference material in completing this project.

No starter code was provided for this project.


## License

[MIT license](./LICENSE)


## Tests

There are no tests at this time.


## Contact

Still have questions? Find me on [GitHub](https://github.com/rbkeyes).

Or, you can [email me](mailto:rbkeyes@gmail.com).