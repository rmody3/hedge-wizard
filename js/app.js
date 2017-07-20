
$(()=>{
  $("#start-wizard").on('click', ()=>{
    //this would be some sort of ajax call or call of a client side portfolio bject already stored that can be accessed
    let portfolio = {value: 1000000}
    let availableLists = {
      "symbols": ["GLD","AAPL", "IBM", "MSFT", "XOM", "A", "BBB", "CCC", "DDD.XBX"],
      "portfolios": ["Sample Portfolio", "Test", "Hedge"],
      "user-lists": ["Test", "Sample", "Other User List"],
      "system-lists": ["Canadian ETFS", "NASDAQ", "S&P 500", "Mutual Funds", "Hong Kong Stock Exchange"]
    }
    store.add("wizardInputs","portfolioValue", portfolio["value"])
    Object.keys(availableLists).forEach((key)=>{
      store.add("availableLists",key, availableLists[key])
    })
    new ModalController()
  })
})
