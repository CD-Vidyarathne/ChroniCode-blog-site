# ChroniCode Blog website

## Introduction

This is a Simple Blog website which is created in purpose of demonstraiting how the Software Security Module's theories can be applied in real world projects.
This website followed the following standards.

- Secure Coding Practices for Authentication and Authorization – password salt ```bcryptjs``` , block password attacks
(captcha) ```Google recaptcha```
- Secure Coding Practices for Input Validation using ```express-validator```
- Secure Coding Practices for Error Handling
- Log all events (errors, information) into a logfile using ```winston```
- Secure Coding Practices for Session Management. ```Json Web Tokens``` are used for this.
- Database Security – use non root user for application and use minimum permissions, protect from
SQL injection. ```Sequelize``` ORM Library is used.
- Protection from Cross Site Scripting  Using ```helmet``` middleware and input validation.
- Code vulnerability analysis using ```SNYK```

## Execution
1. Clone the repo
2. Navigate into server folder ```cd ./server```
3. Run npm install ```npm install```
4. Run ```npm run dev``` ( You must have 8080 port available )
5. 2. Navigate into client folder ```cd ./client```
6. Run npm install ```npm install```
7. Run ```npm run dev``` ( You must have 3001 port available )
