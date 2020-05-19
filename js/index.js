// --------------------------------------------
// Search
function search() {
    let arr = document.getElementById("searchTextbox").value.split(" ")
    let text = "https://tiki.vn/search?q="
    for (i = 0; i < arr.length - 1; i++) {
        text += arr[i] + '+'
    }
    text += arr[arr.length - 1]
    window.location.replace(text)
}

// --------------------------------------------
// Cart
var list = []
var totalCost = 0
document.getElementById("totalCost").innerHTML = "Tổng: " + totalCost + " VND";

// Các array và list bên dưới có thể lưu vào json cho đẹp code, nhưng lười...
// Chỉ dùng để dịnh danh sản phẩm
var categories = [
    "Vsmart B3",
    "Redmi 8",
    "Galaxy Note 10",
    "IPhone 11",
    "Realme 3 PRO",
    "Vsmart A3",
    "Galaxy M1",
    "Redmi Note 9s",
    "Galaxy A01",
    "Nokia 2.2"
]

// Chỉ dùng để refer giá sản phẩm
var costs = {
    "Vsmart B3": 1340000,
    "Redmi 8": 2790000,
    "Galaxy Note 10": 9690000,
    "IPhone 11": 30990000,
    "Realme 3 PRO": 3750000,
    "Vsmart A3": 3390000,
    "Galaxy M1": 3690000,
    "Redmi Note 9s": 5990000,
    "Galaxy A01": 1790000,
    "Nokia 2.2": 1490000
}
// Hỏi: Tại sao ko dùng index cho bảng cost mà lại dùng tên điện thoại? 
// Trả lời: Vì nó dễ debug

// Dùng để đặt id, prefix_id
prefix_tr = "pxtr_"
prefix_td2 = "pxtd2_"

function createCartEl(id) { // Cart element
    // father
    let object_tr = document.createElement("TR");
    object_tr.id = prefix_tr + id

    // Số thứ tự
    let object_th = document.createElement("TH");
    object_th.innerHTML = list.length
    object_tr.appendChild(object_th)

    // name
    let object_td1 = document.createElement("TD");
    object_td1.innerHTML = categories[id]
    object_tr.appendChild(object_td1)

    // số lượng
    let object_td2 = document.createElement("TD");
    object_td2.id = prefix_td2 + id
    object_td2.innerHTML = 1
    object_tr.appendChild(object_td2)

    // td for button
    let object_td3 = document.createElement("TD");
    // button +
    let object_bt1 = document.createElement("BUTTON");
    object_bt1.className = "increaseButton"
    object_bt1.innerHTML = "+"
    object_bt1.setAttribute('onclick', "addCart_btn(" + id + ");")

    object_td3.appendChild(object_bt1)
    // button - 
    let object_bt2 = document.createElement("BUTTON");
    object_bt2.className = "decreaseButton"
    object_bt2.innerHTML = "-"
    object_bt2.setAttribute('onclick', "removeCart_btn(" + id + ");")

    object_td3.appendChild(object_bt2)
    // button X
    let object_bt3 = document.createElement("BUTTON");
    object_bt3.className = "deleteButton"
    object_bt3.innerHTML = "x"
    object_bt3.setAttribute('onclick', "deleteCart_btn(" + id + ");")

    object_td3.appendChild(object_bt3)

    //final
    object_tr.appendChild(object_td3)
    document.getElementById("cartBody").appendChild(object_tr)
}

function findNameInList(name) {
    for (i = 0; i < list.length; i++) {
        if (name == list[i][0])
            return i;
    }
    return list.length
}

// --------------------------------------------
// onClick

// this is used for "Thêm"
function add2Cart(id) {
    let name = categories[id]
    let pos = findNameInList(name)
    if (pos < list.length)
        addCart_btn(id)
    else {
        list.push([name, 1])
        createCartEl(id)
        totalCost += costs[name]
        document.getElementById("totalCost").innerHTML = "Tổng: " + totalCost + " VND"
    }
    alert("Cập nhật thành công!")
}

// Bên dưới là các button trong giỏ hàng: + - x (thêm, bớt, xóa hàng)
function addCart_btn(id) {
    let name = categories[id]
    let pos = findNameInList(name)
    var object_td2 = document.getElementById(prefix_td2 + id)
    list[pos][1] += 1
    object_td2.innerHTML = list[pos][1]
    totalCost += costs[name]
    document.getElementById("totalCost").innerHTML = "Tổng: " + totalCost + " VND"
}

function removeCart_btn(id) {
    let name = categories[id]
    let pos = findNameInList(name)
    if (list[pos][1] - 1 > 0) {
        list[pos][1] -= 1
        let object_td2 = document.getElementById(prefix_td2 + id)
        object_td2.innerHTML = list[pos][1]
    } else {
        let index = list.indexOf(list[pos])
        list.splice(index, 1)
        let object_tr = document.getElementById(prefix_tr + id)
        object_tr.parentNode.removeChild(object_tr)
    }
    totalCost -= costs[name]
    document.getElementById("totalCost").innerHTML = "Tổng: " + totalCost + " VND"
}

function deleteCart_btn(id) {
    let name = categories[id]
    let pos = findNameInList(name)
    var object_tr = document.getElementById(prefix_tr + id)
    object_tr.parentNode.removeChild(object_tr)
    totalCost -= costs[name] * list[pos][1]
    document.getElementById("totalCost").innerHTML = "Tổng: " + totalCost + " VND"
    let index = list.indexOf(list[pos])
    list.splice(index, 1)
}