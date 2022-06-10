const {default:axios}= require("axios");
const {Videogame,Genre}=require("./../db")
const { API_KEY }=process.env

function uuidValidation (id)
{
  let regexUuid = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
  return id.match(regexUuid)?true:false
}

module.exports={
    async getVideogame(req,res){
        try {
              const{id}=req.params
        if(!id){
            res.status(400).json({error:"I did not enter an id"})
        }
              if(uuidValidation(id)){
              let videogameDb=await Videogame.findByPk(id,{
                include:{
                    model:Genre,
                    attributes:["name"]
                }
              });
              videogameDb={...videogameDb.dataValues,
               genres:videogameDb.dataValues.genres.map((g)=>{
                return g.dataValues.name
               })}
               
              if(videogameDb){
                res.status(200).json(videogameDb)
              } 

        }

        else{
            let url=`https://api.rawg.io/api/games/${id}?key=${API_KEY}`
            let videogameApi=await axios.get(url);
            videogameApi=videogameApi.data;
            
            if(videogameApi.detail!=='Not found.'){

            }
        }
        } catch (err) {
            console.log(err)
        }
      

    }
}