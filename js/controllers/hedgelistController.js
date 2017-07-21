class HedgelistController {
  constructor(list, modalPageController) {
    this.list = list
    this.modalPageController = modalPageController
  }

  render(){
    this.createTempStores()
    HedgelistView.updateHeader(this.list)
    HedgelistView.renderBody(this.list)

    //load sybmols since it is first page
    let symbolList = store.state.availableLists["symbols"]
    HedgelistView.renderSymbolBar(symbolList)

    HedgelistView.renderFooter()
    this.attachListeners()
    //load equites to the remove contents section
    let currHedgelist = this.tempEquitesStore.state["hedgelist"]
    if (currHedgelist){HedgelistView.renderHedgelistRemoveOptions(currHedgelist)}
  }

  createTempStores(){
    this.tempEquitesStore = new Store()
    this.tempSymbolsStore = new Store()
    //preload saved whitelist or blacklist equites to the temporary store
    this.tempEquitesStore.state["hedgelist"] = {}
    let currHedgelist = store.state.wizardInputs[this.list.toLowerCase()]
    if (currHedgelist){
      Object.keys(currHedgelist).forEach((key)=>{
        currHedgelist[key].forEach((value,i)=>{
          this.tempEquitesStore.state["hedgelist"][key] = this.tempEquitesStore.state["hedgelist"][key] || []
          this.tempEquitesStore.state["hedgelist"][key].push(value)
        })
      })
    }
  }

  attachListeners(){
    this.closeListener()
    this.saveListener()
    this.navBarListener()
    this.selectInputBarAddListener()
    this.hedgelistRemoveListener()
    this.addSymbolsListener()
    this.addAllSymbolsToHedgelistListener()
  }

  closeListener(){
    $("#hedgelist-modal-close, .cancel").on('click', ()=>{
      $(".modal-backdrop").remove()
      $(".modal-container").remove()
      ModalView.renderTemplate()
      this.modalPageController.renderPage(2)
    })
  }

  saveListener(){
    $(".save").on('click', ()=>{
      store.state.wizardInputs[this.list.toLowerCase()] = this.tempEquitesStore.state["hedgelist"]
      $(".modal-backdrop").remove()
      $(".modal-container").remove()
      ModalView.renderTemplate()
      this.modalPageController.renderPage(2)
    })
  }


  navBarListener(){
    $(".nav-bar a").on('click', ()=>{
      $(".nav-bar a.active").removeClass("active")
      $(event.currentTarget).addClass("active")

      let selectorId = $(event.currentTarget).data("id")
      let selectorTitle = $(event.currentTarget).data("title")
      let hedgelist = store.state.availableLists[selectorId]
      if (selectorId === "symbols") {
        HedgelistView.renderSymbolBar(hedgelist)
        if (this.tempSymbolsStore.state.hedgelist["symbols"]){this.renderTemporarySymbols()}
      }
      else {HedgelistView.renderSelectLists(selectorId, selectorTitle, hedgelist)}
    })
  }

  //for all nav bar tabs except Sybmol
  selectInputBarAddListener(){
    $(".hedgelist-inputs").on('click','.add', (event)=>{
      event.preventDefault()
      let value = $(".hedgelist-inputs select").val()
      let selectorId = $(".hedgelist-inputs select").data("id")

      let errorMessage = this.checkErrors(selectorId,value)
      if (errorMessage){
        let errorElement= $(".hedgelist-inputs select")
        ModalErrorView.renderErrors(errorElement, ModalErrorView.ErrorWithCustomMessageTemplate(errorMessage))
      } else {
        this.tempEquitesStore.push("hedgelist", selectorId, value)
        HedgelistView.renderHedgelistRemoveOptions(this.tempEquitesStore.state["hedgelist"])
      }
    })
  }

  addAllSymbolsToHedgelistListener(){
    $(".hedgelist-inputs").on("click",".add-symbols",()=>{
      let symbols = this.tempSymbolsStore.state["hedgelist"]["symbols"]
      let selectorId = "symbols"
      symbols.forEach((value)=>{
        let errorMessage = this.checkErrors(selectorId,value)
        if (errorMessage){
          let errorElement= $(".hedgelist-inputs select")
          ModalErrorView.renderErrorWithoutElement(value, errorMessage)
        } else {
          this.tempEquitesStore.push("hedgelist", selectorId, value)
          HedgelistView.renderHedgelistRemoveOptions(this.tempEquitesStore.state["hedgelist"])
        }
      })
      $(".symbol-list-element").remove()
      this.tempSymbolsStore.state.hedgelist = {}
    })
  }

  hedgelistRemoveListener(){
    $(".hedgelist-content-container").on('click','.remove', (event)=>{
      let value = $(".hedgelist-remove option:selected").val()
      let key = $(".hedgelist-remove option:selected").data("key")
      if (key) {
        this.tempEquitesStore.removeFromArray("hedgelist", key, value)
        HedgelistView.renderHedgelistRemoveOptions(this.tempEquitesStore.state["hedgelist"])
      }
    })
  }

  checkErrors(id,value){
    let tempHedgelist = this.tempEquitesStore.state["hedgelist"] || {}
    let whichHedgelist = this.list === "Blacklist" ? "whitelist" : "blacklist"
    let otherHedgelist = store.state.wizardInputs[whichHedgelist] || {}
    if (tempHedgelist[id] && tempHedgelist[id].includes(value)){
      return `already exists in the ${this.list.toLowerCase()} equities`
    } else if (otherHedgelist[id] && otherHedgelist[id].includes(value)){
      return `already exists in the ${whichHedgelist} equities`
    } else {
      return false
    }
  }

  addSymbolsListener(){
    $(".hedgelist-inputs").on("change keydown", "input.symbol", (event)=>{
      if(event.keyCode == 13 || event.type=="change") {
        event.preventDefault();
        let value = $(".hedgelist-inputs input.symbol").val()
        let selectorId = $(".hedgelist-inputs input.symbol").data("id")
        let tempSymbolslist = this.tempSymbolsStore.state["hedgelist"] || {}
        if (!(tempSymbolslist[selectorId] && tempSymbolslist[selectorId].includes(value)) && store.state.availableLists["symbols"].includes(value)){
          this.tempSymbolsStore.push("hedgelist", selectorId, value)
          HedgelistView.renderTempSymbol(value)
          this.removeSymbolsListener()
          $(".hedgelist-inputs input.symbol").val('')
        } else {
          $(".hedgelist-inputs input.symbol").val('')
        }
        return false;
      }
    })
  }

  renderTemporarySymbols(){
    this.tempSymbolsStore.state.hedgelist["symbols"].forEach((value)=>{
      HedgelistView.renderTempSymbol(value)
    })
    this.removeSymbolsListener()
  }

  removeSymbolsListener(){
    $(".remove-symbol").on("click",(event)=>{
      let value = $(event.currentTarget).parent().data("value")
      this.tempSymbolsStore.removeFromArray("hedgelist", "symbols", value)
      $(event.currentTarget).parent().remove()
    })
  }
}
