let items, item_tmp, ListCart;

$(function () {
    getListCart()

    $.ajax({
        type: "get",
        url: "template/item-cart.html",
        dataType: "text",
        success: function (response) {
            item_tmp = response;
            $.getJSON('items.json', function (data) {
                items = data.data
                $(items).each(function (key, el) {
                    $(ListCart).each(function (key2, el2) {
                        if (el2 == el.id) {
                            let tem = item_tmp;
                            tem = tem.replace("{{TITLE}}", el.title)
                            tem = tem.replace("{{IMG}}", el.image)
                            tem = tem.replace("{{TYPE}}", el.type)
                            tem = tem.replace("{{DES}}", el.description)
                            tem = tem.replace("{{ID}}", el.id)
                            tem = tem.replace("{{PRICE}}", el.price)
                            $('#cart .boxListCart').append(tem)
                        }
                    })

                });
                getCountItem()
            });
        }
    });
    // console.log(ListCart);
});
function removeCart(id, e) {
    ListCart = jQuery.grep(ListCart, function (value) {
        return value != id;
    });
    $(e).closest('.list').remove();
    ListCart = $.unique(ListCart.sort());
    localStorage.ListCart = JSON.stringify(ListCart);
    getCountItem()
}
function getListCart() {
    if (localStorage.ListCart != undefined) {
        ListCart = localStorage.ListCart
        ListCart = jQuery.parseJSON(ListCart)
    } else {
        ListCart = [];
    }
}
function getCountItem() {
    $('.countItems').text(ListCart.length + ' Items')
    let totalPrice = 0;
    $(items).each(function (key, el) {
        $(ListCart).each(function (key2, el2) {
            if (el2 == el.id) {
                totalPrice += parseFloat(el.price)
            }
        })

    });
    totalPrice = totalPrice * 1000000;
    $('.priceBox .price').text(totalPrice.toLocaleString("en"))
    $('.numItems').text(ListCart.length)
}