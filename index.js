import readline from 'readline'
import { Parking } from './parking.js'
let parking = new Parking()

console.log('==========================================================')
console.log ( "\n\t\tParking Allocation System\n" )
console.log('==========================================================\n')


let prompt = 'What do you want?\n\n[ p : to PARK,\n  u : to UNPARK,\n  m : View MAP,\n  x : EXIT ]\n\nYour choice:';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt
})

rl.prompt()

rl.on('line', (line) => {
    switch (line.trim()) {
      case 'x':
        rl.close()
        break
      case 'p':

        rl.question('\nPlease choose the size of your vehicle\n [ 0-S, 1-M, 2-L ]\n: ', function ( v ) {
            let strEntrance = parking.ENTRANCE.map( (e) => e.name).join(',')
            rl.question(`\nChoose entry points [${strEntrance}]: `, function (entrance) {
                parking.park(v, entrance)
                console.log('\nVehicle park successfully!\n')
                rl.prompt()
            })

        })

        break

      case 'u':
        rl.question('Location of vehicle to unpark. Seperate by a space [row column]\n: ', function (loc) {
            let strLoc = loc.trim().split(' ')

            if ( strLoc.length >= 2 ) {
                let row = strLoc[0]
                let col = strLoc[1]
                parking.unpark(row, col)
                console.log('\nVehicle unparked Successfully!\n')
            }
        })
        break
      case 'm':
        parking.viewMap()
        break
      default:
        break;
    }
    rl.prompt();

  }).on('close', () => {

    console.log('\nHave a great day!👋\n');
    process.exit(0);

  });

rl.on("close", function () {
    console.log("\nThank you! We are pleased to serve you.👋\n")
    process.exit(0)
})