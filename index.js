const title = document.createElement('h1')
title.innerText = 'RayCasting101'
document.body.appendChild(title)

const start = document.createElement('button')
start.innerText = 'Start!'
start.onclick = gameStart
document.body.appendChild(start)

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
//shape constructor 
function character (x, y, w, h, color){
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.color = color
	this.generateCenter = function () {
		return	{x: (player.x + player.w / 2), y: (player.y + player.h / 2)}
	}	

	this.generateCorners = function() {
		return {
			topLeft: { 
				x: this.x, 
				y: this.y
			}, 
			topRight: {
				x: this.x+this.w,
				y: this.y
			}, 
			bottomLeft: {
				x: this.x,
				y: (this.y+this.h)
			}, 
			bottomRight: {
				x: (this.x+this.w),
				y: (this.y+this.h)
			}}
	}
}
//drawShape function

let player = new character(500, 500, 25, 25, 'purple')

function drawCharacter (){
	ctx.fillStyle = player.color
	ctx.fillRect  (player.x, player.y, player. w, player.h)
	let center = player.generateCenter()
	let slope = {rise: 1, run: 1}
	for (let index = 0; index <= 50; index++) {
		slope.rise -= .04
		Ray(center, slope)
	}
}

const level = {
	worldArray: [], 
	unitCell: {x: (window.innerWidth - 50)/20, y: (window.innerHeight - 50)/10},

}

function gameStart() {
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
			let cell = { //reference to the cell being rendered
				topLeft: { 
					x: x*level.unitCell.x, 
					y: y*level.unitCell.y
				}, 
				topRight: {
					x: (x*level.unitCell.x) + level.unitCell.x,
					y: y*level.unitCell.y
				}, 
				bottomLeft: {
					x: x*level.unitCell.x,
					y: (y*level.unitCell.y) + level.unitCell.y
				}, 
				bottomRight: {
					x: (x*level.unitCell.x) + level.unitCell.x,
					y: (y*level.unitCell.y) + level.unitCell.y
				}
			}
			if(y === 0 || y === 9){
				row.push(cell)
			} else if(x === 0 || x === 19){
				row.push(cell)
			}
			else if(x === 1 && (y === 1 || y >= 8)){
				row.push(cell)
			}
			else if((x >= 14 && x <= 16) && (y === 1 || y === 2)){
				row.push(cell)
			}
			else if(y === 8 && (x >= 6 && x <= 8) || y === 8 && (x >= 14 && x <= 16)){
				row.push(cell)
			}
			else{
				row.push(null)
			}
		}
		level.worldArray.push(row)
	}
	drawLevel()
	drawCharacter()
}
function drawLevel() {	
	ctx.strokeStyle = 'cyan'
	ctx.fillStyle = 'red'
	//draw
	level.worldArray.forEach((row) => {
		row.forEach((cell) => {
			if (cell) {
				ctx.fillRect(cell.topLeft.x, cell.topLeft.y, level.unitCell.x, level.unitCell.y)
				ctx.strokeRect(cell.topLeft.x, cell.topLeft.y, level.unitCell.x, level.unitCell.y)
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
	let cellY
	let cellX
	let cellY2
	let cellX2
	let cell
	let cell2
	const speed = 15
	const corners = player.generateCorners()
	switch(input.keyCode){
	//left and A
	case 37: 
	case 65: 
		cellY = Math.floor(corners.topLeft.y/level.unitCell.y)
		cellX = Math.floor((corners.topLeft.x - speed)/level.unitCell.x)
		cellY2 = Math.floor(corners.bottomLeft.y/level.unitCell.y)
		cellX2 = Math.floor((corners.bottomLeft.x - speed)/level.unitCell.x)
		cell = level.worldArray[cellY][cellX]
		cell2 = level.worldArray[cellY2][cellX2]
		if(!cell && !cell2) {
			player.x -= speed
		}
		else{
			cell ? player.x = cell.topRight.x + 1 : player.x = cell2.topRight.x + 1
		}
		break
	//up and W
	case 38:
	case 87: 
		cellY = Math.floor((corners.topLeft.y - speed)/level.unitCell.y)
		cellX = Math.floor((corners.topLeft.x)/level.unitCell.x)
		cellY2 = Math.floor((corners.topRight.y - speed)/level.unitCell.y)
		cellX2 = Math.floor((corners.topRight.x)/level.unitCell.x)
		cell = level.worldArray[cellY][cellX]
		cell2 = level.worldArray[cellY2][cellX2]
		if(!cell && !cell2) {
			player.y -= speed
		}
		else{
			cell ? player.y = cell.bottomRight.y + 1 : player.y = cell2.bottomRight.y + 1
		}

		break
	//right and D
	case 39: 
	case 68: 
		cellY = Math.floor(corners.topRight.y/level.unitCell.y)
		cellX = Math.floor((corners.topRight.x + speed)/level.unitCell.x)
		cellY2 = Math.floor(corners.bottomRight.y/level.unitCell.y)
		cellX2 = Math.floor((corners.bottomRight.x + speed)/level.unitCell.x)
		cell = level.worldArray[cellY][cellX]
		cell2 = level.worldArray[cellY2][cellX2]
		if(!cell && !cell2) {
			player.x += speed
		}
		else{
			cell ? player.x = cell.topLeft.x - (player.w + 1) : player.x = cell2.topLeft.x - (player.w + 1)
		}
		break

	//down and S
	case 40: 
	case 83: 
		cellY = Math.floor((corners.bottomLeft.y + speed)/level.unitCell.y) 
		cellX = Math.floor((corners.bottomLeft.x)/level.unitCell.x)
		cellY2 = Math.floor((corners.bottomRight.y + speed)/level.unitCell.y)
		cellX2 = Math.floor((corners.bottomRight.x)/level.unitCell.x)
		cell = level.worldArray[cellY][cellX]
		cell2 = level.worldArray[cellY2][cellX2]
		if(!cell && !cell2) {
			player.y += speed
		}
		else{
			cell ? player.y = cell.topRight.y - (player.h + 1): player.y = cell2.topRight.y - (player.h + 1)
		}
		break

	}
	input.preventDefault()
	ctx.clearRect(-15, -15, canvas.width, canvas.height)
	drawLevel()
	drawCharacter()
}

function Ray(temp, slope) {
	let point = {x: temp.x + slope.run, y: temp.y + slope.rise}
	let cellY = Math.floor((point.y)/level.unitCell.y) 
	let cellX = Math.floor((point.x)/level.unitCell.x)	
	let cell = level.worldArray[cellY][cellX]
	ctx.beginPath()
	ctx.moveTo(temp.x, temp.y)
	ctx.lineTo(point.x, point.y)
	ctx.strokeStyle = 'yellow'
	ctx.lineWidth = 2
	ctx.stroke()
	if(!cell){
		Ray(point, slope) 
		return
	}
	else return point
}