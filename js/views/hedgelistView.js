class HedgelistView {

  static updateModalTemplate(list){
    $("h3#title").html("Edit "+ list)
    $("#modal-close").attr( 'id' , 'hedgelist-modal-close' )
    $(".modal-body").empty()
  }

  static render(list){
    let template= `
    <div class="error"></div>
    <ul class="nav-bar">
      <li><a class="active" data-id="symbols" data-title="Symbols" href="#">Symbols</a></li>
      <li><a data-id="portfolios" data-title="Portfolio" href="#">Portfolios</a></li>
      <li><a data-id="user-lists" data-title="User List" href="#">User Lists</a></li>
      <li><a data-id="system-lists" data-title="System List" href="#">System Lists</a></li>
    </ul>
    <div class="nav-content-container">
      <form class="hedgelist-inputs">
      </form>
    </div>
    <hr>
    <div class="hedgelist-content-container">
      <div class="hedgelist-title" id="hedgelist-content-title">${list} Contents:
      </div>
      <select class="hedgelist-remove" multiple="multiple">
      </select>
      <button type="button" class="remove">Remove</button>
    </div>`
    this.updateModalTemplate(list)
    $(".modal-body").html(template)
  }

  static renderHedgelistRemoveOptions(hedgelist){
    let options = []
    Object.keys(hedgelist).forEach((key)=>{
      hedgelist[key].forEach((el, i)=>{
        options.push(`<option data-index="${i}" data-key="${key}" value=${el}>${el}</option>`)
      })
    })
    $(".hedgelist-remove").html(options)
  }

  static renderSymbols(){

  }

  //render other hedgelist selectors
  static renderSelectLists(selectorId, selectorTitle, hedgelist){
    let options = hedgelist.map((el)=>{
      return `<option value="${el}">${el}</option>`
    })

    let selector = `
      <label class="hedgelist-title" for="${selectorId}">Add ${selectorTitle}</label>
      <select name="${selectorId}" data-id="${selectorId}">
        ${options}
      </select>
      <input type="submit" class="add" value="+ Add">`

    $("form.hedgelist-inputs").empty()
    $("form.hedgelist-inputs").html(selector)
  }


}
