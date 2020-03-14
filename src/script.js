const {
	pToVal,
	setCssProperties,
	round,
	stayInRange,
	random,
} = require('./helpers')

import anime from 'animejs'

import easing from './easings'

const barTotal = first.children.length,
	valuesList = []

for (let i = 0; i < barTotal; i++) {
	valuesList.push(0)
}

setInterval(generateNextValue, 300)

let n = 0
function generateNextValue() {
	let noise = perlin.get(++n/ random(6, 7), 0)
	noise = stayInRange(noise, 0, 1, 'bounce')
	// noise = round(noise, -100)
	const easeOutSin = function (t) {
		return Math.sin(Math.PI / 2 * t);
	 }

	noise = easeOutSin(noise)

	valuesList.shift()
	valuesList.push(noise)

	let propertiesList = []

	for (let i = 0; i < barTotal; i++) {
		propertiesList.push([`--value${i}`, valuesList[i] + 'px'])
	}
	// setCssProperties(first, ...propertiesList)

	console.table(valuesList)

	anime({
		targets: first.children,
		translateY: (el, i) => - valuesList[i] * 90,
		// delay: (el, i) => 50 * (barTotal - i),
		duration: 3000,
		easing: 'easeOutElastic(1, .8)',
		// delay: () => random(0, 150)
	 });
}

// const perlinList = document.querySelectorAll('.box')

// // console.log(stayInRange(-0.5, 0, 2, 'loop'))

// // for (let i = 0; i <= elList.length - 1; i++) {
// // 	let n = stayInRange(i / 10, 0, 1, 'loop')
// // 	console.log(n)

// // 	setCssProperties(elList[i], ['left', n * 10 + 'px'])
// // }

// // console.log(randomize(0, 1, 1), randomize(0, 12, 1))

// for (let i = 0; i <= perlinList.length - 1; i++) {
// 	let noise = perlin.get(i / 4, 0),
// 		el = perlinList[i]

// 	noise = round(noise, -100)
// 	// console.log(noise)

// 	// console.log(stayInRange(-0.5, 0, 1, 'loop'))

// 	noise = stayInRange(noise, 0, 1, 'bounce')

// 	setCssProperties(el, ['width', noise * 300 + 'px'])
// }
