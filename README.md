# Online Ordering System

## ER Diagram

An Entity Relationship (ER) Diagram are used to design relational databases in this project as shown below.

![ER Diagram](https://github.com/dhawin/MyPOS/blob/main/doc/ER.jpg)

## Backend
### Firebase 
is a platform that brings together various tools for backend or server side management.This makes it possible to build mobile applications efficiently. It also reduces the time and cost of doing server side or data analysis as well. There are both free tools. and equipment that costs money (for scaling)

### cloud firestore 
for a database service that is NoSQL in nature, taking the advantages of Firebase's Realtime Database as well and extending it as well.
### Authentication 
The name already says it all, yes, it is a service that manages Auth for us, which is very comprehensive, including email-password, phone, to facebook, twitter, github for login as well.

### UI
React is utilized for creating the website. An example of the website can be found [here](https://dhawin.github.io/MyPOS/)

### Backend 
In our project, we have opted for Firebase as our backend platform due to its all-encompassing suite of tools. Leveraging the Cloud Firestore for our NoSQL database allows us to capitalize on the advantages offered by Firebase's Realtime Database.

Firebase extends its functionality to authentication, managing various authentication methods seamlessly. This includes handling email-password pairs, phone authentication, as well as social media logins through platforms such as Facebook, Twitter, and GitHub.

### UI
For our web development needs, we have employed React Bootstrap, a choice made for its convenience and effectiveness. React Bootstrap aligns with our development preferences, and its component-based architecture enhances code modularity and reusability. An example of the website can be found [here](https://dhawin.github.io/MyPOS/)

# Sale Report (1.2)
## Sale Target Report
Here the link for the [Sale Target Report](https://dhawin.github.io/MyPOS/#/saleR).
 This report is divided into two essential parts to provide a comprehensive overview:
### Part One: Product Report
This section is dedicated to displaying products sold each year, facilitating a comparison with the previous year. The objective is to discern changes and strategically plan for the future. A target has been set to achieve growth exceeding 5% from the previous year.
![SaleReportProduct.jpg](https://github.com/dhawin/MyPOS/blob/main/doc/SaleReportProduct.jpg)
### Part Two: Customer Report
The Customer Report offers insights into customer purchases each year, allowing for a year-over-year comparison. This analysis helps identify trends, such as an increase or decrease in customer purchases. The findings are crucial for understanding customer behavior and formulating strategies for improvement and development to enhance customer satisfaction.
![SaleReportCustomer.jpg](https://github.com/dhawin/MyPOS/blob/main/doc/SaleReportCustomer.jpg)
## Sale Growth Report
The [Sale Growth Report](https://dhawin.github.io/MyPOS/#/saleG) acts as a pivotal tool for tracking sales trends over multiple years. Understanding the company's growth trajectory requires a comprehensive analysis of sales data over an extended period, transcending individual years. This holistic approach provides valuable insights into the overall growth trend of the company.
![SaleGrowthReport](https://github.com/dhawin/MyPOS/blob/main/doc/SaleGrowthReport.jpg)

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
# Thank you
