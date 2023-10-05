let items, item_tmp, ListCart;

$(function () {
    getListCart()
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
                    tem = tem.replace("{{ID}}", el.id)
                    tem = tem.replace("{{IDx}}", el.id)
                    tem = tem.replace("{{PRICE}}", el.price)
                    $('.list-items .row').append(tem)
                });
                $(ListCart).each(function(key,el){
                    //console.log(el);
                    $('.btn-addCart[data-id="'+el+'"]').addClass('onAdd').text('Remove cart')
                })
                getCountItem()
            });
        }
    });
    //console.log(ListCart);
   
});
function addCart(id,e) {
    let statusAdd = true;
    $(e).toggleClass('onAdd')
    if($(e).hasClass('onAdd')){
        $(e).text('Remove cart')
    }else{
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