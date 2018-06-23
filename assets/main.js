// Dropdown
$('.item.dropdown')
    .dropdown({
        action: 'item'
    });

// Modal new view
$('.modal__new')
    .modal('attach events', '#new', 'show');

// Modal Print
$('.modal__print')
    .modal('attach events', '#print', 'show');

// Modal confirm
$('.modal__confirm')
    .modal('attach events', '#confirm', 'show');