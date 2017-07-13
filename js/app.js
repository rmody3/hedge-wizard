
$(()=>{
  $("#start-wizard").on('click', ()=>{
    Modal.render()
  })
  $("body").on('click', ".close", ()=>{
    Modal.close()
  })
})
