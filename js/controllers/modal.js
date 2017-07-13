class Modal {
  constructor(){
    this.attachListeners()
  }

  static render() {
    ModalView.renderTemplate()
  }

  static close(){
    console.log("hit")
    $(".modal-backdrop").remove()
    $(".modal-container").remove()
  }
}
