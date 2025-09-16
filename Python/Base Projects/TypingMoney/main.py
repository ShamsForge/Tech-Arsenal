import random
import paragraphs as pg
import time
import os
from datetime import datetime

bank = "bank.txt"

# Story introduction
def show_story():
    clean_screen()
    print("\n" + "="*50) # gemini helped me here
    print("You are living in a basement and NASA hired you for writing their content")
    print("Earn $1000 to buy TATE's Buggati OR Be broke forever")
    print("="*50 + "\n")
    input("Press Enter to continue...")

# Check if player has already won
def check_balance_limit():
    current_balance = get_current_balance()
    if current_balance >= 1000:
        clean_screen()
        print("\n" + "="*50)
        print("You have completed the $1000 markup")
        print("You now dont work for NASA anymore because your chicks got you 'Dahej ki bullet'")
        print("so now you are living a broke life once again")
        print("="*50 + "\n")
        input("Press Enter to exit...")
        exit()

# This function sums earnings and updates first line
def get_current_balance():
    # Start with zero dollars
    total = 0
    f = open(bank, 'r')
    lines = f.readlines()
    f.close()
    
    # Skip the first two lines (balance and header) and check each line
    for line in lines[2:]:
        if "Earned $" in line:
            # Get the part after "Earned $"
            part = line.split("Earned $")[1]
            # Get the number before the " |"
            amount = float(part.split(" |")[0]) # gemini helped me here
            total = total + amount
    
    # Update the first line with new total
    lines[0] = f"Total Balance: ${total:.2f}\n" # gemini helped me here
    f = open(bank, 'w')
    f.writelines(lines)
    f.close()
    
    return total

# new earnings func
def update_bank(earned, time_taken):
    # Get current time
    now = datetime.now()
    # Format the time nicely
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S") # gemini helped me here
    
    f = open(bank, 'a')
    # Write the new earning
    f.write(f"{timestamp} | Earned ${earned} | Time: {time_taken:.2f}s\n")
    f.close()
    
    # Get and return the new total
    return get_current_balance()

# This function clears the screen
def clean_screen():
    # Clear screen command
    os.system('cls' if os.name == 'nt' else 'clear')
    print("\n" * 20)

# game function
def play():
    clean_screen()
    para = random.choice(pg.paragraph_list)     # Pick a random paragraph
    print("Type this paragraph:\n")
    print(para)
    print("\n---Press Enter to Start Typing ---")
    # Wait for enter key
    input() # new way to take inputs learnt via gemini
    
    # Start timing
    start_time = time.time()
    # Get user input
    user_input = input("Write the paragraph: ")
    # Stop timing
    end_time = time.time()
    
    # Calculate time taken
    time_taken = end_time - start_time
    
    # Return everything we need
    return para, time_taken, user_input

# This function calculates how much money we earned
def earnings(user_input):
    # Split the input into words
    words = user_input.split()
    # Count how many words
    word_count = len(words)
    
    # Check how many words and give money
    if word_count < 5:
        money = 1
    elif word_count < 10:
        money = 5
    elif word_count < 20:
        money = 10
    elif word_count < 30:
        money = 15
    elif word_count < 40:
        money = 25
    elif word_count < 50:
        money = 35
    elif word_count < 60:
        money = 45
    elif word_count < 70:
        money = 55
    elif word_count < 80:
        money = 65
    elif word_count < 90:
        money = 75
    elif word_count < 100:
        money = 85
    else:
        money = 100
    
    # Return the money earned
    return money

if not check_balance_limit():
    show_story()
    

# Show story

# Check if player has already won
check_balance_limit()

# Show current balance
current_balance = get_current_balance()
print(f"Current Balance: ${current_balance:.2f}")

# Play the game
para, time_taken, user_input = play()

# Calculate earnings
earned = earnings(user_input)

# Update bank and get new balance
new_balance = update_bank(earned, time_taken)

# Show results
print(f"\nYou earned ${earned}")
print(f"Time taken: {time_taken:.2f} seconds")
print(f"New Balance: ${new_balance:.2f}")

# Check if player won
if new_balance >= 1000:
    print("\n" + "="*50)
    print("You now have tate's buggati and his 2 chicks sitting next to you!!!")
    print("You Won (Never come back :) )")
    print("="*50 + "\n")
    input("Press Enter to exit...")
    exit()



