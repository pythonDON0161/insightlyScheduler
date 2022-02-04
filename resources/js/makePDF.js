

    
function makePdf(_taskArray){
    //console.log(_taskArray)
    var taskArray = []
   // taskArray = _taskArray.map(item => item.Address === "null" ? 'N/A' : item);
    //taskArray = JSON.parse(JSON.stringify(_taskArray).replace(/"null"/g,'"-"'));
    for(var i=0;i<_taskArray.length;i++) {
        taskArray = _taskArray.map(item => item.Address === "null" ? 'N/A' : item);
        //console.log(taskArray)
    }
  //  console.log(taskArray)
  /*
  var dd = {
    content: [ { 

            table: {

                body: [ 'test','test' ]

            }
        }
    ]
  }
*/
  var dd= { content :[

  ],    styles: {
    lineHeight: 1.5},
    unbreakable: true
  }
  

    for(var i=0;i<_taskArray.length;i++) {
      
        unbreakable: true,
        dd.content.push ({text: '\n\n'+ taskArray[i].Title,bold:true, fontSize: 16, style: 'header'}),
        dd.content.push({ columns:[{text: 'Name:', bold:true},{text: taskArray[i].Name}]  });
        dd.content.push({ columns:[{text: 'Description:', bold:true},{text: taskArray[i].Task}]  });
        dd.content.push({ columns:[{text: 'Status:', bold:true},{text: taskArray[i].Status}]  });
        dd.content.push({ columns:[{text: 'Phonenumber:', bold:true},{text: taskArray[i].Phonenumber}]  });
        dd.content.push({ columns:[{text: 'Address:', bold:true},{text: taskArray[i].Address}]  });
        dd.content.push({ columns:[{text: 'Second Address:', bold:true},{text: taskArray[i].Second_Address}]  });
        dd.content.push({ columns:[{text: 'Technician:', bold:true},{text: taskArray[i].Technician}]  });
        dd.content.push({  });
         
         
        
        
    }
    


    //var  docDefinition = {content: [formatList(taskList.items)]};
    pdfMake.createPdf(dd).open();
}