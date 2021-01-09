$(document).ready(function() {
  
    $('.nav-elem-btn__menu').on('click', function() {
      $('.nav-nested').toggleClass('is-toggle')
    })

    $('.search-btn').on('click', function() {
      $('.search-form').toggleClass('is-toggle');
      $('.nav-list').toggleClass('is-toggle');
      $('.search-btn').toggleClass('is-toggle');
      $('.search-wrap').toggleClass('is-search-btn-toggle');
    })
  })
  
  