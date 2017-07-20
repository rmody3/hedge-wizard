class Store{
  constructor(){
    this.state = {}
  }

  add(resource, key, object){
    this.state[resource] = this.state[resource] || {}
    this.state[resource][key] = object
  }
  find(resource, key){
    this.state[resource] = this.state[resource] || {}
    return this.state[resource][key]
  }

  push(resource, key, object){
    this.state[resource] = this.state[resource] || {}
    this.state[resource][key] = this.state[resource][key] || []
    this.state[resource][key].push(object)
  }

  removeFromArray(resource, key, index){
    this.state[resource] = this.state[resource] || {}
    this.state[resource][key] = this.state[resource][key] || []
    debugger
    this.state[resource][key].splice(index,1)

  }

}

let store = new Store()
