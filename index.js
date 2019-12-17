const title = document.createElement('h1')
title.innerText = 'RayCasting101'
document.body.appendChild(title)

const start = document.createElement('button')
start.innerText = 'Immerse Yourself!'
start.onclick = gameStart
document.body.appendChild(start)

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
let xAxis = []
//character constructor 
function character (x, y, r, color){
	this.r = r
	this.center = {x: x, y: y}
	this.color = color
	this.angle = 0
}

const level = {
	worldArray: [], 
	unitCell: {x: (window.innerWidth - 50)/20, y: (window.innerHeight - 50)/10},

}

let player = new character(level.unitCell.x * 3 , level.unitCell.y * 3, 10, 'purple')
//draw rays func
let drawPlayer = false
let drawRays = false
function castRays (){

	ctx.save()
	if(drawPlayer){
		ctx.save()
		ctx.fillStyle = player.color
		ctx.translate(player.center.x, player.center.y)
		ctx.beginPath()
		ctx.arc(0, 0, player.r, 0, 360)
		ctx.fill()
		ctx.restore()
	}
	let center = player.center
	let temp = player.angle
	let slope = {rise: 0, run: 1}
	xAxis = []
	for (let index = 0; index <= 90; index++) {	
		let x = center.x + 1 * Math.cos(temp)
		let y = center.y + 1 * Math.sin(temp)
		slope.run = center.x - x
		slope.rise = center.y - y
		let point = Ray(center, slope)
		let sliver = {distance: Math.sqrt(Math.pow(point.y - center.y, 2) + Math.pow(point.x - center.x, 2)), coordinate: point, color: 'darkblue'}
		xAxis.push(sliver)
		temp += .015
		if(drawRays){
			ctx.beginPath()
			ctx.moveTo(center.x, center.y)
			ctx.lineTo(point.x, point.y)
			ctx.strokeStyle = 'yellow'
			ctx.lineWidth = 5
			ctx.stroke()
		}
	}
	ctx.restore()
}


function drawFirstPerson() {
	let maxHeight = window.innerHeight - 50
	let maxDistance = window.innerWidth - 50
	ctx.save()
	ctx.fillStyle = 'purple'
	ctx.fillRect(0, 0, maxDistance, maxHeight / 2)
	ctx.fillStyle = 'darkred'
	ctx.fillRect(0, maxHeight / 2, maxDistance, maxHeight)
	ctx.restore()

	for (let index = 0; index < xAxis.length; index++) {
		const sliver = xAxis[index]
		let drawHeight = (maxDistance / sliver.distance) * 10 
		ctx.save()
		ctx.fillStyle = `rgb(0,0,${(255 * drawHeight) / maxHeight})`
		ctx.fillRect((maxDistance / 90) * index, (maxHeight / 2)- (drawHeight / 2), 25, drawHeight)
		ctx.restore()
	}
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
				type: 1,//wall
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
				cell.type = 0
				row.push(cell)
			}
		}
		level.worldArray.push(row)
	}
	drawTopDown()
	// castRays()
}
function drawLevel() {	
	ctx.strokeStyle = 'cyan'
	ctx.fillStyle = 'darkred'
	//draw
	level.worldArray.forEach((row) => {
		row.forEach((cell) => {
			if (cell.type === 1) {
				ctx.fillRect(cell.topLeft.x, cell.topLeft.y, level.unitCell.x , level.unitCell.y )
				ctx.strokeRect(cell.topLeft.x , cell.topLeft.y , level.unitCell.x , level.unitCell.y )
			}
		})
	})
}

function drawTopDown() {
	drawPlayer = true
	drawRays = true
	castRays()
	drawLevel()
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
//q 81
//e 69


function makeMove(input){
	let cellY
	let cellX
	let cell
	const speed = 15
	const rotationSpeed = .1
	let x
	let y
	let vx
	let vy
	let center = player.center
	let tLCheck 
	let tRCheck 
	let bLCheck 
	let bRCheck 
	let canMove = true
	switch(input.keyCode){
	//left turn e
	case 69: player.angle = +mod(player.angle + rotationSpeed, Math.PI * 2).toFixed(7)
		break
	//right turn q
	case 81: player.angle = +mod(player.angle - rotationSpeed, Math.PI * 2).toFixed(7)
		break
	//left and A
	// case 37: 
	// case 65: 
	// 	cellY = Math.floor(corners.topLeft.y/level.unitCell.y)
	// 	cellX = Math.floor((corners.topLeft.x - speed)/level.unitCell.x)
	// 	cellY2 = Math.floor(corners.bottomLeft.y/level.unitCell.y)
	// 	cellX2 = Math.floor((corners.bottomLeft.x - speed)/level.unitCell.x)
	// 	cell = level.worldArray[cellY][cellX]
	// 	cell2 = level.worldArray[cellY2][cellX2]
	// 	if(!cell && !cell2) {
	// 		player.x -= speed
	// 	}
	// 	else{
	// 		cell ? player.x = cell.topRight.x + 1 : player.x = cell2.topRight.x + 1
	// 	}
	// 	break
	//up and W
	case 38:
	case 87: 

		x = center.x + 1 * Math.cos(player.angle + (.015 * 44))
		y = center.y + 1 * Math.sin(player.angle + (.015 * 44))
		vx = center.x - x
		vy = center.y - y

		cellY = Math.floor((center.y + (vy * (speed + player.r)))/level.unitCell.y)
		cellX = Math.floor((center.x + (vx * (speed + player.r)))/level.unitCell.x)
		cell = level.worldArray[cellY][cellX]
		if(cell.type === 0) {
			tLCheck = (Math.pow(player.r, 2) >= Math.pow(cell.topLeft.x - (player.center.x + (vx * speed)), 2) + Math.pow(cell.topLeft.y - (player.center.y + (vy * speed)), 2) )
			tRCheck = (Math.pow(player.r, 2) >= Math.pow(cell.topRight.x - (player.center.x + (vx * speed)), 2) + Math.pow(cell.topRight.y - (player.center.y + (vy * speed)), 2) )
			bLCheck = (Math.pow(player.r, 2) >= Math.pow(cell.bottomLeft.x - (player.center.x + (vx * speed)), 2) + Math.pow(cell.bottomLeft.y - (player.center.y + (vy * speed)), 2) )
			bRCheck = (Math.pow(player.r, 2) >= Math.pow(cell.bottomRight.x - (player.center.x + (vx * speed)), 2) + Math.pow(cell.bottomRight.y - (player.center.y + (vy * speed)), 2) )			
			if(tLCheck){
				if(level.worldArray[cellY -1][cellX].type === 1
				|| level.worldArray[cellY][cellX - 1].type === 1
				|| level.worldArray[cellY - 1][cellX - 1].type === 1
				){
					canMove = false
				}
			}
			if(tRCheck){
				if(level.worldArray[cellY - 1][cellX].type === 1
				|| level.worldArray[cellY][cellX + 1].type === 1
				|| level.worldArray[cellY - 1][cellX + 1].type === 1
				){
					canMove = false
				}
			}
			if(bLCheck){
				if(level.worldArray[cellY + 1][cellX].type === 1
				|| level.worldArray[cellY][cellX - 1].type === 1
				|| level.worldArray[cellY + 1][cellX - 1].type === 1
				){
					canMove = false
				}
			}
			if(bRCheck){
				if(level.worldArray[cellY + 1][cellX].type === 1
				|| level.worldArray[cellY][cellX + 1].type === 1
				|| level.worldArray[cellY + 1][cellX + 1].type === 1
				){
					canMove = false
				}			
			}
		}
		
		else{
			canMove = false
		}
		if(canMove === true){
			player.center.x += vx * speed
			player.center.y += vy * speed
		}
		break
	//right and D
	// case 39: 
	// case 68: 
	// 	cellY = Math.floor(corners.topRight.y/level.unitCell.y)
	// 	cellX = Math.floor((corners.topRight.x + speed)/level.unitCell.x)
	// 	cellY2 = Math.floor(corners.bottomRight.y/level.unitCell.y)
	// 	cellX2 = Math.floor((corners.bottomRight.x + speed)/level.unitCell.x)
	// 	cell = level.worldArray[cellY][cellX]
	// 	cell2 = level.worldArray[cellY2][cellX2]
	// 	if(!cell && !cell2) {
	// 		player.x += speed
	// 	}
	// 	else{
	// 		cell ? player.x = cell.topLeft.x - (player.w + 1) : player.x = cell2.topLeft.x - (player.w + 1)
	// 	}
	// 	break

	// //down and S
	// case 40: 
	// case 83: 
	// 	cellY = Math.floor((corners.bottomLeft.y + speed)/level.unitCell.y) 
	// 	cellX = Math.floor((corners.bottomLeft.x)/level.unitCell.x)
	// 	cellY2 = Math.floor((corners.bottomRight.y + speed)/level.unitCell.y)
	// 	cellX2 = Math.floor((corners.bottomRight.x)/level.unitCell.x)
	// 	cell = level.worldArray[cellY][cellX]
	// 	cell2 = level.worldArray[cellY2][cellX2]
	// 	if(!cell && !cell2) {
	// 		player.y += speed
	// 	}
	// 	else{
	// 		cell ? player.y = cell.topRight.y - (player.h + 1): player.y = cell2.topRight.y - (player.h + 1)
	// 	}
	// 	break

	}
	input.preventDefault()
	ctx.clearRect(-15, -15, canvas.width, canvas.height)
	castRays()
	// drawFirstPerson()
	drawTopDown()
}

function Ray(temp, slope) {
	let point = {x: temp.x + slope.run, y: temp.y + slope.rise}
	let cellY = Math.floor((point.y)/level.unitCell.y) 
	let cellX = Math.floor((point.x)/level.unitCell.x)	
	let cell = level.worldArray[cellY][cellX]
	if(cell.type === 0){
		return Ray(point, slope) 
	}
	else return point
}

function mod(n, m){
	return((n % m)+ m)% m
}