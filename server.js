let express = require('express');
let count = 0
let a = false
express()
  .use(express.static(process.cwd() + '/public'))
  .get('/log', (req,res) => {
    if(req.query.a){
      a = true
    }
      if (a){
          res.send({error: false})
      }else{
          res.send({error: true})
      }
  })
  .get('*', (req, res) => {
    console.log(++count)
    res.sendFile(process.cwd() + '/public/index.html')
})
  .listen(8080, ()=>console.log(8080));