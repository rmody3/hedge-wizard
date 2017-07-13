class Modal {


  static render() {
    ModalView.renderTemplate()
    renderPage1()
  }

  static close(){
    $(".modal-backdrop").remove()
    $(".modal-container").remove()
  }

  static goToPage1(){
    ModalView.renderPage1()
  }
}
