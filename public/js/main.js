$(document).ready(function () {

    function calcularTotal() {
        var preco = parseFloat($('#produto_id').children('option:selected').data('preco'));
        var quantidade = $('#quantidade').val();
        $('#total').val(preco * quantidade);
    }

    $('#produto_id').change(function () {
        calcularTotal();
    });

    $('#quantidade').keyup(function(){
        calcularTotal();
    });
});