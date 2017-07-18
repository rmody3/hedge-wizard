class ModalPage {

  static calculateAndFormatMpa(mpaPercent, portfolioValue){
    let mpaCalculated = portfolioValue * mpaPercent
    return "$" + mpaCalculated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }

}
