class Modal {

  static checkErrors(inputs){
    let errorElements = inputs.filter((i,el)=>{
      return !el.checkValidity()
    })
    return errorElements
  }

  static addInputsToStore(params){
    params.forEach((obj)=>{
      store.add("wizardInputs",obj["name"], obj["value"])
    })
  }
}
