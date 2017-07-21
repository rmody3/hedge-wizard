class ModalController {
  constructor(modalPageController){
    this.modalPageController = modalPageController
    this.render()
    this.attachListeners()
  }

  render() {
    ModalView.renderTemplate()
    //starts with page 1
    this.modalPageController.renderPage(1)
  }

  close(){
    $(".modal-backdrop").remove()
    $(".modal-container").remove()
  }

  changePages(target){
    let direction = $(target).data("id")
    let currPage = $(target.form).data("id")
    if( direction == "next"){
      this.modalPageController.renderPage(currPage+1)
    } else if (direction == "prev" && currPage > 1) {
      this.modalPageController.renderPage(currPage-1)
    } else if (direction == "finish") {
      //ajax call to server to send parameters to run hedge
      console.log(store.state.wizardInputs)
      store.state={}
      this.close()
    }
  }

  attachListeners(){
    this.addChangePageListener()
    this.addCloseListener()
    this.addErrorCloseListener()
  }

  addChangePageListener(){
    $("body").off('click').on('click', ".modal-button", (event)=>{
      event.preventDefault()
      let inputs = $(".input-container input")
      let errorElements = Modal.checkErrors(inputs)
      if (errorElements.length> 0){
        ModalErrorView.renderErrors(errorElements, ModalErrorView.ErrorWithValidationTemplate)
      } else {
        $(".error").empty()
        let params = $(event.currentTarget.form).serializeArray()
        Modal.addInputsToStore(params)
        this.changePages(event.currentTarget)
      }
    })
  }

  addCloseListener(){
    $("body").on('click', "#modal-close", ()=>{
      store.state={}
      this.close()
    })
  }

  addErrorCloseListener(){
    $("body").on('click', "#error-close", (event)=>{
      $(event.currentTarget.parentElement).remove()
    })
  }
}
