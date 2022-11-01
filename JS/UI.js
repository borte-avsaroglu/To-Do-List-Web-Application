const form = document.querySelector("form")
const infosBlock = document.getElementById("infos-block")
document.addEventListener("DOMContentLoaded", () => {
    const time = document.querySelector("#currentdate")
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var currentday = today.getDay()
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    today = mm + '/' + dd + '/' + yyyy + " , " + days[currentday];
    time.innerHTML = today
})

// Inputing Values
form.addEventListener("submit", function(e) {
    e.preventDefault()
    const starttime = document.getElementById("start-time")
    const endtime = document.getElementById("end-time")
    const title = document.getElementById("title")
    const location = document.getElementById("location")

    let strt = starttime.value
    let end = endtime.value
    let tit = title.value
    let loc = location.value

    let infos = [strt, end, tit, loc]

    // Validation Part

    if (strt === '' || end === '' || tit === '' || loc === '') {
        alert("Can not be empty!")
    } else {
        infosBlock.innerHTML += `
        <tr id="${infos[0]}">
            <td><input type = "time" class = "text-center" value = "${infos[0]}" disabled></td>
            <td><input type = "time" class = "text-center" value = "${infos[1]}" disabled></td>
            <td><input class = "text-center" value = "${infos[2]}" disabled></td>
            <td><input class = "text-center" value = "${infos[3]}" disabled></td>
            <td class="btn-grup">
                <i class="fas fa-pencil-alt btn btn-sm btn-primary" id="edit" ></i>
                <i class="far fa-trash-alt btn btn-sm btn-primary" id="delete"></i>
            </td>
        </tr>
        `
    }

    // Order by the time Part

    [].map.call(infosBlock.children, Object).sort(function(a, b) {
        return +a.id.match(/\d+/) - +b.id.match(/\d+/);
    }).forEach(function(elem) {
        infosBlock.appendChild(elem);
    });

    // Delete and Edit Part 

    let clearInput = [starttime, endtime, title, location]

    clearInput.forEach(input => {
        input.value = ''
    })
})

infosBlock.addEventListener('click', function(e) {
    console.log(e.target.className)
    if (e.target.id === 'delete') {
        if (confirm("Are you sure to delete it?")) {
            e.target.parentElement.parentElement.remove();
        }
    }
    if (e.target.id === 'edit') {
        const editElement = e.target.parentElement.parentElement.childNodes;
        editElement.forEach(element => {
            if (element.nodeType === 1) {
                element.childNodes[0].disabled = false
                element.addEventListener("keypress", function(e) {
                    if (e.key === "Enter") {
                        editElement.forEach(input => {
                            if (input.nodeType === 1) {
                                input.childNodes[0].disabled = true
                            }
                        })
                    }
                })
            }
        })
    }

})