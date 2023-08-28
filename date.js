


// module.exports.getDay = getDay;

// function getDay()

// {
//     let date = new Date();
//     // console.log(date);

//     let options = {
//         weekday: "long",
//         day: "numeric",
//         month: "long"
//     };

//     let day=date.toLocaleDateString("en-US",options);

//     return day;
// }

// module.exports.getonlyDay=getonlyDay;
// function getonlyDay()

// {
//     let date = new Date();
//     // console.log(date);

//     let options = {
//         weekday: "long",
//         // day: "numeric",
//         // month: "long"
//     };

//     return date.toLocaleDateString("en-US",options);

   
// }


exports.getDay= function(){
    let date=new Date();

    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    return date.toLocaleDateString("en-US",options);
}

exports.getonlyDay=function(){
    let date=new Date();

    let options={
        weekday:"long",
        // day:"numeric",
        // month:"long"
    };
    return date.toLocaleDateString("en-US",options);
}

