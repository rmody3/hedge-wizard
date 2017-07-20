class HedgelistController {
  constructor(list) {
    this.list = list
    this.createTempStore()
    this.render()
    this.attachListeners()
  }

  render(){
    HedgelistView.render(this.list)
    let currHedgelist = this.tempStore.state["hedgelist"]
    if (currHedgelist){HedgelistView.renderHedgelistRemoveOptions(currHedgelist)}
  }

  createTempStore(){
    this.tempStore = new Store()
    let currHedgelist = store.state.wizardInputs[this.list.toLowerCase()]
    this.tempStore.state["hedgelist"] = currHedgelist
  }

  addCloseListener(){
    $("body").on('click', "#hedgelist-modal-close", ()=>{
      new ModalController()
      new ModalPageController(2)
    })
  }


  addNavBarListener(){
    $(".nav-bar a").on('click', ()=>{
      $(".nav-bar a.active").removeClass("active")
      $(event.currentTarget).addClass("active")
      let selectorId = $(event.currentTarget).data("id")
      let selectorTitle = $(event.currentTarget).data("title")
      let hedgelist = store.state.availableLists[selectorId]
      HedgelistView.renderSelectLists(selectorId, selectorTitle, hedgelist)
    })
  }

  addHedgelistAddListener(){
    $(".hedgelist-inputs").on('click','.add', (event)=>{
      event.preventDefault()
      let value = $(".hedgelist-inputs select").val()
      let selectorId = $(".hedgelist-inputs select").data("id")
      let errorMessage = this.checkErrors(selectorId,value)
      if (errorMessage){
        let errorElement= $(".hedgelist-inputs select")
        ModalErrorView.renderErrors(errorElement, ModalErrorView.ErrorWithCustomMessageTemplate(errorMessage))
      } else {
        this.tempStore.push("hedgelist", selectorId, value)
        HedgelistView.renderHedgelistRemoveOptions(this.tempStore.state["hedgelist"])
      }
    })
  }

  addHedgelistRemoveListener(){
    $(".hedgelist-content-container").on('click','.remove', (event)=>{
      event.preventDefault()
      let index = $(".hedgelist-remove option:selected").data("index")
      let key = $(".hedgelist-remove option:selected").data("key")
      if (key) {
        this.tempStore.removeFromArray("hedgelist", key, index)
        debugger
        HedgelistView.renderHedgelistRemoveOptions(this.tempStore.state["hedgelist"])
      }
    })
  }

  checkErrors(id,value){
    let tempHedgelist = this.tempStore.state["hedgelist"] || {}
    let blacklist = store.state.wizardInputs["blacklist"] || {}
    let whitelist = store.state.wizardInputs["whitelist"] || {}
    if (tempHedgelist[id] && tempHedgelist[id].includes(value)){
      return `already exists in the ${this.list.toLowerCase()} equities`
    } else if (blacklist[id] && blacklist[id].includes(value)){
      return `already exists in the blacklist equities`
    } else if (whitelist[id] && whitelist[id].includes(value)){
      return `already exists in the whitelist equities`
    } else {
      return false
    }
  }

  attachListeners(){
    this.addCloseListener()
    this.addNavBarListener()
    this.addHedgelistAddListener()
    this.addHedgelistRemoveListener()
  }

}
