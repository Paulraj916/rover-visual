# Mars-Rover-kata
# Problem Statement:
The problem we will be handling is ```Mars Rover Kata```.The main objective of the problem statement is to control the movement of the Rover based on the constraints given. We will be given ```Plateau``` size in dimensions (n x n). Initial coordinates of the ```Rover``` as (x,y,Direction it is facing) for example ```[0 2 N]```, ```Commands for the movements``` as (```[LFFRB]``` L - Left turn , R - Right turn, F - Move Forward, B - Move Backward), Obstacles as ```[ [x1,y1],[x2,y2]...,[xn,yn] ] ```.
There could be multiple rovers on the plateau, no rover could be at the same coordinates. Consider plateau as a sphere (wrapped at edges) with obstacles on it. Whenever a rover finds an obstacle in its path it cannot move further and the movement of the rover stops.


## Example Test Cases
### Input
 ```
5 5 - Plateau Dimensions
[ [3,1], [1,3] ] - Obstacles 
2 - Number of Rovers
[0 1 N ] - Initial Position of Rover 1
LLFBRB - Commands for Rover 1
[3 2 S ] - Initial Position of Rover 2
RFFLR - Commands for Rover 2
```
### Output
```
[1 1 W] - Position for Rover 1
[1 2 W] - Position for Rover 2
```


