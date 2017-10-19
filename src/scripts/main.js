
import * as Milapoint from './index'

function main() {

  let allListsPoints = Milapoint.addPointToList(document)
  // for cards are not on any list
  let cardsPoints= Milapoint.parsePoint(document.querySelectorAll('.scrollable-container >* > .Element > div > .Card .Caption [data-text]'))
  let allPoints = cardsPoints + allListsPoints
  Milapoint.addPointToBorad(document,allPoints)

  
  
}


setInterval(main,1000,5000)