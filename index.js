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
}