window.addEventListener('load', function () {




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
            console.log(tag[0]);
            let clone = tag[0].cloneNode(true);
            clone.id = newId;
            clone.setAttribute("class", "advanced-select");
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

        let nameOfFilter = document.createElement('p');
        nameOfFilter.innerHTML = "<b>Расширенный поиск</b>";
        divsElements[indexDiv].appendChild(nameOfFilter);
        divsElements[indexDiv].appendChild(createClone("city_id", "newCiti"));
        createButton("add-cities", "Добавить город");
        divsElements[indexDiv].appendChild(createClone("magnit_reg", "newRegion"));
        createButton("add-regions", "Добавить регион");
//        if (tCells.length != 0) {
//            divsElements[indexDiv].appendChild(createCloneFromTable("ФИО Координатора", "newCoor"));
//            createButton("add-coord", "ФИО Координатора");
//        }

        let listOfFilter = document.createElement('select');
        listOfFilter.id = "citi-List";
        listOfFilter.setAttribute("class", "multiple");
        listOfFilter.setAttribute("size", "8");
        divsElements[indexDiv].appendChild(listOfFilter);

        createButton("clear", "Очистить");
        createButton("cities", "Город");
        createButton("regions", "Субъект РФ");

    }



    let buttonCities = document.getElementById("add-cities");
    let buttonRegions = document.getElementById("add-regions");
    let btnCities = document.getElementById("cities");
    let btnRegions = document.getElementById("regions");
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

            if (!(citiNameMew.options[citiNameMew.selectedIndex].text.includes("Выберите"))) {
                let option = document.createElement("option");
                option.text = citiNameMew.options[citiNameMew.selectedIndex].text;
                listOfCities.add(option);
            }
        }

    }

    buttonCities.onclick = buttonOnClick("newCiti");
    buttonRegions.onclick = buttonOnClick("newRegion");


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

});