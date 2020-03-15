const { pToVal, setCssProps, round, stayInRange, random } = require('./helpers')

import anime from 'animejs'
import easing from './easing'
import Noise from '@trinkets/noise'
const getPerlin = Noise['@trinkets/noise'].perlin

const firstBars = document.querySelectorAll('#first .bar'),
	valuesList = []

for (let i = 0; i < firstBars.length; i++) valuesList.push(0)

setInterval(generateNextValue, 300)

let n = 0
function generateNextValue() {
	let noise = getPerlin(++n/3, 0)
	// noise+=.5
	noise = stayInRange(noise, 0, .5, 'bounce')
	noise*=2
	// noise = round(noise, -100)

	noise = easing.easeInOutSin(noise)

	valuesList.shift()
	valuesList.push(noise)

	let propertiesList = []

	for (let i = 0; i < firstBars.length; i++) {
		propertiesList.push([`--value${i}`, valuesList[i] + 'px'])
	}
	// setCssProps(first, ...propertiesList)

	anime({
		targets: firstBars,
		translateY: (el, i) => -valuesList[i] * (85 - 12),
		duration: 3000,
		easing: 'easeOutElastic(1, .8)',
	})	
}


// logging perlin noise
const perlinXes = document.querySelectorAll('.perlin p')
perlinXes.forEach((p, i) => {
	let noise = getPerlin(i/3, 0)
	// noise+=.5
	noise = stayInRange(noise, 0, 1, 'bounce')
	noise = easing.easeOutQuad(noise)

	p.style.marginLeft = noise * 200 + 'px'
})
