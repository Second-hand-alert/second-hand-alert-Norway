const regex = /\d\d+/gmu;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('\\d\\d+', 'gmu')

const str = `BILLY Bokhylle, hvit, 40x28x202 cm - IKEA`;

// Reset `lastIndex` if this regex is defined globally
// regex.lastIndex = 0;

let measurement = []
let m;

while ((m = regex.exec(str)) !== null) {
  // This is necessary to avoid infinite loops with zero-width matches
  if (m.index === regex.lastIndex) {
      regex.lastIndex++;
  }
  
  // The result can be accessed through the `m`-variable.
  m.forEach((match) => {
      console.log('Found match: ' + match);
      measurement.push(match)
  })
}

console.log(measurement)
