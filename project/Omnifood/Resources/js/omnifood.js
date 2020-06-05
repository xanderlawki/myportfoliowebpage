$(function() {
  $('h1').hide();
  $('h1').slideDown(4000);
});


 $(function flow() {
    $(function() {
    $('.app-screen').animate({
        'margin-right': '400px',
    }, 2000, 'linear', function() {
        $('.app-screen').animate({
            'margin': 0,
        }, 2000, 'linear')
    })
});
    
}) 


$(document).ready(function() {
    $('.js--direction').waypoint(function(direction) {
        if (direction == 'down') {
            $('nav').addClass('sticky');
        }
        else {
            $('nav').removeClass('sticky')
        }
    }, {
        offset: '60px;'
    })

    $('.js--wp-1').waypoint(function(direction) {
        $('.js--wp-1').addClass('animated fadeIn', 2000);
    }, {
        offset: '50px;'
    })
    
     $('.js--wp-2').waypoint(function(direction) {
        $('.js--wp-2').addClass('animated fadeIn', 2000);
    }, {
        offset: '50px;'
    })
    
     $('.js--wp-3').waypoint(function(direction) {
        $('.js--wp-3').addClass('animated pulse',2000);
    }, {
         offset: '50px;'
     })
    
    $('.js--wp-4').waypoint(function(direction) {
        $('.js--wp-4').addClass('animated fadeInUpBig',2000);
    }, {
        offset: '50px;'
    })
    
    $('.js--nav-icon').click(function() {
        var nav = $('.js--main-nav')
        var icon = $('.js--main-nav')
        nav.slideToggle(200)
        if (icon.hasClass()) {
            
        }
    })
    
    
    
})



