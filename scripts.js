
export default function display(grid){
    let canva = document.getElementById("canvas");
    let ctx = canva.getContext("2d");
    console.log(grid);
    

    const plateauH = 40;
    const plateauW = 40;
    const plateauRows = 5;
    const plateauCols = 5;

    

    const drawmap= () =>{
        for(let row =0 ; row < plateauRows ; row++){
            for(let cols =0 ; cols < plateauCols ; cols++){
                if(grid[row][cols] == 1){
                    ctx.fillStyle = "black"
                    ctx.fillRect(row *100 ,cols*100,90,90)
                }
                else if(grid[row][cols] < 0){
                    ctx.fillStyle = "blue"
                    ctx.fillRect(row *100 ,cols*100,90,90)
                }
                else{
                    ctx.fillStyle = "red"
                    ctx.fillRect(row *100 ,cols*100,90,90)
                }
            }
        }

    }  
    drawmap();
}

display();