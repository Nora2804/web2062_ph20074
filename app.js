import { localStorageService } from "./sever.js"

const form = document.querySelector("#form")
const fields = ["name", "number", "loai", "image", "description"]

form.onsubmit = event => {
    event.preventDefault()
    let validate = true
    let data = {}
    fields.forEach((field) => {
        const element = document.querySelector('#' + field)
        const errorElement = document.querySelector(".error" + field)
        if (!element.value) {
            validate = false
            errorElement.innerHTML = "dữ liệu k thể bỏ trống"
        }
        data[field] = element.value
    })
    if (validate) {
        const products = localStorageService.get("products")
        if (products) {
            localStorageService.set("products", [...products, data])
        } else {
            localStorageService.set("products", [data])
        }
    }
    render()

}
const render = () => {
    const products = localStorageService.get("products")
    document.querySelector('tbody').innerHTML = `
        ${products.map((products, index) => {
        return `
        <tr>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                ${index + 1}
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                ${products.name}
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                ${products.number}
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
                ${products.loai}
            </td>
            <td>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
            </td>
            <td>
            sửa/xóa
            </td>
        </tr>`
    })}
    `
}
render()