const title = document.createElement('h1')
title.innerText = 'RayCasting101'
document.body.appendChild(title)

const start = document.createElement('button')
start.innerText = 'Start!'
start.onclick = gamestart
document.body.appendChild(start)

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

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

	for(let i = 0; i < 10; i++){
		let row = []
		for (let j = 0; j < 20; j++) {
			if(i === 0 || i === 9){
				row.push(true)
			} else if(j === 0 || j === 19){
				row.push(true)
			}
			else{
				row.push(false)
			}
		}
		level.worldArray.push(row)
	}
	ctx.strokeStyle = 'cyan'
	ctx.fillStyle = 'red'
	// ctx.save()
	//draw
	level.worldArray.forEach((row, y) => {
		row.forEach((point, x) => {
			if (point) {
				if(y > 0 && y < 9 && (x === 0 || x === 19)){
					ctx.fillStyle = 'blue'
				}
				else	ctx.fillStyle = 'red'
				ctx.fillRect(x*level.cell.x, y*level.cell.y, level.cell.x, level.cell.y)
				ctx.strokeRect(x*level.cell.x, y*level.cell.y, level.cell.x, level.cell.y)
			}
			else{
				ctx.strokeRect(x*level.cell.x, y*level.cell.y, level.cell.x, level.cell.y)
			}
		})
	})
	// ctx.fillRect(31, 7, 82, 77)
	// ctx.strokeStyle = 'cyan'
	// ctx.save()
	// ctx.strokeRect(31, 7, 82, 77)
	// ctx.fillStyle = 'red'
	// ctx.translate(80, 7)
	// ctx.save()
	// ctx.fillRect(0, 0, 82, 77)
	// ctx.strokeStyle = 'green'
	// ctx.restore()
	// ctx.restore()
	// ctx.strokeRect(80, 7, 82, 77)

}

