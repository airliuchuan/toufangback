$(function() {
    $('.del').click(function(e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);
        tr.remove();
        $.ajax({
            type: 'DELETE',
            url: '/admin/list?id=' + id
        })

    });
});