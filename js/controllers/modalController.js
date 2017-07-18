class ModalController {
  constructor(){
    this.render()
    this.attachListeners()
  }

  render() {
    ModalView.renderTemplate()
    new ModalPageController(1)
  }

  close(){
    $(".modal-backdrop").remove()
    $(".modal-container").remove()
  }

  changePages(target){
    let direction = $(target).data("id")
    let currPage = $(target.form).data("id")
    if( direction == "next"){
      new ModalPageController(currPage+1)
    } else if (direction == "prev" && currPage > 1) {
      new ModalPageController(currPage-1)
    } else if (direction == "finish") {
      //ajax call to server to send parameters to run hedge
      store.state={}
      this.close()
    }
  }

  addChangePageListener(){
    $("body").on('click', ".modal-button", (event)=>{
      event.preventDefault()
      let inputs = $(".input-container input")
      let errorElements = Modal.checkErrors(inputs) //dont think these should be class methods
      if (errorElements.length> 0){
        ModalErrorView.renderErrors(errorElements)
      } else {
        let params = $(event.currentTarget.form).serializeArray()
        Modal.addInputsToStore(params) //dont think these should be class methods
        this.changePages(event.currentTarget)
      }
    })
  }

  addCloseListener(){
    $("body").on('click', ".close", ()=>{
      store.state={}
      this.close()
    })
  }

  attachListeners(){
    this.addChangePageListener()
    this.addCloseListener()
  }

}
