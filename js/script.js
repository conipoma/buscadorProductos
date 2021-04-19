const searchBar = document.querySelector('#form-custom');
const boton = document.querySelector('#searchButton');

// Get User Search Function
function search(searchString){
    const regex = /^[0-9]*$/;
    if (searchString.length > 2 || regex.test(searchString)) {
        productSearch(searchString);
    }
}

// Search Products Function  
function productSearch(searchString) {  
    var cardProduct = document.getElementById('card-product');
    var colsSup = document.getElementById('cols-sup');
    axios.get('https://desafiowalmartapi.azurewebsites.net/products/' + searchString).then((response) => {
        colsSup.innerHTML = ' ';
        colsSup.innerHTML += `<div class="container-fluid cols">
            <section id="cols-sup">
                <div class="row cols-sup">
                    <div class="col col-one">
                        <p>Resultados para <b>${searchString}</b>:</p>
                    </div>
                    <div class="col col-two">
                        <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" title="Tooltip on left">Ordenar por: destacados</button> 
                    </div>
                </div>
            </section>
        </div>`

        cardProduct.innerHTML = ' ';
        const regex = /^[0-9]*$/;
        if(regex.test(searchString)){
            console.log('Pedido a la Api'); console.log(response.data);
            cardProduct.innerHTML += `
            <div class="card-container" style="width: 18rem" id="container-card">
            <div class="divCard">            
                <img src="http://${response.data.image}" class="card-img-top" id="product-img">
                <div class="card-body" id="card-body">
                    <h5 class="product-brand" id="product-brand"><span class="spanBrand">${response.data.brand}</span> <span class="spanDescription">${response.data.description}</span></h5>
                    <p class="product-price" id="product-price"> $ ${response.data.price} </p>
                </div>
            </div>`

            var cardBody = document.getElementById('card-body');

            if (response.data.promotion) {
                var productPrice = document.getElementById('product-price');
                productPrice.innerHTML += `<button class="btn btn-danger alert-discount" id="discount-button">50%</button>`
                cardBody.innerHTML += `<p class="product-price" id="product-original-price"><span class="spanPrice">$ ${response.data.originalPrice}</span></p>`
            }
            cardBody.innerHTML += `<div class="add-button container-button">
                <button type="button" class="btn btn-add" id="add-button">Agregar</button>
             </div>`

        } else {
            response.data.forEach((element) => { 
                console.log(element)
                cardProduct.innerHTML += `<div class="card-container" style="width: 18rem" id="container-card">
                <div class="divCard"> 
                    <img src="http://${element.image}" class="card-img-top" id="product-img">
                    <div class="card-body" id="card-body${element.id}">
                        <h5 class="product-brand" id="product-brand"><span class="spanBrand">${element.brand}</span> <span class="spanDescription">${element.description}</span></h5>
                        <p class="product-price" id="product-price${element.id}"> $ ${element.price}</p>
                    </div>
                </div>`

                var cardBody = document.getElementById('card-body' + element.id);
                
                if (element.promotion) {
                    var productPrice = document.getElementById('product-price' + element.id);
                    productPrice.innerHTML += `<button class="btn btn-danger alert-discount" id="discount-button">50%</button>`
                    cardBody.innerHTML += `<p class="product-price" id="product-original-price"><span class="spanPrice">$ ${element.originalPrice}</span></p>`
                }
                cardBody.innerHTML += `<div class="add-button container-button">
                <button type="button" class="btn btn-add" id="add-button">Agregar</button>
                </div>`
            });
        
        };
    })
    .catch ((err) => {
        console.log(err); 
    })
};