class Modal {


  static render() {
    ModalView.renderTemplate()
    ModalView.renderPage1()
  }

  static close(){
    $(".modal-backdrop").remove()
    $(".modal-container").remove()
  }

  static goTo(page){
    switch (page) {
      case 1:
        ModalView.renderPage1()
        break;
      case 2:
        ModalView.renderPage2()
        break;
      case 3:
        ModalView.renderPage3()
        Modal.attachMpaListener()
        break;
      case 4:
        ModalView.renderPage4()
        break;
      default:
        ModalView.renderPage1()
    }
  }

  static attachMpaListener(){
    $("#mpa").on("change", ()=>{
      let mpaPercent = $("#mpa").val()*.01
      let mpaCalculated = store.state.portfolioValue * mpaPercent
      let mpaCalculatedDollarFormat = "$" + mpaCalculated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      $("#mpa-calculated").html(mpaCalculatedDollarFormat)
    })

  }
}
