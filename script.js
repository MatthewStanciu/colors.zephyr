async function setUsers() {
  const users = await fetch('http://chronicles.zephyr/api/users').then(r => r.json())
  console.log('users', users)
  const dropdown = document.getElementById('users')

  let userDropdownList = ''
  users.map(user => {
    userDropdownList += '<option>' + user.name + '</option>'
  })
  dropdown.innerHTML += userDropdownList
}
setUsers()

// const data = [
//   "leo", "matthew", "leo", "leo", "matthew", "leo", { naem: "matthew", tiem: stamp }, "leo"
// ]

const canvas = document.getElementById('place')
const ctx = canvas.getContext('2d')
const xSize = 40;
let sqrSize = 500/xSize*2;

let data = []
for (let i = 0; i < xSize * xSize / 2; i++) {
  data.push('white')
}

console.log(data.join(","))

const schema = {
  leo: "#428715",
  matthew: "#ea6073",
  risha: "#65c3a2",
  kunal: "#7e202d",
  yoda: "#f6937d",
  rishi: "#5ca259",
  merlin04: "#507ffe",
  ani: "#43b712",
  kevin: "#9f8a54",
  ben: "#bc3f5a",
  gleich: "#f59f9b",
  arianna: "#3afe48",
  neel: "#1d8c5b",
  kognise: "#1dec53",
  will: "#34bd67",
  charelle: "#0830b6",
  jp: "#861fa6",
  zrl: "#db08d8",
  msw: "#19b0a1",
  zfogg: "#7e010f",
  woody: "#9bf08a",
  mojombo: "#3f064e",
  roshan: "#3c4805",
  byeongjun: "#bc8e73",
  sarthak: "#4938fb",
  ella: "#eadcc0",
  lux: "#8e2c79",
  claire: "#bb1b13",
  lorenzo: "#f82354",
  abby: "#bad910",
  swarnya: "#2cdbec",
  labdhi: "#51a0ef",
  linus: "#0a8fb5",
  pranav: "#829185",
  "professor-sucrose": "#df7614",
  belle: "#65dd8f",
  cole: "#293db3",
  hugo: "#f040ec",
  damicake: "#563204",
  aiden: "#592274",
  robert: "#e985e0",
  rebecca: "#214e23",
  ishan: "#962c74",
  arcade: "#c196eb",
  maya: "#98804a",
  cwelsh: "#5da72d",
  "benjamin-a": "#e6f2b8",
  lavi: "#c49aa9",
  sampoder: "#87044a",
  ams: "#d2c314",
  christina: "#deae12",
  dan: "#1b12c2",
  becca: "#dc95f5",
  white: "white"
}

function drawGrid(data) {
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 2

  data.forEach((person, i) => {
    const color = schema[person];
    const y = Math.floor(i/xSize);
    const x = i%xSize;
    // console.log(i, x, y)
    ctx.fillStyle = color;
    ctx.fillRect(x*sqrSize, y*sqrSize, sqrSize, sqrSize);
  })


  // for (let i = 1; i < xSize; i++) {
  //   const x = i*canvas.width/xSize;
  //   ctx.moveTo(x, 0)
  //   ctx.lineTo(x, canvas.height)
  //   ctx.stroke()
  // }

  // for (let i = 1; i < xSize/2; i++) {
  //   const y = i*canvas.height/(xSize/2);
  //   ctx.moveTo(0, y)
  //   ctx.lineTo(canvas.width, y)
  //   ctx.stroke()
  // }

}
drawGrid(data)

canvas.onmousedown = function(e) {
  const currentlySelectedName = document.getElementById('users').value
  if (!schema[currentlySelectedName]) return false

  const squareX = Math.floor(e.offsetX/sqrSize)
  const squareY = Math.floor(e.offsetY/sqrSize)
  console.log(e.offsetX, e.offsetY);
  console.log(squareX, squareY)
  // ctx.fillRect(squareX*sqrSize, squareY*sqrSize, sqrSize, sqrSize)
  // console.log(squareX, squareY, sqrSize)
  data[squareX+(squareY*xSize)] = currentlySelectedName
  fetch('http://kv.zephyr/colors', {
    method: 'PATCH',
    body: JSON.stringify({
      data: data.join(',')
    })
  })
  // mutated data
  // when mutated push to server
  drawGrid(data)
}

setInterval(async () => {

  await fetch('http://kv.zephyr/colors')
  .then(r => r.json())
  .then(updatedColorData => {
    data = updatedColorData.data.split(',')
    drawGrid(data)
  })
}, 2000)
