class ModalErrorView {

  static renderErrors(errorElements, errorTemplate){
    $(".error").empty()
    let allErrors = errorElements.map((i,el)=>{
      return errorTemplate(el)
    }).get()
    $(".error").html(allErrors)
  }

  static ErrorWithValidationTemplate(el){
    if (el.value == "") {
      return (`<div class="error-message"><button type="button" id="error-close" class="close">x</button><strong>Error:</strong> ${el.title} is a required field.</div>`)
    } else {
      return (`<div class="error-message"><button type="button" id="error-close" class="close">x</button><strong>Error:</strong> ${el.title} ${el.validationMessage.replace("Value", '')}</div>`)
    }
  }

  static ErrorWithCustomMessageTemplate(errorMessage){
    return (el)=>{ return (`<div class="error-message"><button type="button" id="error-close" class="close">x</button><strong>Error:</strong> ${el.value} ${errorMessage}.</div>`)}
  }

  //error message used fr symbols
  static renderErrorWithoutElement(value,errorMessage){
    let error =  `<div class="error-message"><button type="button" id="error-close" class="close">x</button><strong>Error:</strong> ${value} ${errorMessage}.</div>`
    $(".error").empty()
    $(".error").html(error)
  }
}
