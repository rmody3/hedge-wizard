class Modal {
  constructor() {

  }

  static checkErrors(inputs){
    let errorElements = inputs.filter((i,el)=>{
      return !el.checkValidity()
    })
    return errorElements
  }

  static addInputsToStore(params){
    params.forEach((obj)=>{
      store.add(obj["name"], obj["value"])
    })
  }

}
