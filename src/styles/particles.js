const particlesConfig = {
  particles: {line_linked: {shadow: {enable: true, color: '#3CA9D1', blur: 5}}},
  number: {value: 200, density: {enable: true, value_area: 800}},
}

const particlesStyle = {
  position: 'absolute',
  zIndex: '-1'
}

export {
  particlesStyle, particlesConfig
}