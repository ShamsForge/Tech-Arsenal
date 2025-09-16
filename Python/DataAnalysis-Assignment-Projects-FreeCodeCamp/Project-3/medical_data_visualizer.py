import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 1
df = pd.read_csv('medical_examination.csv')

# outcomes for the cholesterol, gluc, alco, active, and smoke variables for patients with cardio=1 and cardio=0 in different panels.
#def draw_bar_diagram():

cardio_0 = df[df['cardio'] == 0]
cardio_1 = df[df['cardio'] == 1]

variables = ['cholesterol', 'gluc', 'alco', 'active', 'smoke']


fig, axes = plt.subplots(nrows=1, ncols=5, figsize=(15, 4))


for idx, var in enumerate(variables):
   
    counts_0 = cardio_0[var].value_counts().sort_index()
    counts_1 = cardio_1[var].value_counts().sort_index()


    unique_values = sorted(list(set(counts_0.index) | set(counts_1.index)))


    counts_0_values = []
    counts_1_values = []
    for val in unique_values:
        counts_0_values.append(counts_0.get(val, 0))
        counts_1_values.append(counts_1.get(val, 0))

    
    x = [i for i in range(len(unique_values))]
    width = 0.35 

    
    axes[idx].bar([i - width/2 for i in x], counts_0_values, width, label='Cardio 0')
    
    axes[idx].bar([i + width/2 for i in x], counts_1_values, width, label='Cardio 1')

    
    axes[idx].set_title(var)  
    axes[idx].set_xticks(x)  
    axes[idx].set_xticklabels(unique_values)  
    if idx == 0:
        axes[idx].set_ylabel('Number of Patients') 




axes[0].legend(['Cardio 0', 'Cardio 1'], loc='upper center', ncol=2)

# Adjust layout to prevent overlap and save the plot
plt.tight_layout()

fig.savefig('barchart.png')







#2 

BMI = df['weight'] / (df['height'] / 100) ** 2

df['overweight'] = 0
df.loc[ BMI > 25, 'overweight'] = 1

df.to_csv('medical_examination_updated.csv', index=False)


# 3

df['cholesterol'] = df['cholesterol'].apply(lambda x: 0 if x == 1 else 1)
df['gluc'] = df['gluc'].apply(lambda x: 0 if x == 1 else 1)

df.to_csv('medical_examination_updated.csv', index=False)



print(df.head(15))




# 4
def draw_cat_plot():

    # 5
    
    df_cat = pd.melt(
        df,
        id_vars=['cardio'],
        value_vars=['cholesterol', 'gluc', 'smoke', 'alco', 'active', 'overweight'],
        var_name='variable',
        value_name='value'
    )

    # 6
    # Group and count by cardio, variable, and value
    df_cat = df_cat.groupby(['cardio', 'variable', 'value']).size().reset_index(name='total')

    # 7
    # Create the catplot
    fig = sns.catplot(
        x='value',
        y='total',
        hue='cardio',
        col='variable',
        kind='bar',
        data=df_cat,
        height=4,
        aspect=0.5,
        col_wrap=3
    )



    # 9
    fig.savefig('catplot.png')
    return fig



# 10
def draw_heat_map():
    
    # 11
    # Data cleaning
    df_heat = df[
        (df['ap_lo'] <= df['ap_hi']) &  
        (df['height'] >= df['height'].quantile(0.025)) &  
        (df['height'] <= df['height'].quantile(0.975)) &  
        (df['weight'] >= df['weight'].quantile(0.025)) & 
        (df['weight'] <= df['weight'].quantile(0.975))
    ]

    # 12
    
    corr = df_heat.corr()

    # 13
    # Generate a mask for the upper triangle
    mask = np.triu(np.ones_like(corr, dtype=bool))

    # 14
    
    fig, ax = plt.subplots(figsize=(10, 8))

    # 15
    
    sns.heatmap(
        corr,
        mask=mask,
        annot=True,  # Show correlation values
        fmt='.1f',   # Format to one decimal place
        cmap='coolwarm',  # Color scheme
        center=0,    # Center the colormap at 0
        square=True, # Make cells square
        cbar_kws={'shrink': 0.5}  # Adjust colorbar size
    )

    
    
  


    # 16
    fig.savefig('heatmap.png')
    return fig



