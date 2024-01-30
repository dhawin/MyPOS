import pandas as pd
from scipy.stats import chi2_contingency
import sys

df = pd.read_csv('data.csv')

pivot_df = df.pivot_table(index='Saleorder', columns='material', values='Pc', aggfunc='sum', fill_value=0)

c = pivot_df.corr()
c.to_csv('correlation_all.csv')
c.stack().to_csv('correlation_all_stacked.csv')

# Display the resulting DataFrame
print("done")


