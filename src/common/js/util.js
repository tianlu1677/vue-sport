export function scrollOptions() {
  return {
    scrollOptions: {

      bounce: {
        top: false,
      },
      bounceTime: 500,
      refreshDelay: 5,
      // stopPropagation: true
    },
  }
}

export function formatNumber(value) {
  if (!value && value !== 0) return ''
  let newNumber = parseInt(value)
  if (newNumber < 999) {
    return newNumber
  } else {
    newNumber = parseFloat((newNumber / 1000)).toFixed(1)
    newNumber.replace('.0', '')
    return newNumber + 'K'
  }
}

Array.prototype.unique = function (key) {
  var arr = this;
  if (arr.length <= 0) {
    return []
  }
  var n = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (key === undefined) {
      if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
    } else {
      inner: {
        var has = false;
        for (var j = 0; j < n.length; j++) {
          if (arr[i][key] == n[j][key]) {
            has = true;
            break inner;
          }
        }
      }
      if (!has) {
        n.push(arr[i]);
      }
    }
  }
  return n;
}
