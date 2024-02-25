function removeAdd() {
  // let's first get all the elements on the page
  let spans = document.getElementsByTagName('span');

  for (let i = 0; i < spans.length; i++) {
    // let's check if theyccontain the text 'Promoted'
    if (spans[i].innerHTML === 'Promoted') {
      // get the div  that wraps around the entire ad
      let card = spans[i].closest('.feed-shared-update-v2');

      // if the class  changed an we cannot find it with the closest(), get the 6 th parent
      if (card == null) {
        // could be also card.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode

        // but let's go with the easier way
        let j = 0;
        card = spans[i];
        while (j < 6) {
          card = card.parentNode;
          ++j;
        }
      }

      // let;s make the addd disappear there
      console.log('it is being executed');
      card.setAttribute('style', 'display:none !important;');
    }
  }
}

removeAdd();

setInterval(function () {
  removeAdd();
}, 100);
