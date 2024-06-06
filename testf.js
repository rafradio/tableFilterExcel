function findDivFilterBefore(tags) {
    let i = -1;
    Array.from(tags).forEach((el, index) => {
        let rez = Array.from(el.childNodes).filter(el => {
            let str = el.innerHTML;
            if (el.innerHTML) return str.includes("Фильтр");
            else return false;
        });
        if (rez.length > 0) i = index;
    });
    return i;
}

let loader = document.createElement('span');
loader.setAttribute("class", "loader");
let divsElementsBefore = document.getElementsByTagName('div');
let indexDivBefore = findDivFilterBefore(divsElementsBefore);
let nameOfFilter = document.createElement('p');
nameOfFilter.innerHTML = "<b>Расширенный поиск</b>";
divsElementsBefore[indexDivBefore].appendChild(nameOfFilter);
divsElementsBefore[indexDivBefore].appendChild(loader);


function execAfterTableLoaded() {
loader.style.display = 'none';
let myTable = document.getElementById("main_list");
let tHeaders = myTable.getElementsByTagName('th');
let tCells = myTable.getElementsByTagName('td');


// let listOfCities = document.getElementById("citi-List");
createElements();

function createElements() {
    const createClone = (idToClone, newId) => {
        let citiName = document.getElementById(idToClone);
        let clone = citiName.cloneNode(true);
        clone.id = newId;
        clone.setAttribute("class", "advanced-select");
        return clone;
    }

    const createCloneFromTable = (nameField, newId) => {

        let result = Array.from(tHeaders).filter((el) => el.childNodes[0].textContent.includes(nameField));
        let tr = myTable.getElementsByTagName("tr");
        console.log(tCells[10]);
        console.log(tr.length);
        console.log(result[0].childNodes[2]);
//            console.log(tag[0]);
        let clone = result[0].childNodes[2].cloneNode(true);
        clone.id = newId;
        clone.setAttribute("class", "advanced-select");
        clone.setAttribute("onchange", "");
        return clone;



    }

    // let citiName = document.getElementById("city_id");
    // const clone = citiName.cloneNode(true);
    // clone.id = "newCiti";

    let divsElements = document.getElementsByTagName('div');
    let indexDiv = findDivFilter(divsElements);

    const createButton = (idName, btnText) => {
        let btnCreating = document.createElement('button');
        btnCreating.setAttribute("class", "btn-style");
        btnCreating.id = idName;
        btnCreating.innerHTML = btnText;
        divsElements[indexDiv].appendChild(btnCreating); 
    }

//        let nameOfFilter = document.createElement('p');
//        nameOfFilter.innerHTML = "<b>Расширенный поиск</b>";
//        divsElements[indexDiv].appendChild(nameOfFilter);
    divsElements[indexDiv].appendChild(createClone("city_id", "newCiti"));
    createButton("add-cities", "Добавить город");
    divsElements[indexDiv].appendChild(createClone("magnit_reg", "newRegion"));
    createButton("add-regions", "Добавить регион");
    
    if (tCells.length != 0) {
//            createCloneFromTable("ФИО Координатора", "newCoor")
        divsElements[indexDiv].appendChild(createCloneFromTable("ФИО Координатора", "newCoor"));
        createButton("add-coord", "Добавить Коорд.");
    }

    let listOfFilter = document.createElement('select');
    listOfFilter.id = "citi-List";
    listOfFilter.setAttribute("class", "multiple");
    listOfFilter.setAttribute("size", "8");
    divsElements[indexDiv].appendChild(listOfFilter);

    createButton("clear", "Очистить");
    createButton("cities", "Город");
    createButton("regions", "Субъект РФ");
    createButton("coords", "ФИО Координатора");
    
    let btnCreatingEx = document.createElement('button');
    btnCreatingEx.setAttribute("class", "btn-style");
    btnCreatingEx.id = 'Excell';
    btnCreatingEx.innerHTML ='Export to Excel';
    btnCreatingEx.setAttribute("onclick", "tableToExcel('main_list', 'W3C Example Table')");
    let indexDiv1 = findDivFilter(divsElements);
    divsElements[indexDiv1].appendChild(btnCreatingEx); 

}



let buttonCities = document.getElementById("add-cities");
let buttonRegions = document.getElementById("add-regions");
let buttonCoord = document.getElementById("add-coord");
let btnCities = document.getElementById("cities");
let btnRegions = document.getElementById("regions");
let btnCoords = document.getElementById("coords");
let clearBtn = document.getElementById("clear");

const filterOnClick = () => {
    return function() {
        let listOfCities = document.getElementById("citi-List");
        let citiNames = [...listOfCities.options].map(o => o.text);
        let filter = [...new Set(citiNames)];
        // Array.from(tHeaders[0].childNodes).map(el => {console.log(el)});

        let result = Array.from(tHeaders).filter((el) => el.childNodes[0].textContent.includes(this.innerHTML));
        let tr = myTable.getElementsByTagName("tr");
        Array.from(tr).forEach((elm, ind) => {
            // console.log(elm.getElementsByTagName("td")[result[0]]);
            let td = elm.getElementsByTagName("td")[result[0].cellIndex];
            if (td) {
                txtValue = td.childNodes[0].innerHTML;
                // elm.style.display = (txtValue.indexOf(filter) > -1) ? "": "none";
                elm.style.display = (filter.includes(txtValue)) ? "": "none";
            }

        });

        for (i = listOfCities.options.length-1; i >= 0;i--) {
            listOfCities.remove(i);
        }

    }
}

btnCities.onclick = filterOnClick().bind(btnCities);
btnRegions.onclick = filterOnClick().bind(btnRegions);
btnCoords.onclick = filterOnClick().bind(btnCoords);

clearBtn.onclick = function chooseCities() {
    let listOfCities = document.getElementById("citi-List");
    for (i = listOfCities.options.length-1; i >= 0;i--) {
        listOfCities.remove(i);
    }
}

const buttonOnClick = (fieldName) => {
    return function() {
        let listOfCities = document.getElementById("citi-List");
        let citiNameMew = document.getElementById(fieldName);
        if (listOfCities.options.length != 0) {
            let elem = listOfCities.options[0].text;
            if ([...citiNameMew.options].map(o => o.text).indexOf(elem) == -1) {
                return;
            } 
            console.log(listOfCities.options[0].text);
        }
        let textIn = citiNameMew.options[citiNameMew.selectedIndex].text;
        if (!(textIn.includes("Выберите") || (textIn.includes("Filter")))) {
            let option = document.createElement("option");
            option.text = citiNameMew.options[citiNameMew.selectedIndex].text;
            listOfCities.add(option);
        }
    }

}

buttonCities.onclick = buttonOnClick("newCiti");
buttonRegions.onclick = buttonOnClick("newRegion");
buttonCoord.onclick = buttonOnClick("newCoor");




function findDivFilter(tags) {
    let i = -1;
    Array.from(tags).forEach((el, index) => {
        let rez = Array.from(el.childNodes).filter(el => {
            let str = el.innerHTML;
            if (el.innerHTML) return str.includes("Фильтр");
            else return false;
        });
        if (rez.length > 0) i = index;
    });
    return i;
}
}


window.addEventListener('load', function () {

setTimeout(execAfterTableLoaded, 1000);
});

let tableToExcel = (function() {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table);
        let ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
//             window.location.href = uri + base64(format(template, ctx));
        
//            function saveFile() {
            
            let link = document.createElement('a');
            link.setAttribute('href', uri + base64(format(template, ctx)));
            link.setAttribute('download', 'data.xls');
            
            const clickHandler = () => {
                setTimeout(() => {
                  URL.revokeObjectURL(link.href);
                  removeEventListener('click', clickHandler);
                }, 150);
            };
//                URL.revokeObjectURL(link.href);
            link.addEventListener('click', clickHandler, false);
            link.click();
            alert("Файл начал загружаться!");
//            }
//            function downloadFile(file, callback) {
//                let request = new XMLHttpRequest();
//                request.responseType = 'blob';
//                request.open('GET', file);
//                console.log('start');
//                request.addEventListener('load', function () {
//                    callback(request.response);
//                });
//                request.send();
//            }
//            downloadFile(base64(format(template, ctx)), function() {
//                saveFile();
//            });
    }
})();