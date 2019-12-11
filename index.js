const title = document.createElement('h1')
title.innerText = 'RayCasting101'
document.body.appendChild(title)

const start = document.createElement('button')
start.innerText = 'Start!'
start.onclick = gamestart
document.body.appendChild(start)

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
//shape constructor 
function shape (x, y, w, h, color){
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.color = color
}
//drawShape function

let rec = new shape(50, 50, 25, 25, 'purple')

function drawShape (){
	ctx.fillStyle = rec.color
	ctx.fillRect  (rec.x, rec.y, rec. w, rec.h)

}

const level = {
	worldArray: [], 
	cell: {x: (window.innerWidth - 50)/20, y: (window.innerHeight - 50)/10},

}

function gamestart() {
	title.remove()
	start.remove()
	document.body.appendChild(canvas)
	canvas.width = window.innerWidth - 10
	canvas.height = window.innerHeight - 20
	ctx.translate(15, 15)
	ctx.save()

	for(let y = 0; y < 10; y++){
		let row = []
		for (let x = 0; x < 20; x++) {
			if(y === 0 || y === 9){
				row.push(true)
			} else if(x === 0 || x === 19){
				row.push(true)
			}
			else if(x === 1 && (y === 1 || y >= 8)){
				row.push(true)
			}
			else if((x >= 14 && x <= 16) && (y === 1 || y === 2)){
				row.push(true)
			}
			else if(y === 8 && (x >= 6 && x <= 8) || y === 8 && (x >= 14 && x <= 16)){
				row.push(true)
			}
			else{
				row.push(false)
			}
		}
		level.worldArray.push(row)
	}
	drawLevel()
	drawShape()
}
function drawLevel() {	
	ctx.strokeStyle = 'cyan'
	ctx.fillStyle = 'red'
	//draw
	level.worldArray.forEach((row, y) => {
		row.forEach((point, x) => {
			if (point) {
				ctx.fillRect(x*level.cell.x, y*level.cell.y, level.cell.x, level.cell.y)
				ctx.strokeRect(x*level.cell.x, y*level.cell.y, level.cell.x, level.cell.y)
			}
			else {
				//ctx.strokeRect(x*level.cell.x, y*level.cell.y, level.cell.x, level.cell.y)
			}
		})
	})

		
}

//arrow keys make movement
document.addEventListener('keydown', makeMove)
//keyCodes
//left 37
//up 38
//right 39
//down 40
//w	87
//a	65
//s	83
//d	68

function makeMove(input){
	switch(input.keyCode){
	//left and A
<<<<<<< HEAD
	case 37: 
	case 65: rec.x -= 1 
		break
	//up and W
	case 38:
	case 87: rec.y -= 1
		break
	//right and D
	case 39: 
	case 68: rec.x += 1
		break

	//down and S
	case 40: 
	case 83: rec.y += 1
=======
	case 37: rec.x -= 5 
	//case 65: rec.x -= 1 
		break
	//up and W
	case 38: rec.y -= 5
	//case 87: rec.y -= 1
		break
	//right and D
	case 39: rec.x += 5
	//case 68: rec.x += 1
		break

	//down and S
	case 40: rec.y += 5
	//case 83: rec.y += 1
>>>>>>> master
		break

	}
	input.preventDefault()
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	drawLevel()
	drawShape()
}




