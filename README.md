# Panels
> An escape room style game

![Cover image](https://github.com/Cesium72/panels/blob/main/splash.png?raw=true)
## About
Well, it was going to be an escape room, but it ended up just being a series of puzzles :\)
It is fully static, and is visible at the demo url on [github pages](https://cesium72.github.io/panels)
## Features
- Three levels:
    - Basic slider manipulation
    - A swap-to-solve puzzle
    - A tic-tac-toe game, but with the squares shuffled >:\)
- Adjustable view
    - Different game elements are different squares, so the user can choose which ones to show and how many of them.
## Hints (Spoiler Alert!!!)
1. Hints for Slider Levels
    - You will want to have all of the slider screens visible. Also select grid 2, or grid 1 if you haven't unlocked it yet.
    - For both grids, the goal is to make it so that every square has a dot in it and that every dot is in a square. For grid 2, the dots move on 2 axes instead of 1. Unlike grid 1, the axes are rigged up randomly, so play around until you get it :\)
2. Hints for Circle Levels
    - Make sure that all of the circles are visible, and it also helps to have them in order. You won't need the slider or grid panels anymore, so you can replace them with the circle panels.
    - Clicking on the central circle will rotate the four segments around it clockwise. Clicking outside of this circle will swap the nearest wedge with the corresponding one in the next circle. For example, if you click in the top right quadrant of the second circle panel, it will swap whatever is there with the wedge in the top right corner of the third circle. The fourth circle wraps around to the first.
    - It is much easier to solve two circles next to each other and then solve the other two. Also, solving a circle means making all the wedges the same color as the central circle. If you didn't figure this out, you should probably stop playing for now.
3. Tic-tac-toe: demon edition
    - The premise of the final level is to win a game of tic-tac-toe against the algorithm, but the squares are shuffled. Make sure you have all of the tic-tac-toe panels showing, then just click on a random one each turn. If you feel extra smart, you can try to replicate the bot's wins. Once you finish this level, you're done. Go get a glass of water.
