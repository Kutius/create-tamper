export const a = 2

function cb() {
  console.log('asd')
}

document.querySelector('button')?.addEventListener('click', cb)
