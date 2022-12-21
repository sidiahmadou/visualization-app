//script used to generate random data for each share class

const classes = ["Common","Series A Preferred","Series A1 Preferred"]
let shares = {}

for (let e in classes){
  let com = []
  let p = 1
  let ev = 1
  for (let i =0; i<10;i++){
    ev = ev + Math.floor((Math.random()+1)*5)
    p = p + Math.round(Math.random()+1)*2
    com.push({"valuation":ev,"price":p})
  }
  shares[classes[e]] = com
}

console.log(JSON.stringify(shares))