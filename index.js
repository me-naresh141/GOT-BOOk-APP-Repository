let ul = document.querySelector('ul')
let popUpul = document.querySelector('.popUp-ul')
let closeBtn = document.querySelector('.close-btn')
let chereterList = document.querySelector('.chereterList')
let bookUl = document.querySelector('.bookUl')
let loder = document.querySelector('.loder')


// url
let url = `https://www.anapioficeandfire.com/api/books`

// displatCharecter
function displatCharecter(charecterData) {
  Promise.all(
    charecterData.map((cherecter) =>
      fetch(cherecter).then((res) => res.json()),
    ),
  ).then((chData) => {
    chereterList.innerHTML = ''
    chData.forEach((elm) => {
      loder.classList.add('display-none')
      let li = document.createElement('li')
      li.innerText = elm.name + ` (${elm.aliases.join(' ')})`
      chereterList.append(li)
    })
  })
}

// displauUi
function displatUi(data) {
  data.forEach((obj, index) => {
    let li = document.createElement('li')
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    h2.innerText = data[index].name
    let p = document.createElement('p')
    p.innerText = data[index].authors
    let a = document.createElement('a')
    let btn = document.createElement('button')
    btn.innerText = `show charecter (${data[index].characters.length})`
    a.addEventListener('click', () => {
      popUpul.classList.toggle('display-none')
      bookUl.classList.add('display-none')
      displatCharecter(obj.characters)
    })
    a.append(btn)
    console.log(li)
    div.append(h2, p, a)

    li.append(div)
    ul.append(li)
  })
}

let allData = fetch(url).then((res) => {
  return res.json()
})

allData.then((res) => {
  displatUi(res)
})
// close-button
closeBtn.addEventListener('click', () => {
  popUpul.classList.toggle('display-none')
  bookUl.classList.remove('display-none')
})
