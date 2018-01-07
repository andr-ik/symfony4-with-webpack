import '../scss/index.scss'

import $ from 'jquery';
import './modules/select2'

setTimeout(function () {
    $('h1').text('Индекс');
}, 2000);

$(() => {
    $('select').select2();
});