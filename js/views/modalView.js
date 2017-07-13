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
        </div>
      </div>
      `
    $("body").append(template)
  }


}
