# MasterMind Game

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [How to Play](#how-to-play)
6. [Project Structure](#project-structure)
7. [Future Improvements](#future-improvements)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

This project is an implementation of the classic MasterMind game (also known as Bulls and Cows) using pure JavaScript. It was developed as part of a full-stack course and represents the second out of six projects in the curriculum. The game features a single-player mode where the player attempts to guess a randomly generated color code set by the computer.

## Features

- **User Authentication**: Includes login and sign-up functionality.
- **Gameplay Mechanics**: 
  - Computer generates a random 4-color code from 6 possible colors.
  - Players make guesses and receive feedback after each attempt.
  - Feedback includes black (correct color and position) and white (correct color, wrong position) indicators.
- **Timer**: Tracks the duration of each game.
- **High Score System**: Saves and displays the player's quickest game time.
- **Hint System**: Players can use one hint per game.
- **Game Continuation**: Allows players to continue interrupted games.
- **Local Storage**: Utilizes browser's local storage for saving game progress and user data.
- **Audio Effects**: Includes sound effects for various in-game actions.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage API

## Installation

1. Clone the repository:
git clone https://github.com/yopsitsme/mastermind-game.git
2. Navigate to the project directory:
cd mastermind-game
3. Open the `index.html` file in your web browser.

## How to Play

1. Sign up or log in to your account.
2. Start a new game or continue a saved game.
3. Try to guess the hidden color code set by the computer.
4. After each guess, you'll receive feedback:
- Black indicators show correct color and position.
- White indicators show correct color but wrong position.
5. Use the hint feature if you need help (once per game).
6. Keep guessing until you crack the code or run out of attempts.
7. Try to beat your best time!
  
## Future Improvements

- Implement responsive design for better mobile and tablet experience.
- Integrate with a backend database for more secure and scalable data storage.
- Refactor code to improve organization and utilize modern JavaScript features.
- Enhance accessibility features.
- Add a multiplayer mode.

## Contributing

- Chana Perel Kats ([@yopsitsme](https://github.com/yopsitsme))
- Rut Rutenberg ([@Yoni4517](https://github.com/Yoni4517))
