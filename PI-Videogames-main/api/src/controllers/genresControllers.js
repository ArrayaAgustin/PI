
const {default:axios}= require("axios");
const {Genre}=require("./../db")
const { API_KEY }=process.env

module.exports={
 async getGenres(req,res){
   try {
    let gen=await Genre.findAll({attributes:["name"]});

    if(!gen.length)
     {
        let url=`https://api.rawg.io/api/genres?key=${API_KEY}`;
        gen=await axios.get(url);
        gen=gen.data.results.map((g)=>(
            {name:g.name}
        ));

        await Genre.bulkcreate(genres)   
     }

     res.json(gen)
   } catch (err) {
    console.log(err)
   }
  }
}