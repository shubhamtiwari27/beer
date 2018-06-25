let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let cors = require('cors');
let d = new Date;
app.use(bodyparser.json());
let auth = 0;
//var dateObj=date();
//let mongoStoreSchema={
//  userId:"",
//dateTime:"",
//beerName:"",
//activity:""
//}
//connecting to mysql database
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'brtadmin',
    password: 'dbadmin',
    database: 'beer',
    multipleStatement: true
});
connection.connect();
//connecting to mongodb database

/*MongoClient.connect('mongodb://localhost:27017/beeractivity',function(err,db){
    if(err) throw err;
    else{
        console.log("connected");
        //console.log(db);
        var collection = db.collection('shubh');
        collection.insertOne({userid: mongoStoreSchema.userId ,datetime:"mongoStoreSchema.dateTime",item:"result.name1",action:"mongoStoreSchema.activity"},function(err,r){
            if(err){
                throw err;
            } else {
                console.log(r);
                db.close();
            }
        })
        

    }
});*/


app.use(cors());

console.log("it is ruuning");
//if(auth==1)
//{

//get all beers
app.get('/beer', (req, res) => {
    var logvalue = req.headers['log'];
    console.log(req.headers);
    connection.query('select * from beer.usertab where userid = ? ', [logvalue], function (error, results) {
        if (error) throw error;
        else {
            if (results.length > 0) {
                if (results[0].userid == logvalue) { //res.send(mongoStoreSchema);
                    let mongoStoreSchema = {
                        userId: "",
                        dateTime: "",
                        beerName: "",
                        activity: ""
                    }
                    mongoStoreSchema.userId = results[0].userid;
                    mongoStoreSchema.dateTime = d;

                    mongoStoreSchema.activity = "read all";

                    let sqlstm = 'select * from beer.beertab';
                    connection.query(sqlstm, function (error, result) {
                        if (error) throw error;
                        else {

                            mongoStoreSchema.beerName = result[0].name1;;

                            MongoClient.connect('mongodb://localhost:27017/beeractivity', function (err, db) {
                                if (err) throw err;
                                else {
                                    console.log("connected");
                                    //console.log(db);
                                    var collection = db.collection('shubh');
                                    collection.insertOne({ userid: mongoStoreSchema.userId, datetime: mongoStoreSchema.dateTime, item: mongoStoreSchema.beerName, action: mongoStoreSchema.activity }, function (err, r) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            console.log(r);
                                            db.close();
                                        }
                                    })


                                }
                            });


                            console.log('The solution is: ', result);
                            res.send(result);
                        }
                    });
                }
            }

            else {
                res.send("user not valid");
            }
        }
    });
});

//get a beer
app.get('/beer/:id', (req, res) => {
    var logvalue = req.headers['log'];
    console.log(req.headers);
    connection.query('select * from beer.usertab where userid = ? ', [logvalue], function (error, results) {
        if (error) throw error;
        else if (results.length == 0) {
            res.send("user not valid");
        }
        else {
            if (results.length >= 0) {
                if (results[0].userid == logvalue) {
                    let mongoStoreSchema = {
                        userId: "",
                        dateTime: "",
                        beerName: "",
                        activity: ""
                    }
                    mongoStoreSchema.userId = results[0].userid;
                    mongoStoreSchema.dateTime = d;

                    mongoStoreSchema.activity = "read single";

                    // let sqlstm='select * from beer.beertab';
                    connection.query('select * from beer.beertab where beerid = ? ', [req.params.id], function (error, result) {
                        if (error) throw error;
                        else {
                            mongoStoreSchema.beerName = result[0].name1;;

                            MongoClient.connect('mongodb://localhost:27017/beeractivity', function (err, db) {
                                if (err) throw err;
                                else {
                                    console.log("connected");
                                    //console.log(db);
                                    var collection = db.collection('shubh');
                                    collection.insertOne({ userid: mongoStoreSchema.userId, datetime: mongoStoreSchema.dateTime, item: mongoStoreSchema.beerName, action: mongoStoreSchema.activity }, function (err, r) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            console.log(r);
                                            db.close();
                                        }
                                    })


                                }
                            });
                            console.log('The solution is: ', result);
                            res.send(result);
                        }
                    });
                }

            }


        }
    });

});


//delete a beer

app.delete('/beer/:id', (req, res) => {
    var logvalue = req.headers['log'];
    console.log(req.headers);
    connection.query('select * from beer.usertab where userid = ? ', [logvalue], function (error, results) {
        if (error) throw error;
        else if (results.length == 0) {
            res.send("user not defined")
        }
        else {
            if (results.length >= 1) {
                if (results[0].userid == logvalue) {
                    let mongoStoreSchema = {
                        userId: "",
                        dateTime: "",
                        beerName: "",
                        activity: ""
                    }
                    mongoStoreSchema.userId = results[0].userid;
                    mongoStoreSchema.dateTime = d;

                    mongoStoreSchema.activity = "delete";



                    connection.query('delete from beer.beertab where beerid = ? ', [req.params.id], function (error, result) {
                        if (error) throw error;
                        else {
                            //console.log('The solution is: ', results);
                            //mongoStoreSchema.beerName = result[0].name1;;

                            MongoClient.connect('mongodb://localhost:27017/beeractivity', function (err, db) {
                                if (err) throw err;
                                else {
                                    console.log("connected");
                                    //console.log(db);
                                    var collection = db.collection('shubh');
                                    collection.insertOne({ userid: mongoStoreSchema.userId, datetime: mongoStoreSchema.dateTime, item: mongoStoreSchema.beerName, action: mongoStoreSchema.activity }, function (err, r) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            console.log(r);
                                            db.close();
                                        }
                                    })


                                }
                            });
                            res.send('deleted successfully');
                        }
                    });
                }
            }

        }
    });

});

//insert a beer

app.post('/beer', (req, res) => {
    console.log(req.body);
    var logvalue = req.headers['log'];
    let b = req.body;
    console.log("request body");
    console.log(b);
    connection.query('select * from beer.usertab where userid = ? ', [logvalue], function (error, results) {
        if (error) {
            res.send(error);
        }
        else if (results.length == 0) {
            res.send("user not valid");
        }
        else {
            if (results.length >= 1) {
                if (results[0].userid == logvalue) {
                    let mongoStoreSchema = {
                        userId: "",
                        dateTime: "",
                        beerName: "",
                        activity: ""
                    }
                    mongoStoreSchema.userId = results[0].userid;
                    mongoStoreSchema.dateTime = d;

                    mongoStoreSchema.activity = "insert";

                    
                    console.log("req body");
                    console.log(b);
                    // let sql="INSERT INTO beer.beertab (beerid,name,cost,quantity) VALUES ?" 
                    let val = {
                        beerid: b.beerid,
                        name1: b.name1,
                        cost: b.cost,
                        quantity: b.quantity
                    };
                    connection.query('INSERT INTO beer.beertab SET ?', val, function (error, result) {
                        if (error) {
                            throw error;
                        } else {
                            connection.query('select * from beer.beertab where beerid= ? ', [b.beerid], function (error, resulta) {
                                if (error) {
                                    throw error
                                }else {
                                    mongoStoreSchema.beerName = resulta[0].name1;;
                                    MongoClient.connect('mongodb://localhost:27017/beeractivity', function (err, db) {
                                        if (err) {
                                            res.send(err);
                                        }
                                        else {
                                            console.log("connected");
                                            //console.log(db);
                                            var collection = db.collection('shubh');
                                            collection.insertOne({ userid: mongoStoreSchema.userId, datetime: mongoStoreSchema.dateTime, item: mongoStoreSchema.beerName, action: mongoStoreSchema.activity }, function (err, r) {
                                                if (err) {
                                                    throw err;
                                                } else {
                                                    console.log(r.result);
                                                    db.close();
                                                    //console.log('The solution is: ', results);
                                                    res.send(resulta);
                                                }
                                            });
                                        }
                                    });
                                }


                            });
                        }
                    });
                }
            }

        }
    });
});

//update a beer

app.put('/beer', (req, res) => {
    var logvalue = req.headers['log'];
    console.log(req.headers);

    connection.query('select * from beer.usertab where userid = ? ', [logvalue], function (error, results) {
        if (error) throw error;
        else if(results.length==0){
            res.send("user not valid");
        }
        else {
            if (results.length >= 1) {
                if(results[0].userid == logvalue)
                {
                let mongoStoreSchema = {
                    userId: "",
                    dateTime: "",
                    beerName: "",
                    activity: ""
                }
                mongoStoreSchema.userId = results[0].userid;
                mongoStoreSchema.dateTime = d;

                mongoStoreSchema.activity = "update";
                let b = req.body;
                let str = "succesfully update";
                let sqlstmt = 'update beer.beertab set ? where beerid= ?';
                let val = {
                 name1: b.name1,
                  cost: b.cost,
                 quantity: b.quantity
                     };
                    connection.query(sqlstmt, [val, b.beerid], function (error, result) {
                     if (error) throw error;
                     else {

                        MongoClient.connect('mongodb://localhost:27017/beeractivity', function (err, db) {
                            if (err) throw err;
                            else {
                                console.log("connected");
                                //console.log(db);
                                var collection = db.collection('shubh');
                                collection.insertOne({ userid: mongoStoreSchema.userId, datetime: mongoStoreSchema.dateTime, item: mongoStoreSchema.beerName, action: mongoStoreSchema.activity }, function (err, r) {
                                    if (err) {
                                        throw err;
                                    } else {
                                        console.log(r);
                                        db.close();
                                    }
                                })


                            }
                        });
                                console.log('The solution is: ', result);
                               //res.send(str);
                               res.send(result);
                            }
                             });
               // res.send(results);
            
            }
            }
            
        }
    });

    
});

//}

app.get('/user/:userid', (req, res) => {
    //let sqlstm=;
    connection.query('select * from beer.usertab where userid = ? ', [req.params.userid], function (error, results) {
        if (error) throw error;
        else {
            if (results.length >= 1) {
                mongoStoreSchema.userId = results.userid;


                console.log('The solution is: ', results);
                res.send(results);
                auth = 1;
            }
            else {
                res.send("user not valid");
            }
        }
    });

});


app.listen(3000);