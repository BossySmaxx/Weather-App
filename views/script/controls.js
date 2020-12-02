let dataPicker = document.querySelector('#cal');
const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
const dateWrap = document.querySelector('.date');
const monthWrap = document.querySelector('.month');
const yearWrap = document.querySelector('.year');

// Date class 
class DatePicker {
    constructor(date) {
        this.months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
        this.month = new Date().getMonth();
        this.date = new Date().getDate();
        this.year = new Date().getFullYear();
        this.fullDate = date;
    }

    show() {
        // console.log(this.fullDate);
    }   

    getMonth() {
        return this.months[this.month];
    }

    simplifyDate () {
        let date = new Date(Date.parse(this.fullDate));
        // console.log(new Date(Date.parse(this.fullDate)));
        return {
            date: date.getDate(), 
            month: this.months[date.getMonth()], 
            year: date.getFullYear(), 
        }
    }

}
(function () {
    dateWrap.textContent = new Date().getDate();
    monthWrap.textContent = months[new Date().getMonth()];
    yearWrap.textContent = new Date().getFullYear();
    
    const locBtn = document.querySelector('.toggle');
    const menu = document.querySelector('.menu-box .wrapper');

    let menuStatus = true;
    locBtn.addEventListener('click', (e) => {
        // if (menuStatus) {
        //     menu.style.display = "none";
        //     menuStatus = false;
        // } else {
        //     menu.style.display = "flex";
        //     menuStatus = true;
        // }

        menu.classList.toggle('active');
    })

    const cityBox = document.querySelector('.city-name');
    const form = document.querySelector('form');
    const alertBox = document.querySelector('.alert');
    cityBox.addEventListener('keypress', (e) => {
        if (e.which == 13) {
            e.preventDefault();
            
           if(e.target.value.length > 0) {
               form.submit();
            } else {
                alertBox.children[0].textContent = "City Name can't be empty";
                alertBox.classList.add('alertme');
            }
        }

        setTimeout(() => {
            alertBox.classList.remove('alertme');
        }, 5000);

    })
})();

dataPicker.addEventListener('change', (date) => {
    let fullDate = date.target.value;
    let dateMain = new DatePicker(fullDate).simplifyDate();

    dateWrap.textContent = dateMain.date;
    monthWrap.textContent = dateMain.month;
    yearWrap.textContent = dateMain.year;

});