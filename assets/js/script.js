let items, item_tmp, ListCart;

$(function () {
    // if(localStorage.token == undefined) {
    //     window.location.href = 'login.html'
    // } else {
    //     window.location.href = 'index.html'
    // }
    getListCart()
    let id = getUrlParameter('id');
    if (id != false) {
        $.ajax({
            type: "get",
            url: "template/detail.html",
            dataType: "text",
            success: function (response) {
                item_tmp = response;
                $.getJSON('items.json', function (data) {
                    items = data.data
                    let tem = item_tmp;
                    $(items).each(function (key, el) {
                        if (id == el.id) {
                            tem = tem.replace("{{TITLE}}", el.title)
                            tem = tem.replace("{{IMG}}", el.image)
                            tem = tem.replace("{{DES}}", el.description)
                            tem = tem.replace(/{{ID}}/g, el.id)
                            tem = tem.replace("{{PRICE}}", el.price)
                            return false;
                        }
                    });
                    $('#detail .container.detail').append(tem)
                    $(ListCart).each(function (key, el) {
                        //console.log(el);
                        $('.btn-addCart[data-id="' + el + '"]').addClass('onAdd').text('Remove cart')
                    })
                    getCountItem()
                });
            }
        });
    } else {
        $.ajax({
            type: "get",
            url: "template/item.html",
            dataType: "text",
            success: function (response) {
                item_tmp = response;
                $.getJSON('items.json', function (data) {
                    items = data.data
                    $(items).each(function (key, el) {
                        let tem = item_tmp;
                        tem = tem.replace("{{TITLE}}", el.title)
                        tem = tem.replace("{{IMG}}", el.image)
                        tem = tem.replace("{{DES}}", el.description)
                        tem = tem.replace(/{{ID}}/g, el.id)
                        tem = tem.replace("{{PRICE}}", el.price)
                        $('.list-items .row').append(tem)
                    });
                    $(ListCart).each(function (key, el) {
                        //console.log(el);
                        $('.btn-addCart[data-id="' + el + '"]').addClass('onAdd').text('Remove cart')
                    })
                    getCountItem()
                });
            }
        });
    }

    //console.log(ListCart);

});
function addCart(id, e) {
    let statusAdd = true;
    $(e).toggleClass('onAdd')
    if ($(e).hasClass('onAdd')) {
        $(e).text('Remove cart')
    } else {
        $(e).text('Add to cart')
    }
    $(ListCart).each(function (key, el) {
        if (el == id) {
            statusAdd = false;
            return false;
        }
    })
    if (statusAdd) {
        ListCart.push(id);
    } else {
        ListCart = jQuery.grep(ListCart, function (value) {
            return value != id;
        });
    }
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
    $('.numItems').text(ListCart.length)
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};