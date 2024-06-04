let myTable = document.getElementById("TABLE_2");
let tHeaders = myTable.getElementsByTagName('th');




// let listOfCities = document.getElementById("citi-List");
createElements();

function createElements() {
    let citiName = document.getElementById("city_id");
    const clone = citiName.cloneNode(true);
    clone.id = "newCiti";

    let divsElements = document.getElementsByTagName('div');
    let indexDiv = findDivFilter(divsElements);
    let nameOfFilter = document.createElement('p');
    nameOfFilter.innerHTML = "<b>Расширенный поиск</b>";
    divsElements[indexDiv].appendChild(nameOfFilter);
    divsElements[indexDiv].appendChild(clone);
    let listOfFilter = document.createElement('select');
    listOfFilter.id = "citi-List";
    listOfFilter.setAttribute("class", "multiple");
    listOfFilter.setAttribute("size", "8");
    divsElements[indexDiv].appendChild(listOfFilter);
    let btn1OfFilter = document.createElement('button');
    btn1OfFilter.setAttribute("class", "btn-style");
    btn1OfFilter.id = "add-cities";
    btn1OfFilter.innerHTML = "Добавить город";
    divsElements[indexDiv].appendChild(btn1OfFilter);
    let btn2OfFilter = document.createElement('button');
    btn2OfFilter.setAttribute("class", "btn-style");
    btn2OfFilter.id = "cities";
    btn2OfFilter.innerHTML = "Город";
    divsElements[indexDiv].appendChild(btn2OfFilter);
}



let buttonCities = document.getElementById("add-cities");
let btn = document.getElementById("cities");

// простройка таблицы
let res = Array.from(tHeaders).filter((el) => el.innerHTML == "Город");
console.log("Длина - ", res[0].cellIndex);
let cities =[];
cities[0] = ["Москва", "Казань", "Самара", "Пермь", "Сочи", "Калининград", "Владивосток", "Воронеж"];
cities[1] = ["Рига", "Москва", "Ростов", "Москва", "Уфа", "Новосибирск", "Челябинск", "Сургут"];
cities[2] = ["Нижний Новгород", "Реутов", "Сургут", "Москва", "Сургут", "Тула", "Архангельск", "Уфа"];


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
// конец простройки таблицы

btn.onclick = function chooseCities() {
    let listOfCities = document.getElementById("citi-List");
    let citiNames = [...listOfCities.options].map(o => o.text);
    let filter = [...new Set(citiNames)];
    // Array.from(tHeaders[0].childNodes).map(el => {console.log(el)});
    // console.log(tHeaders[0].childNodes[0].textContent);
    let result = Array.from(tHeaders).filter((el) => el.childNodes[0].textContent.includes(this.innerHTML));
    let tr = myTable.getElementsByTagName("tr");
    Array.from(tr).forEach((elm, ind) => {
        // console.log(elm.getElementsByTagName("td")[result[0]]);
        let td = elm.getElementsByTagName("td")[result[0].cellIndex];
        if (td) {
            txtValue = td.innerHTML;
            // elm.style.display = (txtValue.indexOf(filter) > -1) ? "": "none";
            elm.style.display = (filter.includes(txtValue)) ? "": "none";
        }
        
    });

    for (i = listOfCities.options.length-1; i >= 0;i--) {
        listOfCities.remove(i);
    }
}

buttonCities.onclick = function() {
    let listOfCities = document.getElementById("citi-List");
    let citiNameMew = document.getElementById("newCiti");
    let option = document.createElement("option");
    option.text = citiNameMew.options[citiNameMew.selectedIndex].text;
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
        let link = document.createElement('a');
        link.setAttribute('href', uri + base64(format(template, ctx)));
        link.setAttribute('download', 'data.xls');
        link.click();
        URL.revokeObjectURL(link.href);
    }
})()

function findDivFilter(tags) {
    let i = -1;
    Array.from(tags).forEach((el, index) => {
        let rez = Array.from(el.childNodes).filter(el => {
            let str = el.innerHTML;
            if (el.innerHTML) return str.includes("Фильтр")
            else return false
        });
        if (rez.length > 0) i = index;
    });
    return i;
}