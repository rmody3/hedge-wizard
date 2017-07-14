
$(()=>{
  $("#start-wizard").on('click', ()=>{
    Modal.render()
    //this would be some sort of ajax call or call of a client side portfolio bject already stored that can be accessed
    let portfolio = {value: 1000000}
    store.add("portfolioValue", portfolio["value"])
  })
  $("body").on('click', ".close", ()=>{
    store.state={}
    Modal.close()
  })

  $("body").on('click', ".modal-button", (event)=>{
    debugger
    event.preventDefault()
    params = $(event.currentTarget.form).serializeArray()
    params.forEach((obj)=>{
      store.add(obj["name"], obj["value"])
    })
    let direction = $(event.currentTarget).data("id")
    let currPage = $(event.currentTarget.form).data("id")
    if( direction == "next"){
      Modal.goTo(currPage+1)
    }
    else if (direction == "prev" && currPage > 1) {
      Modal.goTo(currPage-1)
    }
  })
})
