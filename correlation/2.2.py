import pandas as pd
from scipy.stats import chi2_contingency
import sys

df = pd.read_csv('data.csv')

df_r44 = df[df['Customer'] == 'R44']

pivot_df = df_r44.pivot_table(index='Saleorder', columns='material', values='Pc', aggfunc='sum', fill_value=0)

#pivot_df.to_csv('pivot_df_r44.csv')
c = pivot_df.corr()
c.to_csv('correlation_R44.csv')
c.stack().to_csv('correlation_R44_stacked.csv')

# Display the resulting DataFrame
print("done")


