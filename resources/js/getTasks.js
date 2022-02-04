
function testTasks() {
    var today = new Date().toISOString();
    var date = document.getElementById("date").value; // Get Today's Date
    console.log(date);
    var url = ' https://radiant-brushlands-07939.herokuapp.com/http://api.na1.insightly.com/v3.1/Tasks/Search?field_name=DUE_DATE&field_value='+today;

    var tasksDUE;

    // USE HEROKU SERVER AS PROXY

    axios.get(url, {

        headers: {
            'Authorization': 'Basic OTIwMzlmNzAtMjcwNS00MDczLTk5NzYtNDY4MWNjMWNjZjdkOg==',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
        },

    }).then(async function(response) {
            // handle success
            try {
                tasksDUE = response.data;
                var _contactID;
                var _cInfo;

                var taskList = document.getElementById('taskList');
                var _taskArray = [];
               
                tasksDUE.forEach(async function(item, index, tasksDUE) {
                    var current;
                    var tescus;
                    var idType;

                    try {

                        current = await item.LINKS[0]
                        tescus = await current.LINK_OBJECT_ID;
                        idType = await current.LINK_OBJECT_NAME; // checks if tasks belongs to Contact, Project or Organization
                        console.log(idType)

                        _contactID = await tescus;

                        switch(idType){
                            case "Contact":
                                _cInfo = await getContact(_contactID);

                            break

                            case "Project":
                                _cInfo = await getProject(_contactID);
                            break

                            case "Organisation":
                                _cInfo = await getOrganisation(_contactID);
                            break

                        }


                    } catch (error) {
                        console.log(error.message+index);
                    }

                    if (item.ASSIGNED_TEAM_ID == null) {
                        item.ASSIGNED_TEAM_ID = "N/A";
                    }

                    if (item.DETAILS != "" | null) {
                        item.DETAILS = await item.DETAILS.replace(/<[^>]*>?/gm, '');
                        //  console.log(item.DETAILS)
                    }


                    var _taskDue = {
                        "Name": _cInfo.Name,
                        "Phonenumber": _cInfo.Phonenumber,
                        "Address": _cInfo.Address,
                        "Second_Address": _cInfo.Second_Address,
                        "Task": item.DETAILS.replace(/[\r\n]/g, ""),
                        "Title": item.TITLE.replace(/<[^>]*>?/gm, ''),
                        "Status": item.STATUS,
                        "Technician": item.ASSIGNED_TEAM_ID,
                        "Date Scheduled": item.DATE_CREATED_UTC,
                    };

                    
                    _taskDue = await JSON.parse(JSON.stringify(_taskDue).replace(/null/g, " ")); //this contains all information about task

                   // console.log(_taskDue)
                    //console.log(index)
                    _taskArray.push(_taskDue);

                    if (index === tasksDUE.length - 1) { //check if loop is at last obejct in array
                        console.log(_taskArray)
                        makePdf(_taskArray)
                        // extTask(_taskArray)

                    }
                })

            } catch (err) {
                console.log(err.message)
            }

           
        } //END OF AXIOS REQUEST

    )
}





function specTasks() {
    var today = new Date().toISOString();
    var date = document.getElementById("date").value; // Get Today's Date
    console.log(date);
    var url = ' https://radiant-brushlands-07939.herokuapp.com/http://api.na1.insightly.com/v3.1/Tasks/Search?field_name=DUE_DATE&field_value=' + date;

    var tasksDUE;

    // USE HEROKU SERVER AS PROXY

    axios.get(url, {

        headers: {
            'Authorization': 'Basic OTIwMzlmNzAtMjcwNS00MDczLTk5NzYtNDY4MWNjMWNjZjdkOg==',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
        },

    }).then(async function(response) {
            // handle success
            try {
                tasksDUE = response.data;
                var _contactID;
                var _cInfo;

                var taskList = document.getElementById('taskList');
                var _taskArray = [];
               
                tasksDUE.forEach(async function(item, index, tasksDUE) {
                    var current;
                    var tescus;
                    var idType;

                    try {

                        current = await item.LINKS[0]
                        tescus = await current.LINK_OBJECT_ID;
                        idType = await current.LINK_OBJECT_NAME; // checks if tasks belongs to Contact, Project or Organization
                        console.log(idType)

                        _contactID = await tescus;

                        switch(idType){
                            case "Contact":
                                _cInfo = await getContact(_contactID);

                            break

                            case "Project":
                                _cInfo = await getProject(_contactID);
                            break

                            case "Organisation":
                                _cInfo = await getOrganisation(_contactID);
                            break

                        }


                    } catch (error) {
                        console.log(error.message+index);
                    }

                    if (item.ASSIGNED_TEAM_ID == null) {
                        item.ASSIGNED_TEAM_ID = "N/A";
                    }

                    if (item.DETAILS != "" | null) {
                        item.DETAILS = await item.DETAILS.replace(/<[^>]*>?/gm, '');
                        //  console.log(item.DETAILS)
                    }


                    var _taskDue = {
                        "Name":await  _cInfo.Name,
                        "Phonenumber":await _cInfo.Phonenumber,
                        "Address": await _cInfo.Address,
                        "Second_Address": await _cInfo.Second_Address,
                        "Task": await item.DETAILS.replace(/[\r\n]/g, ""),
                        "Title": await item.TITLE.replace(/<[^>]*>?/gm, ''),
                        "Status": await item.STATUS,
                        "Technician": await item.ASSIGNED_TEAM_ID,
                        "Date Scheduled": await item.DATE_CREATED_UTC,
                    };
                    _taskDue = await JSON.parse(JSON.stringify(_taskDue).replace(/null/g, " ")); //this contains all information about task

                   // console.log(_taskDue)
                    //console.log(index)
                    _taskArray.push(_taskDue);

                    if (index === tasksDUE.length - 1) { //check if loop is at last obejct in array
                        console.log(_taskArray)
                        makePdf(_taskArray)
                        // extTask(_taskArray)

                    }
                })

            } catch (err) {
                console.log(err.message)
            }

           
        } //END OF AXIOS REQUEST

    )
}


async function getContact(_contactID) {

    var date = new Date().toISOString(); // Get Today's Date
    var _cInfo = "";
    var _url = 'https://radiant-brushlands-07939.herokuapp.com/http://api.na1.insightly.com/v3.1/Contacts/' + _contactID;

    const _response = await axios.get(_url, {

        headers: {
            'Authorization': 'Basic OTIwMzlmNzAtMjcwNS00MDczLTk5NzYtNDY4MWNjMWNjZjdkOg==',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        }
    }).catch(function(err) {
        
        return null;
    })


    if(_response == null){
        return null
    } else{ _cInfo = await _response.data; }

    //console.log(_cInfo);
    var customer = {

        "Name": await _cInfo.FIRST_NAME + " " + _cInfo.LAST_NAME,
        "Address": await _cInfo.ADDRESS_MAIL_STREET + _cInfo.ADDRESS_MAIL_CITY + _cInfo.ADDRESS_MAIL_STATE,
        "Second_Address": await _cInfo.ADDRESS_OTHER_STREET + _cInfo.ADDRESS_OTHER_CITY + _cInfo.ADDRESS_OTHER_STATE,
        "Phonenumber": await _cInfo.PHONE_MOBILE + " " + _cInfo.PHONE + " " + _cInfo.PHONE_HOME + " " + _cInfo.PHONE_OTHER,

    }

    if (customer.Second_Address == 0) {
        customer.Second_Address = "N/A";
    }
    var _customer = await JSON.parse(JSON.stringify(customer).replace(/null/g, ""));

    return _customer;

}


async function getOrganisation(_contactID) {

    var _cInfo = "";
    var _url = 'https://radiant-brushlands-07939.herokuapp.com/http://api.na1.insightly.com/v3.1/Organisations/'+_contactID;

    var custId; // for storing courts customer ID
    const _response = await axios.get(_url, {

        headers: {
            'Authorization': 'Basic OTIwMzlmNzAtMjcwNS00MDczLTk5NzYtNDY4MWNjMWNjZjdkOg==',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        }
    }).catch(function(err) {
        console.log(err.message)
        return null;
    })

    if(_response == null){
        return null
    } else{ _cInfo = await _response.data; }

    if(_cInfo.ORGANISATION_NAME == "UNICOMER")

    {
         console.log(_cInfo)
         custId = await _cInfo.LINKS[0].LINK_OBJECT_ID;
         console.log(custId)

    }

    
    var customer = {

        "Name": await _cInfo.ORGANISATION_NAME,
        "Address": await _cInfo.ADDRESS_BILLING_STREET +" "+_cInfo.ADDRESS_BILLING_CITY +" "+ _cInfo.ADDRESS_BILLING_STATE,
        "Second_Address": await _cInfo.ADDRESS_SHIP_STREET + _cInfo.ADDRESS_SHIP_CITY + _cInfo.ADDRESS_SHIP_STATE,
        "Phonenumber": await _cInfo.PHONE };

    console.log(customer)

  
    // console.log(customer)
    if (customer.Second_Address == 0) {
        customer.Second_Address = "N/A";
    }
    var _customer = await JSON.parse(JSON.stringify(customer).replace(/null/g, ""));

    return _customer;

}



async function getProject(_contactID) {

    var _cInfo = "";
    var _url = 'https://radiant-brushlands-07939.herokuapp.com/http://api.na1.insightly.com/v3.1/Projects/' + _contactID;

    const _response = await axios.get(_url, {

        headers: {
            'Authorization': 'Basic OTIwMzlmNzAtMjcwNS00MDczLTk5NzYtNDY4MWNjMWNjZjdkOg==',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        }
    }).catch(function(err) {
        console.log(err.message)
        return null;
    })

    if(_response == null){
        return null
    } else{ _cInfo = await _response.data; }

    var customer = {

        "Name": await _cInfo.PROJECT_NAME,
      
    }

    // console.log(customer)
    if (customer.Second_Address == 0) {
        customer.Second_Address = "N/A";
    }
    var _customer = await JSON.parse(JSON.stringify(customer).replace(/null/g, ""));

    return _customer;
}


async function extTask(_taskArray){

    newWindow = window.open("", "newWindow", "width=800, height=600");
    var content = "<html><h2>Edit the tasks from Insightly then generate the PDF</h2> "
        content += "<script>"+"var tarray="+_taskArray+"forEach( async function(){} )";
        content += "</script>";
        content += "</html>";
    newWindow.document.write(content);

}