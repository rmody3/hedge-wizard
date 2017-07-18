class ModalPageView {

  static updateQuestionContainer(page){
    $("#page-number").html(page)
    $('.question-bar').css("background", "none")
    let i = 1
    while (i <= page){
      $('.question-bar[data-id=' + i + ']').css("background","white")
      i++
    }
  }

  static renderPage1(){
    let page1 = `
      <form data-id="1">
        <div class="input-container">
          <label for="hedge-goal">Hedge Goal:</label>
          <select name="hedge-goal" id="hedge-goal">
            <option value="Preserve Return">Preserve Return</option>
            <option value="Blend">Blend</option>
            <option value="Minimum Volatility">Minimum Volatility</option>
          </select>
        </div>
        <div class="input-container">
          <label for="hedge-type">Hedge Type:</label>
          <select name="hedge-type" id="hedge-type">
            <option value="Long Only">Long Only</option>
            <option value="Short Only">Short Only</option>
            <option value="Long & Short">Long & Short</option>
          </select>
        </div>
        <input class="modal-button next" type="submit" value="Begin" data-id="next">
      </form>
      <div class="modal-description">
        Please specify a goal for the hedge and the types of positions held.
      </div>
    `
    $(".modal-content").html(page1)
    if(store.state["hedge-goal"]){$("#hedge-goal ").val(store.state["hedge-goal"]).change()}
    if(store.state["hedge-type"]){$("#hedge-type ").val(store.state["hedge-type"]).change()}
  }

  static renderPage2(){
    let page2 = `
      <form data-id="2">
        <div class="input-container">
        </div>
        <div class="input-container">
        </div>
        <input class="modal-button prev" type="submit" value="Previous" data-id="prev">
        <input class="modal-button next" type="submit" value="Next" data-id="next">
      </form>
      <div class="modal-description">
        Please specify the equities the hedger may use to construct the hedger basket.
      </div>
    `
    $(".modal-content").html(page2)
  }

  static renderPage3(){
    let mpaPercent = store.state["max-position-allocation"] || 20.0
    let mpaCalculated = store.state.portfolioValue*mpaPercent*.01
    let mpaCalculatedDollarFormat = "$" + mpaCalculated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    let maxEquities = store.state["max-equities"] || 5
    let page3 = `
      <form data-id="3">
        <div class="input-container">
          <label for="max-position-allocation">Max Position Allocation:</label>
          <span id="mpa-calculated">${mpaCalculatedDollarFormat}</span>
          <span id="mpa-addon">%</span>
          <input id="mpa" type="number" min="1.0" max="100.0" name="max-position-allocation" title="Max Position Allocation" required="required" value="${mpaPercent}">

        </div>
        <div class="input-container">
          <label for="max-equities">Max Number of Equities in Hedge:</label>
          <input id="max-equities" type="number" min="1" name="max-equities" required="required" title="Max Number of Equities in Hedge" value="${maxEquities}">
        </div>
        <input class="modal-button prev" type="submit" value="Previous" data-id="prev">
        <input class="modal-button next" type="submit" value="Next" data-id="next">
      </form>
      <div class="modal-description">
        Please specify a maximum per-position allocation as a percentage of the total portfolio value. Minimum per-position allocation is 1%.
      </div>
    `
    $(".modal-content").html(page3)
  }

  static renderPage4(){
    let mpaCalculated = store.state.portfolioValue*store.state["max-position-allocation"]*.01
    let mpaCalculatedDollarFormat = "$" + mpaCalculated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    let page4 = `
      <div id="summary-title">Summary</div>
      <table class="summary">
        <tr>
          <td class="spec">Hedge Goal:</td>
          <td class="value">${store.state["hedge-goal"]}</td>
        </tr>
        <tr>
          <td class="spec">Hedge Type:</td>
          <td class="value">${store.state["hedge-type"]}</td>
        </tr>
        <tr>
          <td class="spec">Max Position Allocation:</td>
          <td class="value">${store.state["max-position-allocation"]}% or ${mpaCalculatedDollarFormat} </td>
        </tr>
        <tr>
          <td class="spec">Max # of Equities in Hedge:</td>
          <td class="value">${store.state["max-equities"]}</td>
        </tr>
      </table>
      <form data-id="4">
        <input class="modal-button prev" type="submit" value="Previous" data-id="prev">
        <input class="modal-button next" type="submit" value="Hedge" data-id="finish">
      </form>
      <div class="modal-description">
        The system will attempt to hedge your portfolio. Please review your specifications before finalizing.
      </div>
    `
    $(".modal-content").html(page4)
  }

}
