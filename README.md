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
React is utilized for creating the website. An example of the website can be found [here](https://dhawin.github.io/MyPOS/)

# Sale Target
[https://dhawin.github.io/MyPOS/#/saleR]

# Data Analytics Report

In our pursuit of uncovering valuable insights into product relationships, our analytical journey revolves around a meticulous exploration of correlations—an indispensable element in informed decision-making and strategic optimization. Python, chosen for its versatility and efficacy, emerges as the prime programming language for this project. Its simplicity and readability cater to users across varying skill levels, while specialized libraries like NumPy and pandas provide powerful tools for statistical analysis. Beyond facilitating correlation calculations, Python's broader applicability in machine learning and AI positions our project for future growth.

## 2.1 Finding Product Correlations
To ascertain the correlations between products, Python has been employed to analyze the relationship between Saleorder and Material. The provided [my Code](https://github.com/dhawin/MyPOS/blob/main/correlation/2.2.py) initiates by creating a dataframe, grouping data by Saleorder and Material, and summarizing the purchase quantities (Pc). The subsequent steps involve calculating the correlation and exporting the results to CSV files.
 ```python
df = pd.read_csv('data.csv')
pivot_df = df.pivot_table(index='Saleorder', columns='material', values='Pc', aggfunc='sum', fill_value=0)
 ```
Following the creation of the pivot table, the correlation is computed, and the results are exported to both a flat CSV file (correlation_all.csv) and a stacked CSV file (correlation_all_stacked.csv).
 ```python
c = pivot_df.corr()
c.to_csv('correlation_all.csv')
c.stack().to_csv('correlation_all_stacked.csv')
 ```
These outputs unveil material relationships. If a significant number of customers decide on a particular material, they tend to purchase another material as well. Sellers can leverage these insights to recommend additional materials, potentially increasing customer purchasing opportunities.

## 2.2 Finding Product Correlations for Customer R44
To discover correlations between products for Customer R44, the provided [myCode](https://github.com/dhawin/MyPOS/blob/main/correlation/2.2.py) Python script has been implemented. The code filters the dataset to include only transactions related to Customer R44 and then constructs a pivot table to showcase the relationships between different materials based on their purchase quantities (Pc).
 ```python
df_r44 = df[df['Customer'] == 'R44']
pivot_df = df_r44.pivot_table(index='Saleorder', columns='material', values='Pc', aggfunc='sum', fill_value=0)
```
The resulting pivot table outputs reveal material relationships, indicating instances where customers consistently purchase one material alongside another. This insight can be harnessed by sellers as a tool to recommend additional materials to Customer R44, potentially increasing their purchasing opportunities. Such correlation analysis provides strategic information for optimizing product recommendations and enhancing overall customer satisfaction.
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
