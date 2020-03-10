const { pToVal, setCssProperties, round, stayInRange } = require('./helpers')

const perlinList = document.querySelectorAll('.box')

// console.log(stayInRange(-0.5, 0, 2, 'loop'))

// for (let i = 0; i <= elList.length - 1; i++) {
// 	let n = stayInRange(i / 10, 0, 1, 'loop')
// 	console.log(n)

// 	setCssProperties(elList[i], ['left', n * 10 + 'px'])
// }

// console.log(randomize(0, 1, 1), randomize(0, 12, 1))

for (let i = 0; i <= perlinList.length - 1; i++) {
	let noise = perlin.get(i / 4, 0),
		el = perlinList[i]

	noise = round(noise, -100)
	// console.log(noise)

	// console.log(stayInRange(-0.5, 0, 1, 'loop'))

	noise = stayInRange(noise, 0, 1, 'bounce')

	setCssProperties(el, ['width', noise * 300 + 'px'])
}
