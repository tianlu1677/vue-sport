export function scrollOptions() {
  return {
    scrollOptions: {

      bounce: {
        top: false
      },
      bounceTime: 500,
      refreshDelay: 5
      // stopPropagation: true
    },
  }
}

export function formatNumber(value) {
  if (!value) return ''
  let new_number = parseInt(value)
  if (new_number < 999) {
    return new_number
  } else {
    new_number = parseFloat((new_number / 1000)).toFixed(1)
    new_number.replace('.0', '')
    return new_number + 'k'
  }
}
