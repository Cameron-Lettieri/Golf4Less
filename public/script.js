/**
 * All fields except for state and address2 on the form must be complete to switch to summary view
 Search only works in lower case
 Form can be marked as invalid, but if you fill out all fields correctly after it being marked invalid the order will still go through
 */

const firstpage = document.querySelector('.firstPage')
const secondpage = document.querySelector('.secondPage')
const form = document.querySelector('.form')
const thirdpage = document.querySelector('.thirdPage')
const golf1 = document.querySelector('.golf1')
const golf1C = document.querySelector('.golf1Checkout')
const golf1S = document.querySelector('.golf1S')
const golf2 = document.querySelector('.golf2')
const golf2C = document.querySelector('.golf2Checkout')
const golf2S = document.querySelector('.golf2S')
const golf3 = document.querySelector('.golf3')
const golf3C = document.querySelector('.golf3Checkout')
const golf3S = document.querySelector('.golf3S')
const golf4 = document.querySelector('.golf4')
const golf4C = document.querySelector('.golf4Checkout')
const golf4S = document.querySelector('.golf4S')
const golf5 = document.querySelector('.golf5')
const golf5C = document.querySelector('.golf5Checkout')
const golf5S = document.querySelector('.golf5S')
const golf6 = document.querySelector('.golf6')
const golf6C = document.querySelector('.golf6Checkout')
const golf6S = document.querySelector('.golf6S')
let search = document.getElementById("Sbutton")
let checkout = document.getElementById("Cbutton")
let returnB = document.getElementById("Rbutton")

var stock1 = 1;

document.getElementById("stock1").innerHTML = stock1;

function increments1() { 
    console.log("test")
    stock1+=1;
    document.getElementById("stock1").innerHTML = stock1;
}

function decrements1() { 
    stock1 -= 1;
}

function increment1() {
    console.log("test")
    document.getElementById('numGolf1').stepUp();
}

function decrement1() {
    console.log("test")
    document.getElementById('numGolf1').stepDown();
}

function increment2() {
    console.log("test")
    document.getElementById('numGolf2').stepUp();
}

function decrement2() {
    document.getElementById('numGolf2').stepDown();
}

function increment3() {
    document.getElementById('numGolf3').stepUp();
}

function decrement3() {
    document.getElementById('numGolf3').stepDown();
}

function increment4() {
    document.getElementById('numGolf4').stepUp();
}

function decrement4() {
    document.getElementById('numGolf4').stepDown();
}

function increment5() {
    document.getElementById('numGolf5').stepUp();
}

function decrement5() {
    document.getElementById('numGolf5').stepDown();
}

function increment6() {
    document.getElementById('numGolf6').stepUp();
}

function decrement6() {
    document.getElementById('numGolf6').stepDown();
}

search.addEventListener('click', event => {
    let name = document.getElementById("inputS").value;
    console.log(name);
    name.toLowerCase();
    if (!"strata ultimate men's 14-set".includes(name)) {
        golf1.classList.add("collapse")
    }
    if (!"strata ultimate men's 12-set".includes(name)) {
        golf2.classList.add("collapse")
    }
    if (!"strata ultimate women's 14-set".includes(name)) {
        golf3.classList.add("collapse")
    }
    if (!"strata ultimate women's 12-set".includes(name)) {
        golf4.classList.add("collapse")
    }
    if (!"reva men's 14-set".includes(name)) {
        golf5.classList.add("collapse")
    }
    if (!"reva men's 12-set".includes(name)) {
        golf6.classList.add("collapse")
    }
    if ("strata ultimate men's 14-set".includes(name)) {
        golf1.classList.remove("collapse")
    }
    if ("strata ultimate men's 12-set".includes(name)) {
        golf2.classList.remove("collapse")
    }
    if ("strata ultimate women's 14-set".includes(name)) {
        golf3.classList.remove("collapse")
    }
    if ("strata ultimate women's 12-set".includes(name)) {
        golf4.classList.remove("collapse")
    }
    if ("reva men's 14-set".includes(name)) {
        golf5.classList.remove("collapse")
    }
    if ("reva men's 12-set".includes(name)) {
        golf6.classList.remove("collapse")
    }
});