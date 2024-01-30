# Online Ordering System

## ER Diagram

An Entity Relationship (ER) Diagram are used to design relational databases in this project as shown below.

![doc/ER.jpg](https://github.com/dhawin/MyPOS/blob/main/doc/ER.jpg)

## Backend
### Firebase 
is a platform that brings together various tools for backend or server side management.This makes it possible to build mobile applications efficiently. It also reduces the time and cost of doing server side or data analysis as well. There are both free tools. and equipment that costs money (for scaling)

### cloud firestore 
for a database service that is NoSQL in nature, taking the advantages of Firebase's Realtime Database as well and extending it as well.
### Authentication 
The name already says it all, yes, it is a service that manages Auth for us, which is very comprehensive, including email-password, phone, to facebook, twitter, github for login as well.

### UI
I use react to create this website this is an example of my website [https://dhawin.github.io/MyPOS/]

# Sale Target
[https://dhawin.github.io/MyPOS/#/saleR]

# Data Analytic

In our pursuit of unraveling valuable insights into product relationships, we embark on a meticulous exploration of correlations, recognizing their significance in informed decision-making and strategic optimization. Python, chosen for its versatility and efficacy, emerges as the ideal programming language for this project. Its simplicity and readability make it accessible for users across skill levels, while specialized libraries like NumPy and pandas provide powerful tools for statistical analysis. Beyond correlation calculations, Python's broader applicability in machine learning and AI positions our project for future growth.

## 2.1 To find the correlation between products
I've used Python to find a correlation between Saleorder and Material.
First, I create dataframe for each saleorder and material. this is [my Code](https://github.com/dhawin/MyPOS/blob/main/correlation/2.1.py)
 ```python
df = pd.read_csv('data.csv')
pivot_df = df.pivot_table(index='Saleorder', columns='material', values='Pc', aggfunc='sum', fill_value=0)
 ```
And then calulate the correlation and export to csv
 ```python
c = pivot_df.corr()
c.to_csv('correlation_all.csv')
c.stack().to_csv('correlation_all_stacked.csv')
 ```
These outputs indicate material relationships. 
If almost all customers decide on a material, they always buy another material as well. 
The sellers can use these as a tool to reccomend other materials to customers to increase their purchasing opportunities.

## 2.2 To find the correlation between products for Customer R44.
I've used Python to find a correlation between Saleorder and Material.
First, I create dataframe for each saleorder and material. this is [my Code](https://github.com/dhawin/MyPOS/blob/main/correlation/2.2.py)
 ```python
df = pd.read_csv('data.csv')
pivot_df = df.pivot_table(index='Saleorder', columns='material', values='Pc', aggfunc='sum', fill_value=0)
 ```
And then calulate the correlation and export to csv
 ```python
c = pivot_df.corr()
c.to_csv('correlation_all.csv')
c.stack().to_csv('correlation_all_stacked.csv')
 ```
These outputs indicate material relationships. 
If almost all customers decide on a material, they always buy another material as well. 
The sellers can use these as a tool to reccomend other materials to customers to increase their purchasing opportunities.

# Getting Started with React App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
