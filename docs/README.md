## Crazy Cabbie

### Background

Crazy Cabbie is a car game where the player receives points based on the car speed and elapsed time.
The rules are as follows:

1) Player car has to cross a check post every 20 seconds,
2) Hitting another car will slow down the player car
3) Player will receive points based on their speed and elapsed time


### Functionality & MVP  

With Crazy Cabbie, users will be able to:

- [ ] Start, pause, and reset the game
- [ ] Switch lanes to using directional keys to avoid collision
- [ ] Jump over other cars
- [ ] Control the speed of the car

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with the game screen in the middle, game controls, and nav links to the Github, LinkedIn, and the About modal. Game controls will include Start, Stop, and Reset buttons. The footer will contain creator's name and email.

![wireframe](https://github.com/zama1024/Crazy-Cabbie/blob/master/docs/wireframe.png)

### Architecture and Technologies


This project will be implemented with the following technologies:

-  JavaScript and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
-  Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`game.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`road.js`: Implements the logic for rendering obstacle and car movement.

`car.js`: implements the logic for the player car

`obstacles.js`: car obstacles object

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Obstacles` object to connect to the `road` object.  Then, use `road.js` to create and render the obstacles.

- Complete the `obstacles.js` module (constructor, update functions)
- Render obstacle cars to the `Canvas` using `Easel.js`


**Day 3**: Create the player car object.  Incorporate the car logic into the `Road.js` rendering.  Goals for the day:

- Have a functional car object that can change lanes on road depending on keypress.


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset
- Have a styled `Canvas`, nice looking controls and title
