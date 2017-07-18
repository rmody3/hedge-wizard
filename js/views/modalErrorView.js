class ModalErrorView {

  static renderErrors(errorElements){
    $(".error").empty()
    let allErrors = errorElements.map((i,el)=>{
      return ModalErrorView.eachErrorTemplate(el)
    }).join()
    $(".error").html(allErrors)
  }

  static eachErrorTemplate(el){
    if (el.value == "") {
      return (`<div class="error-message"><button type="button" class="close-error">x</button>Error: ${el.title} is a required field.</div>`)
    } else {
      return (`<div class="error-message"><button type="button" class="close-error">x</button>Error: ${el.title} ${el.validationMessage.replace("Value", '')}</div>`)
    }
  }

}
