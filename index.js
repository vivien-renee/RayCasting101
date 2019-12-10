const title = document.createElement('h1')
title.innerText = 'RayCasting101'
document.body.appendChild(title)

const start = document.createElement('button')
start.innerText = 'Start!'
start.onclick = gamestart
document.body.appendChild(start)

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

function gamestart() {
	title.remove()
	start.remove()
	document.body.appendChild(canvas)

	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	ctx.fillRect(31, 7, 82, 77)
	ctx.strokeStyle = 'cyan'
	ctx.save()
	ctx.strokeRect(31, 7, 82, 77)
	ctx.fillStyle = 'red'
	ctx.translate(80, 7)
	ctx.save()
	ctx.fillRect(0, 0, 82, 77)
	ctx.strokeStyle = 'green'
	ctx.restore()
	ctx.restore()
	ctx.strokeRect(80, 7, 82, 77)

}

