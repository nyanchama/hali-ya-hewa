
function updateHeading(event) {
    event.preventDefault(); 
    let input = document.querySelector("#jiji");
    let heading = document.querySelector("h1");
    heading.innerHTML = input.value;
}

let form = document.querySelector("#form");
form.addEventListener("submit", updateHeading);
