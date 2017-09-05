var express = require('express');
var app = express();
var router = express.Router();
var mongojs =require('mongojs');
var db = mongojs('mongodb://talrose:vardia24@ds125914.mlab.com:25914/talrose01db', ['tasks']);

var cities = [
    {
        id: 0,
        name: 'Liverpool',
        country: 'England',
        population: '466,415',
        description: "Liverpool is a city in Merseyside, England. A borough from 1207 and a city from 1880, in 2014 the city council area had a population of 470,537 and the Liverpool/Birkenhead metropolitan area one of 2,241,000. Liverpool is in the south west of the historic county of Lancashire in North West England, on the eastern side of the Mersey Estuary. The town historically lay within the ancient Lancashire division of West Derby known as a hundred."
    },
    {
        id: 1,
        name: 'Paris',
        country: 'France',
        population: '2,240,621',
        description: 'Paris is the capital and most populous city of France. Situated on the Seine River, in the north of the country, it is in the centre of the Île-de-France region, also known as the région parisienne, Paris Region.',
    },
    {
        id: 2,
        name: 'Madrid',
        country: 'Spain',
        population: '3,141,992',
        description: 'Madrid , is a south-western European city, the capital of Spain, and the largest municipality of the Community of Madrid. The population of the city is almost 3.2 million with ametropolitan area population of around 6.5 million. It is the third-largest city in the European Union, after Londonand Berlin, and its metropolitan area is the third-largest in the European Union after London and Paris. The city spans a total of 604.3 km2 (233.3 sq mi).',
    }
];
router.get('/', function (req,res) {
console.log('/');
        res.json(cities);

});
router.get('/s', function (req,res) {
    console.log('/tasks');
    res.json(cities);

});

router.get('/tasks/:id',function(req,res,next){
    /*  res.send('tasks page');*/
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    })
});

router.put('/tasks/:id',function(req,res,next){
    /*  res.send('tasks page');*/
    var task=req.body;
    var updTask={};
    if(task.isDone){
        updTask.isDone=task.isDone;
    }
    if(task.tasks){
        updTask.tasks=task.tasks;
    }
    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else{
        db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updTask,{},function(err, tasks){
            if(err){
                res.send(err);
            }
            res.json(tasks);
        })
    }



});

router.delete('/tasks/:id',function(req,res,next){
    /*  res.send('tasks page');*/
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    })
});

router.post('/tasks',function(req,res,next){
var task= req.body;
if(!task.title||(task.isDone+'')){
    res.status(400);
    res.json({
       "error": "Bad Data"
    });
}else{
    db.tasks.save(task,function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    })
}
});
module.exports = router;