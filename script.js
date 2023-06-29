const customTipInput = document.getElementById("customTip");
const radioButtons = Array.from(document.getElementById("radioButtons").querySelectorAll("input[type='radio']"));
const labelButtons = Array.from(document.getElementById("radioButtons").querySelectorAll("label"));
const billInput = document.getElementById("bill");
const resetButton = document.getElementById("resetBtn");
const numberOPInput = document.getElementById("numberOfPeople");
// console.log(labelButtons);



labelButtons.forEach(item => {
    item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            const radioId = e.target.getAttribute('for');
            const radio = document.getElementById(radioId);
            if (radio) {
                radio.checked = !radio.checked;
                e.preventDefault();
            }
        }
    })
})

const form = document.getElementsByTagName("form")[0];

checkFormValidity();

numberOPInput.addEventListener("input", (e) => {
    console.log(e.target.value);
    if (/^[0-9]+$/.test(e.target.value) && parseInt(e.target.value) === 0) {
        e.target.parentElement.classList.add("error")
    }
    else {
        e.target.parentElement.classList.remove("error")
    }
});

customTipInput.addEventListener("focus", customTip);
customTipInput.addEventListener("input", customTip);
numberOPInput.addEventListener('input', checkFormValidity)
billInput.addEventListener('input', checkFormValidity)

form.addEventListener("submit", (e) => { e.preventDefault(); e.reportValidity(); })


for (const radioButton of radioButtons) {
    radioButton.addEventListener("click", defaultTip)
}



function calculation() {
    let { bill, tip, customTip, numberPeople } = form;

    const tipButton = (Array.from(tip).find(item => item.checked));

    // const tipValue = !customTip.value==="" ? ((Array.from(tip).find(item => item.checked)).nextElementSibling.innerHTML).replace("%", "") : customTip.value;

    const tipValue = tipButton?.nextElementSibling.innerHTML.replace("%", "") || (customTip.value !== "" ? customTip.value : 0);

    bill = parseFloat(bill.value);
    numberPeople = parseFloat(numberPeople.value);
    tip = parseFloat(tipValue / 100);

    const tipAmountPP = (bill * tip) / numberPeople; //Math.floor(((bill * tip) / numberPeople) * 100) / 100; 
    const totalPP = ((bill / numberPeople) + tipAmountPP);

    fetchData(tipAmountPP, totalPP);

}

function fetchData(tipAmountPP, totalPP) {
    document.getElementById("tipAmount").innerText = `$${(Math.floor(tipAmountPP * 100) / 100).toFixed(2)}`
    document.getElementById("totalPerPerson").innerText = `$${totalPP.toFixed(2)}`
    document.getElementById("resetBtn").disabled = false;
}



function checkFormValidity(e) {
    if (form.checkValidity()) {
        calculation();
    }
    else {
        document.getElementById("resetBtn").disabled = true;
    }

    // const radioBtnFlag = radioButtons.find(item => { return item.checked }) === undefined;
    // const tip = radioBtnFlag ? customTipInput.value : radioButtons.find(item => { return item.checked }).nextElementSibling.innerHTML;
    // let tipResult = tip;
    // if (tip.includes("%")) {
    //     tipResult = parseFloat(tip.replace("%", "")) / 100 * billInput.value;
    // }
    // const tipFlag = !radioBtnFlag || customTipInput.value > 0;

    // const peopleFlag = numberOPInput.value > 0;

    // const tipAmount = Math.round(((parseFloat(tipResult) / parseFloat(numberOPInput.value)) + Number.EPSILON) * 100) / 100;

    // console.log(peopleFlag, tipFlag, "aaaa");
    // if (peopleFlag && tipFlag) {
    //     document.getElementById("tipAmount").innerText = `$${tipAmount}`
    //     document.getElementById("totalPerPerson").innerText = `$${((parseFloat(tipResult) + parseFloat(billInput.value)) / numberOPInput.value).toFixed(2)}`
    //     document.getElementById("resetBtn").disabled = false;
    // }
    // else {
    //     form.reportValidity();
    //     document.getElementById("resetBtn").disabled = true;
    //     document.getElementById("tipAmount").innerText = `$0.00`
    //     document.getElementById("totalPerPerson").innerText = `$0.00`
    // }
}

document.getElementById("resetBtn").addEventListener("click", () => {
    fetchData(0, 0);
    form.reset();
    form.bill.value = ""
    Array.from(form.tip).forEach(item => item.checked = false)
    form.customTip.value = ""
    form.numberPeople.value = ""
    document.getElementById("resetBtn").disabled = true;
})

function customTip() {
    radioButtons[0].removeAttribute("required");
    for (const radioButton of radioButtons) {
        radioButton.checked = false;
    }
    // if (/^[0-9]+$/.test(this.value)) {
    // }
    checkFormValidity();
}

function defaultTip() {
    customTipInput.value = ""
    radioButtons[0].setAttribute("required", "true")
    checkFormValidity();
}

function cutDecimals(number, decimals) {
    return number.toLocaleString('fullwide', { maximumFractionDigits: decimals })
}
