class ModalPageController {
  constructor(page) {
    this.page = page
    this.render()

  }

  render(){
    ModalPageView.updateQuestionContainer(this.page)
    switch (this.page) {
      case 1:
        ModalPageView.renderPage1()
        break;
      case 2:
        ModalPageView.renderPage2()
        this.attachEditHedgelistListener()
        break;
      case 3:
        ModalPageView.renderPage3()
        this.attachMpaListener()
        break;
      case 4:
        ModalPageView.renderPage4()
        break;
      default:
        ModalPageView.renderPage1()
    }
  }

  attachMpaListener(){
    $("#mpa").on("change", ()=>{
      let mpaPercent = $("#mpa").val()*.01
      let mpaCalculatedDollarFormat = ModalPage.calculateAndFormatMpa(mpaPercent, store.find("wizardInputs","portfolioValue"))
      $("#mpa-calculated").html(mpaCalculatedDollarFormat)
    })
  }

  attachEditHedgelistListener(){
    $(".edit-hedgelist").on("click", ()=>{
      let list = $(event.currentTarget).data("id")
      new HedgelistController(list)
    })
  }

}
