class ModalView {
  constructor() {

  }

  static renderTemplate(){
    let template = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3 id="title">QuantDesk Hedge Wizard</h3>
          <button type="button" id="modal-close" class="close">x</button>
        </div>
        <div class="modal-body">
          <div class="error"></div>
          <div class="question-container">
            <p id="question-page">Question <span id="page-number">1</span> of 4</p>
            <div data-id="1" class="question-bar"></div>
            <div data-id="2" class="question-bar"></div>
            <div data-id="3" class="question-bar"></div>
            <div data-id="4" class="question-bar"></div>
          </div>
          <div class=modal-content></div>
        </div>
        <div class="modal-footer"></div>
      </div>`
    $(".main").append(template)
  }
}
