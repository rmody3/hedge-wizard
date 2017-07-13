class ModalView {
  constructor() {

  }

  static renderTemplate(){
    let template = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3>QuantDesk Hedge Wizard</h3>
          <button type="button" class="close">x</button>
        </div>
        <div class="modal-body">
          <div class="modal-content" id="page1">
            <p>Question 1 of 3</p>
            <form id="page1-form">
              <div class="input-container">
                <label for="hedge-goal">Hedge Goal:</label>
                <select name="hedge-goal">
                  <option value="Preserve Return">Preserve Return</option>
                  <option value="Blend">Blend</option>
                  <option value="Minimum Volatility">Minimum Volatility</option>
                </select>
              </div>
              <div class="input-container">
                <label for="hedge-type">Hedge Type:</label>
                <select name="hedge-type">
                  <option value="Long Only">Long Only</option>
                  <option value="Short Only">Short Only</option>
                  <option value="Long & Short">Long & </option>
                </select>
              </div>
              <input class="modal-button" type="submit" value="Begin">
            </form>
          </div>
        </div>
      </div>
      `
    $("body").append(template)
  }

  static renderPage1(){
    let page1 =
    $("modal-body").html(page1)

  }


}
