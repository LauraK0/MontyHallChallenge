# MontyHallChallenge

Write a program that demonstrates that Vos Savant is correct. You will use the output of your program to convince your interviewer that, after the host opens a door, switching doors is always the correct choice.

#### How to use:

Try the app out [here](https://laurak0.github.io/MontyHallChallenge/)

To clone this repo to your local computer, copy and paste the following into your terminal:

```git clone git@github.com:LauraK0/MontyHallChallenge.git```


#### Learning Aims:

- [x] Gain an understanding of the problem - perhaps see how your friends react if you play the part of the host.
- [x] Convince yourself that Vos Savant was correct.
- [x] Design and write software that will run sample games employing either the stick or switch strategy.
- [x] Put the code in a public GitHub repository
- [ ] Use your software to show that switching doors is statistically the best option.
- [x] The elegance of the output is not important so long as the program can be used to prove the point.

### What is the Monty Hall problem?

- Probability puzzle
- Loosely based on the American television game show Let's Make a Deal and named after its original host, Monty Hall.
- In the puzzle, you are asked to choose between three doors. 
- Behind one of which there is a prize, the two other doors do not continue a prize. 
- You choose a door. 
- Once you have made your selection, Monty Hall will open one of the remaining doors, revealing that it does not contain the prize The host will always pick a door without a prize.
- The host then asks whether you would like to switch your choice of door to the other remaining door. 
- Do you switch or not? 
- Probability tells you that should 

####
- What probability says:

![image](https://user-images.githubusercontent.com/108976875/202731546-6763d3a3-7dab-48dc-8178-f0bde5677f92.png)

### Why does switching give you better odds?

- The only way to get it wrong by switching is to have picked the correct door in the first place. The odds of picking the correct door first are 1 in 3. Therefore, the odds of switching to the correct door is 2 in 3. 

### User stories
- user should be given choice of one of three doors
- host should open one of the remaining doors, door that host opens should always be empty
- user is given choice to swap doors
- host reveals whether user has won the game or not
- user should be able to accumulate statistics - this should be stored to local storage so that it is not lost
- statistic would include win percentages where user has not switched and where user has switched
- (Stretch goal) user should be able to simulate the game
- (stretch goal) responsive design so that it can be played on mobile
- (stretch goal) accessible design so that it can be played by all
