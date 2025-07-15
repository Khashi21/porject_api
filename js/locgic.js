const base_URL= "https://api.frankfurter.app/latest?amount=10&from=USD&to=INR";

const dropdowns=document.querySelectorAll(".dropdown select");
const  fromCurr=document.querySelector(".from select");
const  toCurr=document.querySelector(".to select");
const btn=document.querySelector("form button");
// for(code in countryList){
//     console.log(code,countryList[code]);
// }

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText =currCode;
        newOption.value=currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    console.log(countryCode,currCode);
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
// btn.addEventListener("click",async(evt)=>{
//     evt.preventDefault();
//     let amount=document.querySelector(".enteramt input");
//     let amt=amount.value;
//     if(amt==="" || amt<1){
//         amt=1;
//         amount.value=1;
//     }
//     console.log(fromCurr.value,toCurr.value);
//     const url=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     const message=document.querySelector(".msg");
//     let response = await fetch(url);
//     let data =await response.json();

//     console.log(data);

//     // message.innerText=`1 USD = 80 ${}`;
// })
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".enteramt input");
    let amt = amount.value;
    if (amt === "" || amt < 1) {
        amt = 1;
        amount.value = 1;
    }
    const url = `https://api.frankfurter.app/latest?amount=${amt}&from=${fromCurr.value}&to=${toCurr.value}`;


    // const url=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    const message = document.querySelector(".msg"); // ✅ fixed selector
    let response = await fetch(url);
    let data = await response.json();

    // let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = data.rates[toCurr.value];
    message.innerText = `${amt} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});