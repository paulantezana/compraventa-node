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