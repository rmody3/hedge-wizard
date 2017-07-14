class Store{
  constructor(){
    this.state = {}
  }


  add(key, value){
    this.state[key] = value
  }

  find(key){
    return this.state[key]
  }

}

let store = new Store()
