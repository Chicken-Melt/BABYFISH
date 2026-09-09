# BABYFISH

A browser game built with HTML5 Canvas and JavaScript. Guide the big fish to collect fruit and keep the baby fish fed.

## Start the game

No dependencies or build step are required.

1. Download or clone this repository:

   ```sh
   git clone https://github.com/Chicken-Melt/BABYFISH.git
   cd BABYFISH
   ```

2. Open `tinyHeart.html` in your browser.

Alternatively, if you have Python 3 installed, start a local server from the repository folder:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open [the local game](http://127.0.0.1:8765/tinyHeart.html). Keep the terminal running while you play; press `Ctrl+C` in the terminal to stop the server.

## How to play

1. Move your mouse inside the game area. The big fish follows your pointer, and the baby follows the big fish.
2. Swim into fruit to collect it.
3. Bring the big fish close to the baby to feed it. Feeding restores the baby's color and adds points to your score.
4. Keep collecting and feeding! The baby gradually fades when it is hungry.
5. If the baby fades completely, the game ends and displays your final score.

The game starts as soon as the page loads. It is designed for mouse control.

## Scoring

Points are awarded when you feed the baby, rather than when you collect fruit.

- Each collected fruit is worth **100 points**.
- Collecting any blue fruit doubles the value of the entire batch carried until the next feeding.
- Feeding clears the carried fruit and resets the multiplier.

For example, delivering three orange fruits earns **300 points**. Delivering three fruits with at least one blue fruit earns **600 points**.

## Difficulty

Choose a difficulty from the dropdown above the game. **Changing difficulty starts a new game and resets your score.** Normal is selected by default.

| Difficulty | Time without feeding before game over | Fruit availability | Fruit rise speed |
| --- | --- | --- | --- |
| Easy | About 10 seconds | More fruit | Slower |
| Normal | About 6 seconds | Standard | Standard |
| Hard | About 4 seconds | Fewer fruit | Faster |

These times refer to active gameplay and may vary if the browser slows down or the tab is in the background. Each feeding resets the hunger timer.

## Feeding countdown

The **Next feed in** counter above the game shows how many seconds remain before the baby starves. The bar shrinks as time runs out. During the last 30% of the feeding window, it turns orange and displays **Feed the baby now!**

Feeding the baby resets the countdown. Restarting or changing difficulty resets it to that difficulty's full feeding time. At game over, the counter stays at zero until you restart.

## Fish speed

Use the **Fish speed** slider to adjust how quickly both fish follow their targets:

- **0.5×:** slowest movement.
- **1×:** default movement.
- **2×:** fastest movement.

The slider changes speed immediately without resetting your score. It does not change the baby's hunger rate or the fruit's speed.

## Restart

- Click **Restart game** above the game to start over at any time.
- After game over, click **Play again**.

Restarting clears the score, carried fruit, hunger, and effects, and resets fish positions and fruit. Your selected difficulty and fish speed stay the same. Reloading the page restores the default settings.

## Explore the code

- `tinyHeart.html`: game page, controls, and canvas layout.
- `js/main.js`: initialization, game loop, settings, and restart logic.
- `js/mom.js` and `js/baby.js`: fish movement and animation; baby hunger.
- `js/fruit.js`: fruit spawning and movement.
- `js/collision.js`: fruit collection and feeding.
- `js/data.js`: scoring and score display.
- `src/`: game images.

Originally based on [deeight/BABYFISH](https://github.com/deeight/BABYFISH).
