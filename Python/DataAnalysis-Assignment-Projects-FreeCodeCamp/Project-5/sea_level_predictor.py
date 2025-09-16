import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')

    # Create scatter plot

    plt.scatter(df['Year'], df['CSIRO Adjusted Sea Level'])
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.title('Rise in Sea Level')
    plt.grid(True)
    plt.savefig('scatter_plot.png')


    # Create first line of best fit

    slope1, intercept1, r_value1, p_value1, std_err1 = linregress(df['Year'], df['CSIRO Adjusted Sea Level'])
    x1 = range(1880, 2051)
    y1 = slope1 * x1 + intercept1
    plt.plot(x1, y1, color='red', label='Best Fit Line (1880-2050)')
             
    # Create second line of best fit

    recent_years = df[df['Year'] >= 2000]
    slope2, intercept2, r_value2, p_value2, std_err2 = linregress(recent_years['Year'], recent_years['CSIRO Adjusted Sea Level'])
    x2 = range(2000, 2051)
    y2 = slope2 * x2 + intercept2
    plt.plot(x2, y2, color='green', label='Best Fit Line (2000-2050)')

    # Add labels and title

    plt.legend(loc='upper left', fontsize=8, title='Legend')
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.title('Rise in Sea Level')
    plt.grid(True)

    
    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()