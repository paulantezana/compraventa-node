$('.ui.sidebar')
    .sidebar({
        context: $('.context'),
        dimPage: false,
        closable: false,
        onVisible: function(){
            $(".pusher").addClass("marginlefting");
        },
        onHide: function(){
            $(".pusher").removeClass("marginlefting");
        }
    })
    .sidebar('attach events', '#left-sidebar-toggle');

$('.item.dropdown')
    .dropdown({
        action: 'item'
    })
;