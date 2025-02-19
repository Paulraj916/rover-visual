import { isValidPosition } from "./utils.js";
import Rover from "./rover.js";

export function display(grid,roverImageSrc="top.png") {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    const rows = grid.length;        
    const cols = grid[0].length;     

    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    const padding = 0.05; 
    const spacingX = padding * cellWidth;
    const spacingY = padding * cellHeight;

    console.log(rows, cols, cellWidth, cellHeight, spacingX, spacingY);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawing

    // Load images
    const images = {
        obs: new Image(),
        grass: new Image(),
        rover: new Image()
    };

    images.obs.src = "obs.png";     
    images.grass.src = "grass.png";    
    images.rover.src = roverImageSrc; 

    // Function to draw the grid
    const drawmap = () => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let img = images.grass; // Default to grass

                if (grid[row][col] == 1) {
                    img = images.obs; // Use obs image for 1
                } else if (grid[row][col] < 0) {
                    img = images.rover; // Use rover image for -1
                }else{
                    img = images.grass; // Use grass image for 0
                }

                let newY = canvas.height - (row + 1) * cellHeight; 

                // Ensure images are loaded before drawing
                img.onload = () => {
                    ctx.drawImage(
                        img,
                        col * cellWidth + spacingX / 2,  // X position
                        newY + spacingY / 2,            // Y position (Flipped)
                        cellWidth - spacingX,  
                        cellHeight - spacingY   // Adjust height for spacing
                    );
                };

                // If the image is already loaded (prevents delay)
                if (img.complete) {
                    ctx.drawImage(
                        img,
                        col * cellWidth + spacingX / 2,
                        newY + spacingY / 2,  // Flipped Y position
                        cellWidth - spacingX,
                        cellHeight - spacingY
                    );
                }
            }
        }
    };

    // Ensure images are loaded before calling drawmap
    function imageLoader() {
        let loadedImages = 0;
        const totalImages = Object.keys(images).length;

        for (let key in images) {
            images[key].onload = () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                    drawmap();
                }
            };
        }
    }
    imageLoader();
}



export default class Plateau {
    constructor(grid, obstacles, count, roverPos, commands) {
        this.grid = Array.from({ length: grid[0] }, () => Array(grid[1]).fill(0));
        this.obstacles = obstacles;
        this.rovers = [];
        this.setObstacles();
        this.setRovers(count, roverPos, commands);
    }

    // Set obstacles in the grid as 1
    setObstacles() {
        for (let obstacleCoordinate of this.obstacles) {
            this.grid[obstacleCoordinate[0]][obstacleCoordinate[1]] = 1;
        }
        
        display(this.grid);
    }

    // Set rovers in the grid as -1,-2,-3,...
    async setRovers(count, roverPos, commands) {
        for (let i = 0; i < count; i++) {
            if (isValidPosition(roverPos[i], this.grid)) {
                const rover = new Rover(roverPos[i]);
                let updatedPos = await rover.execute(commands[i],this.grid);
                this.rovers.push(updatedPos);
                this.grid[updatedPos[0]][updatedPos[1]]=-(i+1);
            }
        }
    }

    

}
