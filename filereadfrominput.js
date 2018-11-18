window.addEventListener('load', function() {
    var upload = document.getElementById('fileInput');
    if (upload) 
{
      upload.addEventListener('change', function() {
        if (upload.files.length > 0) {
          var reader = new FileReader(); // File reader to read the file 
          // This event listener will happen when the reader has read the file
          reader.addEventListener('load', function() {
            var result = JSON.parse(reader.result); // Parse the result into an object 
            cryptoCalculator(result);
            insertDesignCard();
         });
          reader.readAsText(upload.files[0]); // Read the uploaded file
          setTimeout(function(){
            $('input#fileInput').blur();
            $('.crypto-card').first().focus();
          }, 50);
          
        }
      });
    }
  });
  
insertDesignCard = function () {
  $(".date").each(function(index) {
      $(this).nextUntil(".date").addBack().wrapAll("<div class='crypto-card' tabindex=0' />")
  });
}

  cryptoCalculator = function (result) {
    for (var key in result) {
      var $card = $('<div class=\'card\'></div>');
          if (result.hasOwnProperty(key)){
            var data = result[key];
            printDate(data.date);
            printCurrency (data.currency);
            manageQuotes (data.quotes);
          }
      }

  };

  printCurrency = function (currency) {
    var $currency = '<div class=\'currency\'>'+currency+'</div>';
    document.getElementById("result-area").innerHTML += '<div class=\'currency\'>'+currency+'</div>';
  };

  printDate = function (date) {
    var day = date.slice(-2),
     month = date.slice(4, 6),
     monthText = findEqvMonth(month),
     year = date.slice(2, 4),
     dateText = day + '-' + monthText + '-' + year;
    document.getElementById("result-area").innerHTML += '<div class = \'date\'>'+dateText+'</div>';
  };

  manageQuotes = function (quotes){
    var min = findMin(quotes);
    quotes.sort(function(a, b){return a.price - b.price});
    var max = findMax(quotes);
    printProfit(min, max);
  };

  findMax = function (quotes) {
    var formattedTime = timeFormatter(quotes[quotes.length-1].time);
    document.getElementById("result-area").innerHTML += '<div class = \'sell\'> Sell $'+ quotes[quotes.length-1].price + ' at ' + formattedTime + '</div>';
    return quotes[quotes.length-1].price;
  };

  findMin = function (quotes) {
    var formattedTime = timeFormatter(quotes[0].time);
    document.getElementById("result-area").innerHTML += '<div class = \'buy\'> Buy $'+ quotes[0].price + ' at ' + formattedTime + '</div>';
    return quotes[0].price;
  };

  printProfit = function (min, max) {
    var profit = (max - min).toFixed(2);
    document.getElementById("result-area").innerHTML += '<div class = \'profit\'> Profit $' + profit + '</div>';
  };

  timeFormatter = function(time){
    var amOrPm = findAmOrPm(time),
     hour = time.slice(0,2),
     convertedHour = convertToTwelveHour(hour),
     min = time.slice(-2);
    return convertedHour + ':' + min + amOrPm;
  };

  convertToTwelveHour = function(hour){
    if(hour<='12'){
      return hour;
    } else {
      return (hour - 12);
    }
  };

  findAmOrPm = function(time){
    if(time >='1200') {
      return 'PM';
    } else return 'AM';
  };

  findEqvMonth = function(month) {
    if(month === '01') {
      return 'Jan';
    } else if(month === '02') {
      return 'Feb';
    } else if(month === '03') {
      return 'Mar';
    } else if(month === '04') {
      return 'Apr'; 
    } else if(month === '05') {
      return 'May'; 
    } else if(month === '06') {
      return 'Jun'; 
    } else if(month === '07') {
      return 'Jul'; 
    } else if(month === '08') {
      return 'Aug'; 
    } else if(month === '09') {
      return 'Sep'; 
    } else if(month === '10') {
      return 'Oct'; 
    } else if(month === '11') {
      return 'Nov'; 
    } else if(month === '12') {
      return 'Dec'; 
    }
  };
