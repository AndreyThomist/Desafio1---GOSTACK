const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');
const app = express();
app.use(express.json());
app.use(cors());

const repositories = [
    
];
app.use('/repositories/:id',(request,response,next) => {
   const {id} = request.params;
   if(!isUuid(id)){
      return response.status(400).json({
      message:'id not valid'
    })
   }
   return next();
   
})
app.get("/repositories", (request, response) => {
    return response.json(repositories);
});
app.post("/repositories", (request, response) => {
    const {title,url,techs} = request.body;
    const newRepository = {
      id:uuid(),
      title,
      url,
      techs,
      likes:0
    }
    repositories.push(newRepository)
    return response.json(newRepository);
});
app.put("/repositories/:id", (request, response) => {
    const {id} = request.params;
    const {title,url,techs} = request.body;
    const findIndex = repositories.findIndex(repository => repository.id === id);
    repositories[findIndex].title = title;
    repositories[findIndex].url = url;
    repositories[findIndex].techs = techs;
    return response.json(repositories[findIndex]);
});
app.delete("/repositories/:id", (request, response) => {
    const {id} = request.params;
    const findIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(findIndex,1);
    return response.json({
    message:"deleted with success"
    })
});
app.post("/repositories/:id/like", (request, response) => {
    const {id} = request.params;
    const findIndex = repositories.findIndex(repository => repository.id === id);
    repositories[findIndex].likes = repositories[findIndex].likes + 1;
    return response.json(repositories[findIndex])
});
module.exports = app;
