
$(()=>{
  $("#start-wizard").on('click', ()=>{
    Modal.render()
  })
  $("body").on('click', ".modal-container", ()=>{
    Modal.close()
  })
})
