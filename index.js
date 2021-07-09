// Your code here
function createEmployeeRecord(arr){
    let employeeRecord = {   
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [] ,
        timeOutEvents: []
    }
    return employeeRecord;
}

function createEmployeeRecords(arr){
    return  arr.map(createEmployeeRecord);
}

function createTimeInEvent(rec, dateStamp){
    const newTimeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }

    rec.timeInEvents.push(newTimeIn)
    return rec
}

function createTimeOutEvent(rec, dateStamp){
    const newTimeOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10)
    }
    rec.timeOutEvents.push(newTimeOut)
    return rec
}

function hoursWorkedOnDate(rec, date){
    const timeIn = rec.timeInEvents.find(e => e.date === date).hour
    const timeOut  = rec.timeOutEvents.find( e => e.date === date).hour
    return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate(rec, date){
 const pay =  rec.payPerHour
 return pay * hoursWorkedOnDate(rec, date)
}

function allWagesFor(rec){
    const wages = rec.timeInEvents.map(pay => wagesEarnedOnDate(rec, pay.date))
    return wages.reduce((total,wage) => total + wage)
}

function findEmployeeByFirstName(empNames, firstName){
    return empNames.find(employee => employee.firstName == firstName)
}

function calculatePayroll(rec){
    const employeeTotals = rec.map(employees => allWagesFor(employees))
    return employeeTotals.reduce((total, wages) => total + wages)
}