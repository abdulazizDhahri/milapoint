

 export function parsePoint(node) {
  const keyword = 'point:'

  return Array.from(node)
  .filter(e => e.innerText.toLowerCase().search(keyword) === -1? false: true)
  .map(e => {

    let index = e.innerText.indexOf(keyword)
    let sliced = e.innerText.slice(index + keyword.length)
    let reg = /\s/
    let point = sliced.split(reg).filter(e => e!=='')[0]
    
    return parseInt(point) || 0
  })
  .reduce((p,c)=> p+c,0)
}


export function addPointToList(node) {
  let allPoints = 0
  let lists = Array.from(node.querySelectorAll('.Column'))
  if(lists.length > 0) {
    lists.forEach(list => {
      // parse all points on list 
      let listPoints = parsePoint(list.querySelectorAll('.Caption span[data-text]'))
      allPoints+= listPoints
      let  listPointNode = list.querySelector('.milapoint-list-point')
      if(!listPoints && !listPointNode) {
        return
      }
      else if(!listPoints) {
        // remove the node when listPoints == null
        listPointNode.remove()
        return
      }
      else if (listPointNode &&listPointNode.innerText !== listPoints+'') {
        // update node text when value change
        listPointNode.innerText = listPoints
        return
      }
      else if(!listPointNode&& listPoints) {
        // create new node
        let titleNode = list.querySelector('.EditableTitle')
        let span = document.createElement('span')
        span.style = `position: absolute;
        right: 1px;
        font-size: 18px;
        top: 4px;
        color: #F2522B;`
        span.className = 'milapoint-list-point'
       
        span.innerText = listPoints
        titleNode.append(span)
      }
    })
  }
  return allPoints
}

export function addPointToBorad(node, points) {
  let bordTitile = node.querySelector('.BoardTitle .EditableTitle')

  if(bordTitile) {
    let pointNode = bordTitile.querySelector('.milapoint-all-points')
    if((!points && !pointNode)) {
      return
      }
    else if(points && pointNode) {
      
      pointNode.innerText = points
      return
    }
    else if(pointNode) {
      pointNode.remove()
      return
    }

    else if(points && !pointNode) {
      let span = document.createElement('span')
      span.innerText = points
      span.className = 'milapoint-all-points'
      span.style = `
      color: #F2522B;
      position: absolute;
      top:12px;
      right: 120px;
      `
      bordTitile.append(span)
    }  
  }
    
}
