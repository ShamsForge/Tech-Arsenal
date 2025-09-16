import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import calendar
import seaborn as sns
from pandas.plotting import register_matplotlib_converters


register_matplotlib_converters()


df = pd.read_csv('fcc-forum-pageviews.csv', parse_dates=['date'], index_col='date')

# Clean data
df = df[(df['value'] >= df['value'].quantile(0.025)) & (df['value'] <= df['value'].quantile(0.975))] 


def draw_line_plot():
    # Draw line plot

    fig, ax = plt.subplots(figsize=(15, 5))
    ax.plot(df.index, df['value'], color='red')
    ax.set_title('Daily freeCodeCamp Forum Page Views 5/2016-12/2019')
    ax.set_xlabel('Date')
    ax.set_ylabel('Page Views')



    # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig

def draw_bar_plot():
    

    # Extracting year and month from the date
    df['year'] = df.index.year
    df['month'] = df.index.month_name()


    df_bar = df.groupby(['year', 'month'])['value'].mean().unstack()

    
    month_order = list(calendar.month_name)[1:] 
    df_bar = df_bar[month_order]

    # Creating the bar plot
    fig, ax = plt.subplots(figsize=(10, 6))
    df_bar.plot(kind='bar', ax=ax)

    
    ax.set_xlabel('Years')
    ax.set_ylabel('Average Page Views')
    ax.set_title('Average Daily Page Views per Month')
    ax.legend(title='Months')

    



    # Save image and return fig (don't change this part)
    fig.savefig('bar_plot.png')
    return fig

    
def draw_box_plot():
    # Prepare data for box plots (this part is done!)
    df_box = df.copy()
    df_box.reset_index(inplace=True)
    df_box['year'] = [d.year for d in df_box.date]
    df_box['month'] = [d.strftime('%b') for d in df_box.date]

    # Draw box plots (using Seaborn)

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))

    # Year-wise box plot (Trend)
    sns.boxplot(x='year', y='value', data=df, ax=ax1)
    ax1.set_title('Year-wise Box Plot (Trend)')
    ax1.set_xlabel('Year')
    ax1.set_ylabel('Page Views')

    # Month-wise box plot (Seasonality)
    month_order = list(calendar.month_abbr)[1:] 
    sns.boxplot(x='month', y='value', data=df, order=month_order, ax=ax2)
    ax2.set_title('Month-wise Box Plot (Seasonality)')
    ax2.set_xlabel('Month')
    ax2.set_ylabel('Page Views')

    
    plt.tight_layout()



    # Save image and return fig (don't change this part)
    fig.savefig('box_plot.png')
    return fig


