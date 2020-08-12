module.exports = function(app,fs,urlencodeParser,todoUrl){

    var readData = fs.readFileSync( todoUrl, "utf8" ); //{ "todo": ["...","..."]}
    var todoList = JSON.parse(readData); //{ todo: ["...","..."] }

    app.get("/", (req,res)=>{                     //when the user access to the page
        res.render("todo", {todoData: todoList.todo});
    })

    app.post("/", urlencodeParser,(req,res)=>{                          //if the user wants to create a new data
        todoList.todo.push(req.body.item);                              //push the new user's item into the todo's array
        fs.writeFile(todoUrl, JSON.stringify(todoList), function (err,data) {               //write the new json todo
            if (err) {
                return console.log(err);
            }
        });
        res.render("todo", {todoData:todoList.todo});                       //render to the page with the new json item
    })
    //
    //if the user wants to delete a data
    app.delete("/assets/todoList.json", (req,res)=>{
        console.log(req.body.data);
        res.end();
    })
};