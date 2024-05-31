let myTable = document.getElementById("myTable");
let tHeaders = myTable.getElementsByTagName('th');
let btn = document.getElementById("cities");
let buttonCities = document.getElementById("add-cities");
let citiName = document.getElementById("citi");
let listOfCities = document.getElementById("citi-List");

let res = Array.from(tHeaders).filter((el) => el.innerHTML == "Город");
console.log("Длина - ", res[0].cellIndex);
let cities =[];
cities[0] = ["Москва", "Казань", "Самара", "Пермь", "Сочи", "Калининград", "Владивосток", "Воронеж"];
cities[1] = ["Рига", "Москва", "Ростов", "Москва", "Уфа", "Новосибирск", "Челябинск", "Сургут"];

// простройка таблицы
cities.forEach((element, index) => {
    element.forEach((el, index) => {
        let row = document.createElement('tr');
        Array.from(tHeaders).forEach((head, ind) => {
            let cell = document.createElement('td');
            cell.innerHTML = (head.cellIndex != res[0].cellIndex) ? "Test": el; 
            row.appendChild(cell);
        });
        myTable.appendChild(row);
    });
});

btn.onclick = function chooseCities() {
    let citiNames = [...listOfCities.options].map(o => o.text);
    let filter = [...new Set(citiNames)];
    let result = Array.from(tHeaders).filter((el) => el.innerHTML == this.innerHTML);
    let tr = myTable.getElementsByTagName("tr");
    Array.from(tr).forEach((elm, ind) => {
        let td = elm.getElementsByTagName("td")[result[0].cellIndex];
        if (td) {
            txtValue = td.innerHTML;
            // elm.style.display = (txtValue.indexOf(filter) > -1) ? "": "none";
            elm.style.display = (filter.includes(txtValue)) ? "": "none";
        }
        
    });
}

buttonCities.onclick = function() {
    let option = document.createElement("option");
    option.text = citiName.value;
    listOfCities.add(option);
}

let tableToExcel = (function() {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table);
        let ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        // window.location.href = uri + base64(format(template, ctx));
        var link = document.createElement('a');
        link.setAttribute('href', uri + base64(format(template, ctx)));
        link.setAttribute('download', 'data.xls');
        link.click();
        URL.revokeObjectURL(link.href);
    }
  })()