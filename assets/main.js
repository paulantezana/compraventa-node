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

// Dropdown
$('.item.dropdown')
    .dropdown({
        action: 'item'
    })
;

// Modal
$('.modal__new')
    .modal('attach events', '#new', 'show');
$('.modal__print')
    .modal('attach events', '#print', 'show');