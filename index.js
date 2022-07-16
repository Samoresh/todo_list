const express= require('express');
const path= require('path');
const app= express();
const port= 8000;
const bodyParser= require('body-parser');
const db= require('./config/mongoose');
const Task= require('./models/task');


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));


app.get('/',function(req,res){
    Task.find({},function(err,tasks){
     if(err){
         console.log('Error in fetching tasks from db');
         return;
     }
     return res.render('home',{
         title: "ToDo-List",
         task_list: tasks
     });
    });
 });

app.post('/create-task',function(req,res){
    Task.create({
        description: req.body.description,
        category: req.body.category,
        duedate: req.body.duedate
    },function(err,newTask){
        if(err){
            console.log('error in adding a task!');
            return;
        }
        console.log('******',newTask);
        res.redirect('back');
    });
});



// app.post('/delete-task', async function(req,res){
//    console.log(req.body);
//    let tasks= Object.keys(req.body);
//     for(task_id of tasks){
//         Task.deleteOne({_id:task_id}, function(err){
//             if(err){
//                 console.log('Error in deleting an object from database:',err);
//                 return;
//             }
//         });
//    }
//    return res.redirect('back');
// });
// utility function to delete a single task
function deleteOne(task) {
    Task.findByIdAndDelete(task, function(err) {
        if(err) {
            console.log(`Error in deleting an object from db: ${err}`);
            return;
        }
    });
}

// function to delete the tasks from the database
function deleteTasks(tasks) {
    if(typeof tasks == 'string') {
        deleteOne(tasks);
    }
    else {
        for(let task of tasks) {
            deleteOne(task);
        }
    }
}
app.post('/delete-task', async function(req,res){
    var obj= req.body;
    console.log(req.body);

    if(obj && Object.keys(obj).length == 0
        && Object.getPrototypeOf(obj) === Object.prototype)
        return res.redirect('back');
    

    const result = await deleteTasks(req.body.tasks);
    return res.redirect('back');
});

app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});