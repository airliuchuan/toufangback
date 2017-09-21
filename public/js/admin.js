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

    $('.audit').click(function() {
        $('.audit').each(function() {
            if($(this).prop('checked')) {
                console.log('if');
                $(this).prop('checked', true);
            } else {
                console.log('else');
                $(this).prop('checked', false);
            }
            console.log($(this).prop('checked'));
            $.ajax({
                type: 'post',
                data: 'audit=' + $(this).prop('checked') + '&objId=' + $(this).val(),
                url: '/admin/audit'
            })
        })
        
    });

    $("#btnSubmit").click(function() {
        var val = $('input:radio[name="toufang[category]"]:checked').val();
        if (val == null) {
            alert("请选择分类");
            return false;
        }
    });

});