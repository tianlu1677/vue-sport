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
