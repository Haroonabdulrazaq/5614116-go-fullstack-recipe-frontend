const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const Recipe = require('./models/recipe');


mongoose.connect('mongodb+srv://Haroonabdulrazaq:cjw!RUeMC@haroon-z8jk3.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to Mongodb Atlas Successfully')
}).catch((error)=>{
    console.log('unable to connect to mongodb Atlas ');
    console.log(error);
});
//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //Making Use of Body Parser for the Post Method
app.use(bodyParser.json());

  //implementing Post method
app.post('/api/recipes/',(req,res,next)=>{
    const recipe = new Recipe({
        title:req.body.title,
        ingredients:req.body.ingredients,
        instructions:req.body.instructions,
        time:req.body.time,
        difficulty:req.body.difficulty
    });
    recipe.save().then(()=>{
        res.status(201).json({Message:"Succesfully Created"});
    }).catch((error)=>{
        res.status(400).json({error:error});
    });
});
//Implementing Get Method for 1(One) item
app.get('/api/recipes/:id',(req,res,next)=>{
Recipe.findOne({
    _id:req.params.id}).then((recipe)=>{
        res.status(200).json(recipe);
    }).catch((error)=>{
        res.status(400).json({error:error});
    });
});

//Implementing Put Method or Update Method
app.put('/api/recipes/:id',(req,res,next)=>{
    const recipe = new Recipe({
        _id:req.params.id,
        title:req.body.title,
        ingredients:req.body.ingredients,
        instructions:req.body.instructions,
        time:req.body.time,
        difficulty:req.body.difficulty      
    })
Recipe.updateOne({_id:req.params.id},recipe).then(()=>{
    res.status(201).json({message: 'Recipe updated successfully!'});
}).catch((error)=>{
    res.status(400).json({error:error});
});
});

//Implementing Delete method
app.delete('/api/recipes/:id',(req,res,next)=>{
    Recipe.deleteOne({_id: req.params.id}).then(()=>{
        res.status(200).json({message:'Recipe Deleted Successfully'});
    }).catch((error)=>{
        res.status(400).json({error:error});
    })
});

//Implementing Get Method
app.use('/api/recipes/',(req,res,next)=>{
    Recipe.find().then((recipes)=>{
        res.status(200).json(recipes);
    }).catch((error)=>{
        res.status(400).json({error:error});
    });
});


module.exports = app ;