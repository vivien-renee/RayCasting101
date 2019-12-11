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
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = rec.color
	ctx.fillRect  (rec.x, rec.y, rec. w, rec.h)

}

function gamestart() {
	title.remove()
	start.remove()
	document.body.appendChild(canvas)

	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	drawShape()
	
	
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
	console.log(input)
	
	
	switch(input.keyCode){
	//left and A
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
		break

	}
	input.preventDefault()
	drawShape()
}




