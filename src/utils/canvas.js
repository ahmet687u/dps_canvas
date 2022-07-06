export const circleCollision = (x1, y1, r1, x2, y2, r2) => {
  let distX = x1 - x2
  let distY = y1 - y2
  let totalRadius = r1 + r2

  if (totalRadius > Math.sqrt((distX * distX) + (distY * distY))) {
    return true;
  }
}

export const squareCollision = (cx, cy, target) => {
  if (
    cx + 0 >= target.x &&
    cx <= target.x + target.width &&
    cy + 0 >= target.y &&
    cy <= target.y + (target.height || target.width)
  ) {
    return true;
  } else {
    return false
  }
}

export const cornerViolationDetected = (item, boundaryX, boundaryY) => {
  if (
    item.x <= 0 ||
    item.x + item.width >= boundaryX ||
    item.y <= 0 ||
    item.y + item.width >= boundaryY
  ) {
    return true;
  }
}

export const equalization = (currentItem, items, width, height) => {
  return items.filter(item => item.uid !== currentItem.uid).map(item => {
    if (currentItem.y === item.y) {
      return {
        mt: { x: 0, y: currentItem.y },
        lt: { x: width, y: currentItem.y }
      }
    }

    else if (currentItem.x === item.x) {
      return {
        mt: { x: currentItem.x, y: 0 },
        lt: { x: currentItem.x, y: height }
      }
    }

    else if (item.y + item.width === currentItem.y) {
      return {
        mt: { x: 0, y: item.y + item.width },
        lt: { x: width, y: item.y + item.width }
      }
    }

    else if (item.x + item.width === currentItem.x) {
      return {
        mt: { x: currentItem.x, y: 0 },
        lt: { x: currentItem.x, y: height }
      }
    }

    else if (currentItem.x + currentItem.width === item.x) {
      return {
        mt: { x: currentItem.x + currentItem.width, y: 0 },
        lt: { x: currentItem.x + currentItem.width, y: height }
      }
    }

    else if (currentItem.y + currentItem.width === item.y) {
      return {
        mt: { x: 0, y: currentItem.y + currentItem.width },
        lt: { x: width, y: currentItem.y + currentItem.width }
      }
    }

    else if (currentItem.x + currentItem.width === item.x) {
      return {
        mt: { x: currentItem.x + currentItem.width, y: 0 },
        lt: { x: currentItem.x + currentItem.width, y: height }
      }
    }

  }).filter(c => c !== undefined)
}