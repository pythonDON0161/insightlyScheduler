
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

