
$(()=>{
  $("#start-wizard").on('click', ()=>{
    new ModalController()
    //this would be some sort of ajax call or call of a client side portfolio bject already stored that can be accessed
    let portfolio = {value: 1000000}
    store.add("portfolioValue", portfolio["value"])
  })

})
