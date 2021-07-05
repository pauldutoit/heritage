jQuery( document ).ready( function( $ ) {
    'use strict';

    handleJSStyling( $ );
    logoInTheMiddle( $ );
    handleBgColor( $ );
    setTransitionForCreativeTopItems( $, 0 );
    handleHmbMenu( $ );
    handleQuotes( $ );
    runMasonryForBlog( $ );
    stickyMenu( $ );
    backToTop( $ );
    clickOnSearchIcon( jQuery );
    handleMobile( $ );
    handleVideoImageContainer( $ );
    handleAlbumImageContainer( $ );
    justifiedGallery( $ );
    ajaxVcCfResponsive( $ );
    runUnslider( $ );
    handleParallax( $ );
    handleGoToNextSection( $ );
    hanldeJsLinks( $ );
    heritageSwpToggleMiniCart( $ );
    heritageSwpToggleMiniWishlist( $ );
    handleProductAttrShowcase( $ );
    handleVideoSection( $ );
    heritageSwpAddToWishlist( $ );
    heritageSwpRemoveWishlistItem( $ );
    heritageSwpQuantityChanger( $ );
    customAspectRatio( $ );
    makeProdImgCover( $ );
    lookTextOverImage($);
    handleLookBooks($);
    setTimeout( function() {
        setContentHeight( $ );
    }, 600 );


    customPageMenuStyle($);
    jQuery( window ).scroll( function() {
        stickyMenu( $ );
        customPageMenuStyle($);
    } );

    handleFooterSidebarsHeight( $ );
    jQuery( window ).on( "debouncedresize", function( event ) {
        handleFooterSidebarsHeight( $ );
        runMasonryForBlog( $ );
        handleVideoImageContainer( $ );
        handleAlbumImageContainer( $ );
        ajaxVcCfResponsive( $ );
        customAspectRatio( $ );
        handleType2ProductSliderImgHeight( $ );
        lookTextOverImage($);
        handleLookBooks($);
        setTimeout(function() {
            setContentHeight( $ );
        }, 600);
        heritageSwpHandleProductsMasonry( $ );
    } );

    imageOverText( $ );
    handlePostRating($);
    heritageSwpSelect2( $ );
    heritageSwpGridListSelector( $ );
    heritageSwpItemsPerRowSelector( $ );
    heritageSwpAddedToCartHandler( $ );
    heritageSwpHandleLoginPopup( $ );
    heritageSwpHandleQuickView( $ );

    handleType2ProductSliderImgHeight( $ );

    heritageSwpHandleType2TemplateVariationChangeImage($);
    heritageSwpHandleProductsMasonry($);
    handleFullScreenSearch();
});
var heritageSwpStyleElement = document.createElement( 'style' ),
        heritageSwpStylesheet;

// Append style element to head
document.head.appendChild( heritageSwpStyleElement );
// Grab style sheet
heritageSwpStylesheet = heritageSwpStyleElement.sheet;

var heritageSwpRulesIndexes = [];
var heritageSwpRulesIdIndexes = [];

var options = {
    width: 400,
    zoomWidth: 500
};
new ImageZoom(document.getElementById("img-container"), options);

function heritageSwpAddStylesheet ( id, cssText, context ) {
    var foundIndex;
    if ( (foundIndex = heritageSwpRulesIdIndexes.indexOf( id )) > -1 ) {
        heritageSwpStylesheet.deleteRule( foundIndex );
        heritageSwpRulesIndexes.splice( foundIndex, 1 );
        heritageSwpRulesIdIndexes.splice( foundIndex, 1 );
    }
    heritageSwpStylesheet.insertRule( cssText, heritageSwpStylesheet.cssRules.length );
    heritageSwpRulesIndexes.push( {
        'context' : context,
        'ruleId'  : id
    } );
    heritageSwpRulesIdIndexes.push( id );
}


function heritageSwpGuid () {
    function s4 () {
        return Math.floor( (1 + Math.random()) * 0x10000 )
                .toString( 16 )
                .substring( 1 );
    }

    return s4() + '-' + s4() + '-' + s4() + '-' + s4() ;
}

function runMasonryForBlog ( $ ) {
    if ( ! jQuery( '.lc_blog_masonry_container' ).length ) {
        return;
    }

    var $grid = jQuery( '.lc_blog_masonry_container' ).imagesLoaded( function() {
        var gap_width = $grid.data( "gapwidth" );
        var container_width = $grid.width();
        var container_outer_width = $grid.outerWidth();
        var bricks_on_row = $grid.data( "bricksonrow" );


        var bricks_on_row_responsive = getMasonryBricksOnRow( $, bricks_on_row, container_outer_width );
        var brick_width = (container_width - (bricks_on_row_responsive - 1) * gap_width) / bricks_on_row_responsive;

        jQuery( ".lc_blog_masonry_brick" ).css( "width", brick_width );
        $grid.masonry( {
            columnWidth  : brick_width,
            itemSelector : '.lc_blog_masonry_brick',
            gutter       : gap_width
        } );
        $grid.fadeTo( "400", 1 );
    } );
}

function getMasonryBricksOnRow ( $, default_number, container_outer_width, breakpoints ) {
    var breakpoints = $.extend({}, {1: 480, 2: 980, 3: 1680 },breakpoints);
    if ( container_outer_width <= breakpoints[1] ) {
        return 1;
    }
    else if ( container_outer_width <= breakpoints[2] ) {
        return 2;
    }
    else if ( container_outer_width <= breakpoints[3] ) {
        return 3;
    }
    else {
        return default_number;
    }
}

function runMasonryGallery ( $ ) {
    if ( ! jQuery( '.lc_masonry_container' ).length ) {
        return;
    }

    var $grid = jQuery( '.lc_masonry_container' ).imagesLoaded( function() {
        $grid.masonry( {
            itemSelector    : '.lc_masonry_brick',
            percentPosition : true,
            columnWidth     : '.brick-size',
        } );
        $grid.fadeTo( "400", 1 );
    } );
}

function runMasonryBlog ( $ ) {

    if ( ! jQuery( '.lc_blog_masonry_container' ).length ) {
        return;
    }

    var $grid = jQuery( '.lc_blog_masonry_container' ).imagesLoaded( function() {
        var default_width = jQuery( '.blog-brick-size' ).width();
        var default_height = 3 / 4 * default_width;
        var is_grid_layout = false;
        var no_portrait_allowed = false;
        var fixed_content_height_mobile = 1.6;

        if ( $grid.hasClass( "grid_container" ) ) {
            is_grid_layout = true;
        }

        if ( (2 * default_width - $grid.width()) > 1 ) {
            no_portrait_allowed = true;
        }

        jQuery( '.lc_blog_masonry_brick' ).each( function() {

            if ( jQuery( this ).hasClass( 'has_thumbnail' ) ) {

                var $image = jQuery( this ).find( 'img.lc_masonry_thumbnail_image' );
                var img_src = $image.attr( "src" );

                var $cover_div = jQuery( this ).find( ".brick_cover_bg_image" );
                $cover_div.addClass( "lc_cover_bg" );
                $cover_div.css( "background-image", "url(" + img_src + ")" );

                var imageObj = new Image();
                imageObj.src = $image.attr( "src" );

                if ( is_grid_layout || no_portrait_allowed ) {
                    jQuery( this ).css( "width", default_width );
                    jQuery( this ).css( "height", default_height );
                    if ( default_width < 380 ) {
                        jQuery( this ).css( "height", fixed_content_height_mobile * default_height );
                    }
                }
                else {
                    if ( imageObj.naturalWidth / imageObj.naturalHeight >= 1.6 ) {
                        jQuery( this ).addClass( "landscape_brick" );
                        jQuery( this ).css( "width", 2 * default_width );
                        jQuery( this ).css( "height", default_height );
                    }
                    else if ( imageObj.naturalHeight / imageObj.naturalWidth >= 1.5 ) {
                        jQuery( this ).addClass( "portrait_brick" );
                        jQuery( this ).css( "width", default_width );
                        jQuery( this ).css( "height", 2 * default_height );
                    }
                    else {
                        jQuery( this ).css( "width", default_width );
                        jQuery( this ).css( "height", default_height );
                    }
                }
            }
            else {
                jQuery( this ).css( "width", default_width );
                jQuery( this ).css( "height", default_height );
                if ( default_width < 380 ) {
                    jQuery( this ).css( "height", fixed_content_height_mobile * default_height );
                }
            }
        } );


        $grid.masonry( {
            itemSelector    : '.lc_blog_masonry_brick',
            percentPosition : true,
            columnWidth     : '.blog-brick-size',
        } );
        $grid.fadeTo( "400", 1 );
    } );
}

function handleQuotes ( $ ) {
    jQuery( 'blockquote' ).each( function() {
        jQuery( this ).prepend( jQuery( '<i class="fa fa-quote-right" aria-hidden="true"></i>' ) );
    } );
}
function handleJSStyling ( $ ) {
    function setBgImage(size){
        var imgSrc = jQuery( this ).data( "bgimage" );

        jQuery( this ).css( "background-image", "url(" + imgSrc + ")" );
        jQuery( this ).css( "background-position", "center center" );
        jQuery( this ).css( "background-repeat", "no-repeat" );
        jQuery( this ).css( "background-size", size );
    }

    jQuery( ".lc_swp_background_image" ).each( function() {
        setBgImage.apply(this,['cover']);
    } );
    jQuery( ".lc_swp_background_image_fit" ).each( function() {
        setBgImage.apply( this, ['contain'] );
    } );
    jQuery( ".lc_swp_background_image_normal" ).each( function() {
        setBgImage.apply( this, ['initial'] );
    } );

    jQuery( ".lc_swp_cust_bg_color" ).each( function() {
        jQuery(this).css("background-color", jQuery(this).data("bgcolor"));
    } );    

    jQuery( ".at_swp_js_css" ).each( function() {
        var custom_fs = jQuery( this ).data( "atfs" );
        var custom_ls = jQuery( this ).data( "atls" );
        var custom_fw = jQuery( this ).data( "atfw" );
        var custom_height = jQuery( this ).data( "height" );
        var custom_width = jQuery( this ).data( "width" );
        var custom_border_width = jQuery( this ).data( "border-width" );
        var fontWeight = jQuery( this ).data( "font-weight" );

        if ( custom_fs ) {
            jQuery( this ).css( "font-size", custom_fs + "px" );
        }
        if ( custom_ls ) {
            jQuery( this ).css( "letter-spacing", custom_ls + "px" );
        }
        if ( custom_fw ) {
            jQuery( this ).css( "font-weight", custom_fw );
        }
        if ( custom_height ) {
            if ( parseInt( custom_height ) == custom_height ) {
                custom_height += 'px';
            }
            jQuery( this ).css( "height", custom_height );
        }
        if ( custom_border_width ) {
            jQuery( this ).css( "border-width", custom_border_width + 'px' );
        }
        if ( custom_width ) {
            if ( parseInt( custom_width ) == custom_width ) {
                custom_width += 'px';
            }
            jQuery( this ).css( "width", custom_width );
        }
        if( fontWeight ) {
            jQuery( this ).css( "font-weight", fontWeight );
        }

        var custom_offset_left = jQuery( this ).data( 'offset-left' );
        if ( custom_offset_left ) {
            if ( parseInt( custom_offset_left ) == custom_offset_left ) {
                custom_offset_left += 'px';
            }
            jQuery( this ).css( "margin-left", custom_offset_left );
        }

        var custom_offset_right = jQuery( this ).data( 'offset-right' );
        if ( custom_offset_right ) {
            if ( parseInt( custom_offset_right ) == custom_offset_right ) {
                custom_offset_right += 'px';
            }
            jQuery( this ).css( "margin-right", custom_offset_right );
        }

        var custom_color = jQuery( this ).data( 'color' );
        if ( custom_color ) {
            jQuery( this ).css( 'color', custom_color );
        }
        var custom_zIndex = jQuery( this ).data( 'z_index' );
        if ( custom_zIndex || custom_zIndex == 0 ) {
            jQuery( this ).css( 'z-index', custom_zIndex );
        }

        /*custom colors for link*/
        if (jQuery(this).parent().hasClass("use_custom_link_color")) {
            var cust_col = jQuery(this).data("custcol");
            var cust_hover_col = jQuery(this).data("custhcol");

            jQuery(this).css("color", cust_col);

            var elementCustomClass = 'at_swp_'+ heritageSwpGuid();
            jQuery( this ).addClass( elementCustomClass);
            if (jQuery(this).hasClass("at_link_line_before")) {
                /*set bg color for :before to cust_col*/
                var cssText = '.'+elementCustomClass+' { color: ' +cust_col +' !important; }';
                heritageSwpAddStylesheet( elementCustomClass, cssText, 'at_link_line_before');
                cssText = '.'+elementCustomClass+':hover { color: ' + cust_hover_col +' !important; }';
                heritageSwpAddStylesheet( elementCustomClass + '-hover', cssText, 'at_link_line_before');

                cssText = '.'+elementCustomClass+':before { background-color: ' +cust_col +' !important; }';
                heritageSwpAddStylesheet( elementCustomClass + '-before', cssText, 'at_link_line_before');
                cssText = '.'+elementCustomClass+':hover:before { background-color: ' + cust_hover_col +' !important; }';
                heritageSwpAddStylesheet( elementCustomClass+ '-before-hover', cssText, 'at_link_line_before');
            }
        }
    } );

    jQuery( '.lc_custom_button_style' ).each( function() {
        var bg_color = jQuery( this ).data( "bbgc" );
        var bg_color_hover = jQuery( this ).data( "bbgch" );
        var txt_color = jQuery( this ).data( "btc" );
        var txt_color_hover = jQuery( this ).data( "btch" );
        var border_color = jQuery(this).data("borderc");
        var border_color_hover = jQuery(this).data("borderhc");
        var custom_letter_spacing = jQuery(this).data("lsp");
        var button_direction = jQuery(this).data("btndirection");
        var cust_hpadding = jQuery(this).data("custhpadding");


        if (null == button_direction) {
            button_direction = "default";
        }

        if ( "default" != bg_color ) {
            jQuery( this ).css( "background-color", bg_color );
            jQuery( this ).find( 'a' ).css( "background-color", bg_color );
        }
        if ( "default" != bg_color_hover ) {
            var bg_color_before = "default" != bg_color ? bg_color : jQuery( this ).css( 'background-color' );

            jQuery( this ).find( 'a' ).hover(
                    function() {
                        jQuery( this ).css( 'background-color', bg_color_hover );
                    }, function() {
                        jQuery( this ).css( 'background-color', bg_color_before );
                    }
            );
        }

        if ( "default" != txt_color ) {
            jQuery( this ).css( "color", txt_color );
            jQuery( this ).find( 'a' ).css( "color", txt_color );
        }
        if ( "default" != txt_color_hover ) {
            var color_before = "default" != txt_color ? txt_color : jQuery( this ).css( 'color' );

            jQuery( this ).find( 'a' ).hover(
                    function() {
                        jQuery( this ).css( 'color', txt_color_hover );
                    }, function() {
                        jQuery( this ).css( 'color', color_before );
                    }
            );
        }
        if ((null != border_color) && ("default" != border_color)) {
            jQuery(this).find('a').css("border-width", "1px");
            jQuery(this).find('a').css("border-color", border_color);
        }
        if ((null != border_color_hover) && ("default" != border_color_hover)) {
            var border_before = "default" != border_color ? border_color : jQuery(this).css('border-color');
            jQuery(this).find('a').hover(
                    function() {
                        jQuery(this).css('border-color', border_color_hover);
                    }, function() {
                        jQuery(this).css('border-color', border_before);
                    }
            );            
        }
        if ("default" != custom_letter_spacing) {
            jQuery(this).find('a').css("letter-spacing", custom_letter_spacing);
        }
        if ("default" != button_direction) {
            if (jQuery(this).hasClass("button_center")) {
                /*make sure that existing button transition is used*/
                jQuery(this).css("transform", "translateX(-50%) rotate(-90deg)");
            } else {
                jQuery(this).css("transform", "rotate(-90deg)");
            }
        }
        if ("default" != cust_hpadding) {
            jQuery(this).find("a").css("padding-left", cust_hpadding);
            jQuery(this).find("a").css("padding-right", cust_hpadding);
        }

    } );

    var responsiveBreakPoints = {
        'xs' : [0, 576],
        'sm' : [576, 767],
        'md' : [768, 991],
        'lg' : [992, 1200],
        'xl' : [1200, 9999]
    };
    /* responsive font */
    function responsiveFont () {
        var windowWidth = jQuery( window ).innerWidth();
        jQuery( ".at_swp_js_css" ).each( function() {
            var responsiveData = jQuery( this ).data( 'atresponsive' );
            if ( ! responsiveData ) {
                return;
            }
            var fontSize = - 1;
            var letterSpacing = - 1;
            for ( var bp in responsiveBreakPoints ) {
                if ( responsiveBreakPoints.hasOwnProperty( bp ) ) {
                    var lowerBound = responsiveBreakPoints[bp][0];
                    var upperBound = responsiveBreakPoints[bp][1];
                    if ( lowerBound <= windowWidth && windowWidth < upperBound ) {
                        if ( typeof responsiveData.fs[bp] !== "undefined" ) {
                            fontSize = responsiveData.fs[bp];
                        }
                        if ( typeof responsiveData.ls[bp] !== "undefined" ) {
                            letterSpacing = responsiveData.ls[bp];
                        }
                    }
                }
            }
            if ( fontSize != - 1 ) {
                jQuery( this ).css( "font-size", fontSize + "px" );
            }
            if ( letterSpacing != - 1 ) {
                jQuery( this ).css( "letter-spacing", letterSpacing + "px" );
            }

        } );
    }

    responsiveFont();
    jQuery( window ).resize( responsiveFont );
}

function handleBgColor ( $ ) {
    jQuery( ".lc_swp_overlay" ).each( function() {
        var bgColor = jQuery( this ).data( "color" );

        jQuery( this ).parent().css( "position", "relative" );

        jQuery( this ).css( {
            "background-color" : bgColor,
            "position"         : "absolute"
        } );
    } );

    jQuery( ".lc_swp_bg_color" ).each( function() {
        var bgColor = jQuery( this ).data( "color" );
        jQuery( this ).css( "background-color", bgColor )
    } );
}

function handleHmbMenu ( $ ) {
    jQuery( ".hmb_menu,.at_login_popup_close" ).hover(
            function() {
                jQuery( this ).find( '.hmb_line' ).addClass( 'hover' );
            }, function() {
                jQuery( this ).find( '.hmb_line' ).removeClass( 'hover' );
            }
    );

    jQuery( '.hmb_menu' ).click( function() {
        jQuery( this ).find( '.hmb_line' ).toggleClass( 'click' );

        if ( jQuery( this ).hasClass( 'hmb_creative' ) ) {
            jQuery( '.nav_creative_container' ).toggleClass( 'visible_container' );

            var resetValues = jQuery( '.nav_creative_container .creative_menu ul.menu > li' ).hasClass( 'menu_item_visible' ) ? 1 : 0;
            setTransitionForCreativeTopItems( $, resetValues );
            jQuery( '.nav_creative_container .creative_menu ul.menu > li' ).toggleClass( 'menu_item_visible' );
        }

        if ( jQuery( this ).hasClass( 'hmb_mobile' ) ) {
            if ( jQuery( 'header' ).hasClass( 'sticky_enabled' ) ) {
                jQuery( "body" ).animate( {scrollTop : 0}, 400, function() {
                    showMobileMenuContainer( $ );
                } );
            }
            else {
                showMobileMenuContainer( $ );
            }
        }
    } );

    jQuery( '.creative_menu ul li a' ).click( function( event ) {
        var parent = jQuery(this).parent();
        parent.siblings('.menu-item').find('ul').hide(200);
        if( parent.hasClass('menu-item-has-children') ){
            event.preventDefault();
        }
        parent.find( '> ul' ).stop().show( 200 );
    } );
}

var setTransitionForCreativeTopItems = function( $, resetValues ) {
    if ( ! jQuery( ".nav_creative_container" ).length ) {
        return;
    }

    if ( resetValues == 1 ) {
        jQuery( '.nav_creative_container .creative_menu ul.menu > li' ).each( function() {
            jQuery( this ).css( {
                "-webkit-transition-delay" : "0s",
                "-moz-transition-delay"    : "0s",
                "transition-delay"         : "0s"
            } );
        } )

        return;
    }

    var start_delay = 2;
    var elt_duration = "";
    jQuery( '.nav_creative_container .creative_menu ul.menu > li' ).each( function() {
        start_delay += 1;
        if ( start_delay < 10 ) {
            elt_duration = "0." + start_delay + "s";
        }
        else {
            elt_duration = start_delay / 10 + "s";
        }

        jQuery( this ).css( {
            "-webkit-transition-delay" : elt_duration,
            "-moz-transition-delay"    : elt_duration,
            "transition-delay"         : elt_duration
        } );
    } );
}

var showMobileMenuContainer = function( $ ) {
    jQuery( '.mobile_navigation_container' ).toggle();
    jQuery( '.mobile_navigation_container' ).toggleClass( 'mobile_menu_opened' );
}

function setContentHeight ( $ ) {
    if(jQuery('#lc_swp_wrapper').height() > jQuery(window).height()){
        return;
    }
    if ( ! jQuery( '#lc_swp_content' ).length ) {
        return;
    }
    if (jQuery('body').hasClass('page-template-template-visual-composer')) {
        return;
    }
    jQuery( '#lc_swp_content' ).css( "min-height", "" );

    var totalHeight = jQuery( window ).height();
    if ( jQuery( '#heading_area' ).length > 0 ) {
        totalHeight -= jQuery( '#heading_area' ).height();
    }
    if ( jQuery( '#footer_sidebars' ).length ) {
        totalHeight -= jQuery( '#footer_sidebars' ).height();
    }

    if ( jQuery( '.lc_copy_area ' ).length ) {
        totalHeight -= jQuery( '.lc_copy_area' ).height();
    }

    var minContentHeight = jQuery( '#lc_swp_content' ).data( "minheight" );
    if ( jQuery( '#lc_swp_content' ).length ) {
        if ( totalHeight > minContentHeight ) {
            jQuery( '#lc_swp_content' ).css( 'min-height', totalHeight -5 );
        }
    }

    if ( jQuery( '.lc_copy_area' ).length ) {
        jQuery( '.lc_copy_area' ).css( "opacity", "1" );
    }
}

function stickyMenu ( $ ) {
    if ( ! jQuery( 'header' ).hasClass( 'lc_sticky_menu' ) ) {
        return;
    }
    if ( jQuery( '.mobile_navigation_container' ).hasClass( 'mobile_menu_opened' ) ) {
        return;
    }

    var triggerSticky = 100;
    if ( jQuery( window ).scrollTop() > triggerSticky ) {
        enableSticky( $ );
    }
    else {
        disableSticky( $ );
    }
}

function customPageMenuStyle($) {
    /*no custom styling on sticky menu*/
    if (jQuery('header#at_page_header').hasClass('sticky_enabled')) {
        if (jQuery('#logo').find('.cust_page_logo').length) {
            jQuery('#logo').find('.cust_page_logo').hide();
            jQuery('#logo').find('.global_logo').show();
        }

        if (jQuery('header#at_page_header').hasClass('cust_page_menu_style')) {
            jQuery('header#at_page_header').removeAttr("style");
            /*creative*/
            jQuery('header#at_page_header').find(".hmb_line").removeAttr("style");
            jQuery('header#at_page_header').find(".at_login_wish > div > a").removeAttr("style");
            jQuery('header#at_page_header').find(".creative_header_icon > a").removeAttr("style");
            jQuery('header#at_page_header').find(".creative_header_icon > .lnr-magnifier").removeAttr("style");

            /*classic*/
            jQuery('header#at_page_header').find(".classic_header_icon > a").removeAttr("style");
            jQuery('header#at_page_header').find(".classic_header_icon > .lnr-magnifier").removeAttr("style");
            jQuery('header#at_page_header').find(".classic_menu > ul > li:not(.current-menu-parent):not(.current-menu-item) > a").removeAttr("style");

            /*centered*/
            jQuery('header#at_page_header').find(".lc_social_profile > a").removeAttr("style");
        }

        return;
    }

    if (jQuery('#logo').find('.cust_page_logo').length) {
        jQuery('#logo').find('.cust_page_logo').css("display", "block");
        jQuery('#logo').find('.global_logo').hide();
    }

    if (jQuery('header#at_page_header').hasClass('cust_page_menu_style')) {
        var menu_bg = jQuery('header#at_page_header').data("menubg");
        var menu_col = jQuery('header#at_page_header').data("menucol");


        if (menu_bg && (menu_bg != "")) {
            jQuery('header#at_page_header').css("background-color", menu_bg);
        }
        if (menu_col && (menu_col != "")) {
            /*creative*/
            jQuery('header#at_page_header').find(".hmb_line").css("background-color", menu_col);
            jQuery('header#at_page_header').find(".at_login_wish > div > a").css("color", menu_col);
            jQuery('header#at_page_header').find(".creative_header_icon > a").css("color", menu_col);
            jQuery('header#at_page_header').find(".creative_header_icon > .lnr-magnifier").css("color", menu_col);

            /*classic*/
            jQuery('header#at_page_header').find(".classic_header_icon > a").css("color", menu_col);
            jQuery('header#at_page_header').find(".classic_header_icon > .lnr-magnifier").css("color", menu_col);
            jQuery('header#at_page_header').find(".classic_menu > ul > li:not(.current-menu-parent):not(.current-menu-item) > a").css("color", menu_col);            

            /*centered*/
            jQuery('header#at_page_header').find(".lc_social_profile > a").css("color", menu_col);
        }
    }

    if (jQuery('.pre_header.cust_pre_header_style').length) {
        /*pre header*/
        var pre_bg = jQuery('.pre_header.cust_pre_header_style').data("prebg");
        var pre_col = jQuery('.pre_header.cust_pre_header_style').data("precol");

        if (pre_bg && (pre_bg != "")) {
            jQuery('.pre_header.cust_pre_header_style').css("background-color", pre_bg);
        }
        if (pre_col && (pre_col != "")) {
            jQuery('.pre_header.cust_pre_header_style').find('.at_menu_message').css("color", pre_col);
            jQuery('.pre_header.cust_pre_header_style').find(".classic_header_icon > a").css("color", pre_col);
            jQuery('.pre_header.cust_pre_header_style').find(".classic_header_icon > .lnr-magnifier").css("color", pre_col);            
        }
    }

}

var enableSticky = function( $ ) {
    if ( jQuery( 'header' ).hasClass( 'sticky_enabled' ) ) {
        return;
    }

    jQuery( 'header' ).css( "visibility", "hidden" )
    jQuery( 'header' ).addClass( 'sticky_enabled' );
    jQuery( 'header' ).css( "visibility", "visible" );
}

var disableSticky = function( $ ) {
    var element = jQuery( 'header' );
    if ( jQuery( element ).hasClass( 'sticky_enabled' ) ) {
        jQuery( element ).removeClass( 'sticky_enabled' );

        if ( 0 == jQuery( element ).attr( "class" ).length ) {
            jQuery( element ).removeAttr( "class" );
        }
    }
}

var backToTop = function( $ ) {
    if ( ! jQuery( '.lc_back_to_top_btn' ).length ) {
        return;
    }

    var backToTopEl = jQuery( '.lc_back_to_top_btn' );
    jQuery( backToTopEl ).click( function() {
        jQuery( "html, body" ).animate( {scrollTop : 0}, "slow" );
    } );

    jQuery( window ).scroll( function() {
        if ( jQuery( window ).scrollTop() < 200 ) {
            jQuery( backToTopEl ).hide();
        }
        else {
            jQuery( backToTopEl ).show( 'slow' );
        }
    } );
}

console.log("test file");

jQuery( '.trigger_global_search' ).click( function() {
    console.log("test");
    jQuery( '#lc_global_search' ).show();
} );

var clickOnSearchIcon = function( jQuery ) {
    jQuery( '.trigger_global_search' ).click( function() {
        console.log("test");
        jQuery( '#lc_global_search' ).show();
    } );

    jQuery( '.close_search_form' ).click( function() {
        var $global_search = jQuery( '#lc_global_search' );
        $global_search.hide();
        jQuery( '.lc_global_search_inner' , $global_search).removeClass('active');
        jQuery( '#search-word' , $global_search).val('');
        jQuery( '#search_results' , $global_search).empty();
    } );

    jQuery( document ).keyup( function( e ) {
        /* escape key maps to keycode `27`*/
        if ( e.keyCode == 27 ) {
            jQuery( '.close_search_form' ).trigger('click');
            // jQuery( '#lc_global_search' ).hide();
        }
    } );
}

var handleMobile = function( $ ) {
    jQuery( 'nav.mobile_navigation' ).find( 'ul li.menu-item-has-children > a' ).click( function( event ) {
        event.preventDefault();
        jQuery( this ).parent().find( '> ul' ).toggle( '300' );
    } );
}

var handleVideoImageContainer = function( $ ) {
    if ( ! jQuery( '.video_image_container' ).length ) {
        return;
    }

    jQuery( '.video_image_container' ).each( function() {
        var no_px_width = parseFloat( jQuery( this ).css( 'width' ) );
        jQuery( this ).css( "height", no_px_width * 9 / 16 );
        jQuery( this ).parent().parent().css( "opacity", 1 );
    } );
}

var handleAlbumImageContainer = function( $ ) {
    if ( ! jQuery( '.album_image_container' ).length ) {
        return;
    }

    jQuery( '.album_image_container' ).each( function() {
        var no_px_width = parseFloat( jQuery( this ).css( 'width' ) );
        jQuery( this ).css( "height", no_px_width );
        jQuery( this ).parent().parent().css( "opacity", 1 );
    } );
}

var justifiedGallery = function( $ ) {
    if ( ! jQuery( '.lc_swp_justified_gallery' ).length ) {
        return;
    }

    jQuery( ".lc_swp_justified_gallery" ).each( function() {
        var rowHeight = jQuery( this ).data( "rheight" );
        if ( ! $.isNumeric( rowHeight ) ) {
            rowHeight = 180;
        }

        jQuery( this ).justifiedGallery( {
            rowHeight               : rowHeight,
            lastRow                 : 'justify',
            margins                 : 0,
            captions                : false,
            imagesAnimationDuration : 400
        } );

        jQuery( this ).find( "img" ).fadeTo( "600", 0.6 );
        jQuery( this ).parent().find( '.view_more_justified_gallery' ).fadeTo( "400", 1 );
    } );

    setTimeout( function() {
        jQuery( '.img_box' ).find( "img" ).addClass( "transition4" );
    }, 600 );

}

var ajaxVcCfResponsive = function( $ ) {
    if ( ! jQuery( ".vc_lc_contactform" ).length ) {
        return;
    }

    var containerWidth = jQuery( ".vc_lc_contactform" ).width();
    if ( containerWidth <= 768 ) {
        jQuery( ".vc_lc_contactform" ).find( ".vc_lc_element" ).removeClass( "three_on_row" );
    }
    else {
        jQuery( ".vc_lc_contactform" ).find( ".three_on_row_layout" ).addClass( "three_on_row" );
    }
}

var runUnslider = function( $ ) {
    jQuery( '.lc_reviews_slider:not(.lc_slider_two_rows)' ).unslider( {
        arrows   : {
            prev : '<a class="unslider-arrow prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
            next : '<a class="unslider-arrow next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
        },
        autoplay : false,
        delay    : 4000,
        speed    : 400
    } );

    var next_value = "next";
    var prev_value = "prev";
    if ( jQuery( '.at_produts_slider_inner' ).length ) {
        if ( jQuery( '.at_produts_slider_inner' ).data( "nextslide" ) ) {
            next_value = jQuery( '.at_produts_slider_inner' ).data( "nextslide" );
        }
        if ( jQuery( '.at_produts_slider_inner' ).data( "prevslide" ) ) {
            prev_value = jQuery( '.at_produts_slider_inner' ).data( "prevslide" );
        }
    }

    var slider_arrows = {
            prev : '<a class="unslider-arrow prev">' + prev_value + '</a>',
            next : '<a class="unslider-arrow next">' + next_value + '</a>',
        };

    jQuery( '.at_produts_slider_inner' ).unslider( {
        arrows   : slider_arrows,
        autoplay : false,
        delay    : 4000,
        speed    : 400,
        nav      : false
    } );

    var gallery = jQuery( '.woocommerce div.images .image_gallery' );

    gallery.on( 'unslider.change', function( event, index, slide ) {
        jQuery( '.heritage_swp_gallery_thumbnails a.heritage_swp_gallery_thumbnail' ).removeClass( 'active' );
        jQuery( '.heritage_swp_gallery_thumbnails a.heritage_swp_gallery_thumbnail:eq(' + index + ')' ).addClass( 'active' );
    } );

    gallery.unslider( {
        arrows   : {
            prev : '<a class="gallery-unslider-arrow prev"><i class="fa fa-angle-left" aria-hidden="true"></i> <span class="at_swp_slider_prev_next_text">' + 'prev'/*heritage_swp.sliderPrevText*/ + '</span> </a>',
            next : '<a class="gallery-unslider-arrow next"><i class="fa fa-angle-right" aria-hidden="true"></i><span class="at_swp_slider_prev_next_text">' + 'next'/*heritage_swp.sliderNextText*/ + '</span> </a>',
        },
        autoplay : false,
        delay    : 10000,
        speed    : 400,
        nav      : false
    } );

    jQuery( '.heritage_swp_gallery_thumbnails a' ).click( function( event ) {
        event.preventDefault();
        var index = jQuery( this ).index();
        jQuery( gallery ).unslider( 'animate:' + index );
        return false;
    });


    jQuery('.lc_lookbook_slider').each(function(){
        var prev_val = "";
        var next_val = "";
        var arrow_class = "text_nav";
        if ("nav_text" == jQuery(this).data("navstyle")) {
            prev_val = jQuery(this).data("prevtxt");
            next_val = jQuery(this).data("nexttxt");
        } else {
            prev_val = '<i class="fa fa-angle-left" aria-hidden="true"></i>';
            next_val = '<i class="fa fa-angle-right" aria-hidden="true"></i>';
            arrow_class = "icon_nav";
        }

        var layout_style = jQuery(this).find('.lookbook_single').first().data("layoutstyle");
        var slider_container = jQuery(this);

        slider_container.on('unslider.ready', function() {
            var RESPONSIVE_VIEW_RES_MAX = 600;

            var placeLookbookSliderArrowsTextOverUnderImage = function(slider_container) {
                slider_container.parent().find('.unslider-look-arrow').addClass("rotate_min_90");

                var left_dist = 10;
                var right_dist = 10;
                if (slider_container.find('.lookbook_single_container').width() <= RESPONSIVE_VIEW_RES_MAX) {
                    left_dist = 0 - slider_container.parent().find('.unslider-look-arrow.prev').outerWidth()/2 +  
                                slider_container.parent().find('.unslider-look-arrow.prev').outerHeight() + 15;
                    right_dist = 0 - slider_container.parent().find('.unslider-look-arrow.next').outerWidth()/2 + 
                                slider_container.parent().find('.unslider-look-arrow.next').outerHeight() + 15;
                }

                slider_container.parent().find('.unslider-look-arrow.prev').css("left", left_dist);
                slider_container.parent().find('.unslider-look-arrow.next').css("right", right_dist);
            }

            if (("text_over_image" == layout_style) || 
                ("text_under_image" == layout_style)) {

                placeLookbookSliderArrowsTextOverUnderImage(slider_container);

                if ("text_under_image" == layout_style) {
                    slider_container.parent().find('.unslider-look-arrow').css("top", slider_container.parent().find(".look_image_over").height() /2);
                }
                if ("text_over_image" == layout_style) {
                    slider_container.parent().find('.unslider-look-arrow').css("top", slider_container.find('.lookbook_single').first().height() /2);
                }

                jQuery(window).on( "debouncedresize", function( event ) {
                    placeLookbookSliderArrowsTextOverUnderImage(slider_container);
                });                 
            }

            var placeLookbookSliderArrowsTextAside = function(slider_container) {
                var hdistance = "50px";
                var top_value = slider_container.parent().find(".look_image_aside").height() /2;

                if (slider_container.find('.lookbook_single_container').width() <= RESPONSIVE_VIEW_RES_MAX) {
                    hdistance = "25px";
                    /*place the slider buttons just after the content*/
                    top_value = slider_container.find('.look_content_aside').first().height() - 110;
                }

                if (slider_container.parent().find(".look_content_aside").hasClass("show_on_left")) {
                    slider_container.parent().find('.unslider-look-arrow').css("right", hdistance);    
                } else {
                    slider_container.parent().find('.unslider-look-arrow').css("left", hdistance);
                }
                
                slider_container.parent().find('.unslider-look-arrow').css("top", top_value);
                slider_container.parent().find('.unslider-look-arrow.prev').css("margin-top", "50px");
            }

            if ("text_aside" == layout_style) {
                placeLookbookSliderArrowsTextAside(slider_container);

                jQuery(window).on( "debouncedresize", function( event ) {
                    placeLookbookSliderArrowsTextAside(slider_container);
                });                
            }

            setTimeout(function(){
                slider_container.parent().find('.unslider-look-arrow').fadeIn("600");
            }, 1000);            
        });

        var look_slider = slider_container.unslider({
            arrows   : {
                prev : '<a class="unslider-look-arrow ' + arrow_class + ' prev">' + prev_val + '</a>',
                next : '<a class="unslider-look-arrow ' + arrow_class + ' next">' + next_val + '</a>',
            },
            autoplay : true,
            delay    : 10000,
            speed    : 400,
            nav      : false,
            selectors: {
                container: '.unslider_parent',
                slides: '.lookbook_single_container'
            }
        });
    });


    //handle two rows reviews slider
    var trrs = jQuery( '.lc_reviews_slider.lc_slider_two_rows' );

    function setReviewImagesMargin ( imagesContainer ) {
        var reviewImages = jQuery( '.lc_reviewer_image', imagesContainer );
        reviewImages.css( {'margin' : '0','height' : '100%'} );
        var imgWidth = reviewImages.length * reviewImages.width();
        if ( imgWidth >= imagesContainer.width() ) {
            reviewImages.css( {'margin' : '0', 'width' : imagesContainer.width() / reviewImages.length} );
        }
        else {
            var reviewImgMargin = (jQuery( imagesContainer ).width() / reviewImages.length - jQuery( reviewImages ).width()) / 2;
            reviewImages.css( {'margin' : '0 ' + reviewImgMargin + 'px'} );
        }
    }
    if ( trrs.length ) {
        trrs.each( function() {
            var imagesContainer = jQuery( '.lc_reviews_slider_top_row .lc_reviews_slider_inner', this );
            var bg_color = jQuery(imagesContainer).parent().css('background-color');

            var numReviews = jQuery( '.lc_reviewer_image', this ).length;
            jQuery( '.lc_reviewer_image', this ).each( function() {
                var reviewContent = jQuery(this).closest('li');
                jQuery( '.lc_reviews_slider_arrow', this ).css( 'border-top-color', bg_color );
                jQuery(this).click(function(){
                    jQuery(this).siblings().removeClass('active');
                    jQuery(this).addClass('active');
                    jQuery(reviewContent).siblings().hide();
                    jQuery(reviewContent).show().css('display', 'table-row');
                });
                jQuery( this ).appendTo( imagesContainer ).css('width', (100/numReviews).toFixed(3) + '%');
            } );
            jQuery('.lc_reviewer_image:first-of-type').click();
        } );
    }

};

var handleParallax = function( $ ) {
    jQuery( ".lc_swp_parallax" ).each( function() {
        if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
            jQuery( this ).addClass( "ai_swp_no_scroll" );
        }
        else {
            jQuery( this ).css( "background-position", "50% 0" );
            var $parallaxObject = jQuery( this );

            jQuery( window ).scroll( function() {
                var yPos = - (jQuery( window ).scrollTop() / $parallaxObject.data( "pspeed" ));
                var newCoord = '50% ' + yPos + 'px';

                $parallaxObject.css( "background-position", newCoord );
            } );
        }
    } );
}

var handleGoToNextSection = function( $ ) {
    if ( ! jQuery( '.goto_next_section' ).length ) {
        return;
    }

    var animateIcon = function( targetElement, speed ) {
        jQuery( targetElement ).css( {'padding-top' : '0px'} );
        jQuery( targetElement ).css( {'opacity' : '1'} );
        jQuery( targetElement ).animate(
                {
                    'padding-top' : "25px",
                    "opacity"     : "0"
                },
                {
                    duration : speed,
                    complete : function() {
                        animateIcon( jQuery( '.goto_next_section i' ), speed );
                    }
                }
        );
    };
    setTimeout( function() {
        animateIcon( jQuery( '.goto_next_section i' ), 2000 );
    }, 3000 );

    jQuery( '.goto_next_section' ).click( function() {
        var $nextRow = jQuery( this ).parents( '.vc_row' ).next();
        if ( $nextRow.length ) {
            jQuery( 'html, body' ).animate( {
                scrollTop : $nextRow.offset().top
            }, 1200 );
        }
    } );

}

var hanldeJsLinks = function( $ ) {
    if ( ! jQuery( '.lc_js_link' ).length ) {
        return;
    }

    jQuery( '.lc_js_link' ).click( function( event ) {

        var clickOnChild = typeof jQuery( this ).data( 'atcot' ) !== "undefined" ? Boolean( jQuery( this ).data( 'atcot' ) ) : true;
        if ( this != event.target && ! clickOnChild ) {
            return;
        }
        event.preventDefault();
        var newLocation = jQuery( this ).data( "href" );
        var newWin = '_self';
        if ( jQuery( this ).data( "target" ) ) {
            newWin = jQuery( this ).data( "target" );
        }
        window.open( newLocation, newWin );
    } );
}

var logoInTheMiddle = function( $ ) {
    if ( ! jQuery( '.centered_menu' ).length ) {
        return;
    }
    console.log('centered menu');

    var middleMenuPosition = Math.ceil( jQuery( ".header_inner.centered_menu ul.menu > li" ).length / 2 );
    jQuery( ".header_inner.centered_menu ul.menu > li:nth-child(" + middleMenuPosition + ")" ).after( '<li class="logo_menu_item"></li>' );
    jQuery( '#logo' ).detach().appendTo( 'li.logo_menu_item' );
    /*TODO: add margin left on nav.centered_menu.classic_menu equal with left side  - right side*/

    var leftWidth =0;
    var rightWidth =0;
    var logoMenuItem = jQuery( 'nav.centered_menu.classic_menu .logo_menu_item' );
    console.log(logoMenuItem);
    logoMenuItem.prevAll( '.menu-item' ).each( function() {
        leftWidth += jQuery( this ).width();
    } );
    logoMenuItem.nextAll('.menu-item').each(function(){
        rightWidth += jQuery(this).width();
    });

    jQuery( 'nav.centered_menu.classic_menu').css('margin-left', rightWidth - leftWidth);

    jQuery( '#logo' ).css( "opacity", "1" );
    jQuery( ".header_inner.centered_menu" ).animate( {opacity : 1}, "slow" );
}

var imageOverText = function( $ ) {
    if ( ! jQuery( '.swp_image_over_text' ).length ) {
        return;
    }

    jQuery( '.swp_image_over_text' ).each( function() {
        var databg = jQuery( this ).data( "bgimage" );
        jQuery( this ).css( "background", "url(" + databg + ") center center no-repeat" );
        jQuery( this ).css( "-webkit-background-clip", "text" );
        jQuery( this ).css( "-webkit-text-fill-color", "transparent" );
    } );
}

var heritageSwpToggleMiniCart = function( $ ) {
    var miniCartIcon = jQuery( '.heritage-swp-minicart-icon' );
    miniCartIcon.find( '.heritage-swp-minicart' ).hide();

    miniCartIcon.hover( function() {
        jQuery( this ).find( '.heritage-swp-minicart' ).stop().fadeIn();
        if (jQuery('.pre_header.classic_double_menu').length) {
            jQuery('.at_wishlist.account_option').css("display", "none");
            jQuery('.at_login.account_option').css("display", "none");
        }
    }, function() {
        setTimeout( (function( parent ) {
            return function() {
                if ( ! jQuery( '.heritage-swp-minicart-icon:hover' ).length ) {
                    jQuery( parent ).find( '.heritage-swp-minicart' ).stop().fadeOut(10);
                    jQuery('.at_wishlist.account_option').css("display", "block");
                    jQuery('.at_login.account_option').css("display", "block");                    
                }
            }
        })( this ), 100 );
    } );
};
var heritageSwpToggleMiniWishlist = function( $ ) {
    var miniCartIcon = jQuery( '.at_wishlist' );
    miniCartIcon.find( '.heritage-swp-miniwishlist' ).hide();

    miniCartIcon.find( 'a' ).mouseenter( function() {
            miniCartIcon.find( '.heritage-swp-miniwishlist' ).stop().fadeIn();
    } );
    miniCartIcon.mouseleave( function() {
        setTimeout( (function( parent ) {
            return function() {
                if ( ! jQuery( '.at_wishlist:hover' ).length ) {
                    jQuery( parent ).find( '.heritage-swp-miniwishlist' ).stop().fadeOut(10);
                }
            }
        })( miniCartIcon ), 100 );
    } );
};

var heritageSwpAddToWishlist = function( $ ) {
    jQuery( 'body' ).on( 'click', '.heritage_swp_add_to_wishlist', function( event ) {
        var productId = jQuery( this ).data( 'wishlist-id' );
        var _self = this;
        $.ajax( {
            type     : 'POST',
            url      : heritage_swp_wishlist.ajax_url,
            data     : {
                action     : 'heritage_swp_add_to_wishlist',
                product_id : productId
            },
            dataType : "json",
            success  : function( response ) {
                if ( typeof response.error !== "undefined" ) {
                    alert( response.message )
                }
                else {
                    var btn = '<span class="heritage_swp_already_on_wishlist" title="' + response.message + '"><i class="fa fa-heart"></i> <span>' + response.message + '</span></span>';

                    if ( typeof response.mini_wishlist_item !== "undefined" ) {
                        var $wishlist = jQuery( '.heritage_swp-mini_wishlist' );
                        $wishlist.find( 'li.empty' ).remove();
                        $wishlist.append( response.mini_wishlist_item );
                        jQuery( '.heritage-swp-miniwishlist p.buttons' ).removeClass( 'at_hidden' );
                    }

                    jQuery( _self ).replaceWith( btn );
                }
            },
            error    : function( MLHttpRequest, textStatus, errorThrown ) {
                alert( response.errorThrown );
            }
        } );
        return false;
    } );
};

var heritageSwpRemoveWishlistItem = function( $ ) {
    jQuery( 'body' ).on( 'click', '.heritage-swp-wishlist-remove-item', function( event ) {
        var productId = jQuery( this ).data( 'wishlist-id' );
        var _self = this;
        $.ajax( {
            type     : 'POST',
            url      : heritage_swp_wishlist.ajax_url,
            data     : {
                action     : 'heritage_swp_remove_from_wishlist',
                product_id : productId
            },
            dataType : "json",
            success  : function( response, textStatus, XMLHttpRequest ) {
                if ( typeof response.success !== "undefined" ) {
                    jQuery( '[data-wishlist-item=' + productId + ']' ).fadeOut( 400, function() {
                        jQuery( this ).remove();

                        if ( response.products_in_wishlist == 0 ) {
                            jQuery( '#heritage-swp-empty-wishlist' ).show();
                            jQuery( 'ul.heritage_swp-mini_wishlist' ).append( '<li class="empty">' + heritage_swp_wishlist.emptyText + '</li>' );
                            jQuery( '.heritage-swp-miniwishlist p.buttons' ).addClass( 'at_hidden' );
                        }
                    } );
                }
                else {
                    alert( response.message );
                }
            },
            error    : function( MLHttpRequest, textStatus, errorThrown ) {
                alert( response.errorThrown )
            }
        } );

        return false;
    } );
};

var heritageSwpQuantityChanger = function( $ ) {
    jQuery( document ).on( 'click', '.increment_qty', function() {
        var input = jQuery( this ).parent().parent().find( "input.qty" );
        var oldVal = input.val();
        if ( parseFloat( oldVal ) >= 0 ) {
            var step = parseInt( jQuery( input ).attr( 'step' ) );
            step = step > 0 ? step : 1;
            var newVal = parseFloat( oldVal ) + step;
            input.val( newVal ).trigger( 'change' );
        }
    } );

    jQuery( document ).on( 'click', '.decrement_qty', function() {
        var input = jQuery( this ).parent().parent().find( "input.qty" );
        var oldVal = input.val();
        var step = parseInt( jQuery( input ).attr( 'step' ) );
        step = step > 0 ? step : 1;
        if ( parseFloat( oldVal ) > step ) {
            var newVal = parseFloat( oldVal ) - step;
            input.val( newVal ).trigger( 'change' );
        }
    } );
};

var heritageSwpGridListSelector = function( $ ) {
    jQuery( '.at_product_list_mode' ).on( 'click', function( event ) {
        event.preventDefault();
        jQuery( '#at_product_view_mode' ).val( jQuery( this ).data( 'mode' ) ).closest( 'form' ).submit();
    } );
};

var heritageSwpItemsPerRowSelector = function( $ ) {
    jQuery( '.at_products_per_row_item' ).on( 'click', function( event ) {
        event.preventDefault();
        jQuery( '#at_products_per_row' ).val( jQuery( this ).data( 'per_page' ) ).closest( 'form' ).submit();
    } );
};

var heritageSwpSelect2 = function( $ ) {
    jQuery( 'select' ).filter( function() {
        return ( jQuery( this ).hasClass( 'country_to_state' ) || jQuery( this ).is( ':visible' )) && jQuery( this ).closest( '.variations' ).length < 1;
    } ).select2( {
        'minimumResultsForSearch' : 20
    } );
};

var heritageSwpAddedToCartHandler = function( $ ) {
    jQuery( document.body ).on( "added_to_cart", function( event, fragments, cart_hash ) {
        if ( fragments['div.widget_shopping_cart_content'] ) {
            var $cart_contents = jQuery( fragments['div.widget_shopping_cart_content'] );
            jQuery( '.heritage-swp-minicart' ).html( $cart_contents.html() );
        }
        if ( fragments['at_cart_contents_count'] ) {
            jQuery( '.cart-contents-count' ).html( fragments['at_cart_contents_count'] );
        }
    } );
};

var heritageSwpHandleLoginPopup = function( $ ) {
    jQuery( '.at_to_login_popup' ).click( function( event ) {
        event.preventDefault();
        jQuery( '#at_login_popup' ).addClass( 'visible_container' )
    } );
    jQuery( '.at_login_popup_close' ).click( function( event ) {
        event.preventDefault();
        jQuery( '#at_login_popup' ).removeClass( 'visible_container' )
    } );

    jQuery( '#at_login_form_container' ).on( 'click', '#at_to_register', function( event ) {
        event.preventDefault();
        jQuery( '#at_login_popup_messages' ).removeClass( 'active' ).html( '' );
        jQuery( '#at_login_form_container' ).removeClass( 'active' );
        jQuery( '#at_register_form_container' ).addClass( 'active' );
        jQuery( '#at_login_title' ).removeClass( 'active' );
        jQuery( '#at_register_title' ).addClass( 'active' );
    } );
    jQuery( '#at_register_form_container' ).on( 'click', '#at_to_login', function( event ) {
        event.preventDefault();
        jQuery( '#at_login_popup_messages' ).removeClass( 'active' ).html( '' );
        jQuery( '#at_login_form_container' ).addClass( 'active' );
        jQuery( '#at_register_form_container' ).removeClass( 'active' );
        jQuery( '#at_login_title' ).addClass( 'active' );
        jQuery( '#at_register_title' ).removeClass( 'active' );
    } );

    jQuery( '#at_login_btn' ).on( 'click', function( event ) {
        event.preventDefault();
        var formData = jQuery( '#at_loginform' ).serializeArray();

        formData.push( {name : 'action', value : 'heritage_swp_ajax_login'} );
        formData.push( {name : this.name, value : this.value} );

        $.ajax( {
            url        : heritage_swp_login_popup.ajax_url,
            method     : 'POST',
            data       : formData,
            beforeSend : function() {
                jQuery( '#at_login_popup_messages' ).removeClass( 'active' ).html( '' );
                jQuery( '#at_loading_overlay' ).addClass( 'active' );
            },
            success    : function( response ) {
                try {
                    response = JSON.parse( response );
                }
                catch ( e ) {
                    response = {};
                }
                if ( typeof response.success !== "undefined" && response.success ) {
                    window.location.reload();
                }
                else {
                    var msg = heritage_swp_login_popup.general_error_text;
                    if ( typeof response.message !== "undefined" ) {
                        msg = response.message;
                    }
                    jQuery( '#at_login_popup_messages' ).html( msg ).addClass( 'active' );
                }
            },
            error      : function( a, b, c ) {
                jQuery( '#at_login_popup_messages' ).html( heritage_swp_login_popup.general_error_text ).addClass( 'active' );
            },
            complete   : function() {
                jQuery( '#at_login_popup_messages' ).removeClass( 'active' );
                jQuery( '#at_loading_overlay' ).removeClass( 'active' );
            }
        } )
    } );


    var b = {
        init                  : function() {
            jQuery( document.body ).on( "keyup change", "form.at_register #reg_password", this.strengthMeter ),
                    jQuery( "form.at_register" ).change()
        },
        strengthMeter         : function() {
            var c = jQuery( "form.at_register" )
                    , d = jQuery( 'input[type="submit"]', c )
                    , e = jQuery( "#reg_password, #account_password, #password_1", c )
                    , f = 1;
            b.includeMeter( c, e ),
                    f = b.checkPasswordStrength( c, e ),
                    f < heritage_swp_password_string_meter.min_password_strength && ! c.is( "form.checkout" ) ? d.attr( "disabled", "disabled" ).addClass( "disabled" ) : d.removeAttr( "disabled", "disabled" ).removeClass( "disabled" )
        },
        includeMeter          : function( b, c ) {
            var d = b.find( ".woocommerce-password-strength" );
            "" === c.val() ? (d.remove(),
                    jQuery( document.body ).trigger( "wc-password-strength-removed" )) : 0 === d.length && (c.after( '<div class="woocommerce-password-strength" aria-live="polite"></div>' ),
                                   jQuery( document.body ).trigger( "wc-password-strength-added" ))
        },
        checkPasswordStrength : function( a, b ) {
            var c = a.find( ".woocommerce-password-strength" )
                    , d = a.find( ".woocommerce-password-hint" )
                    ,
                    e = '<small class="woocommerce-password-hint">' + heritage_swp_password_string_meter.i18n_password_hint + "</small>"
                    , f = wp.passwordStrength.meter( b.val(), wp.passwordStrength.userInputBlacklist() )
                    , g = "";
            switch ( c.removeClass( "short bad good strong" ),
                    d.remove(),
            f < heritage_swp_password_string_meter.min_password_strength && (g = " - " + heritage_swp_password_string_meter.i18n_password_error),
                    f ) {
                case 0:
                    c.addClass( "short" ).html( pwsL10n.short + g ),
                            c.after( e );
                    break;
                case 1:
                    c.addClass( "bad" ).html( pwsL10n.bad + g ),
                            c.after( e );
                    break;
                case 2:
                    c.addClass( "bad" ).html( pwsL10n.bad + g ),
                            c.after( e );
                    break;
                case 3:
                    c.addClass( "good" ).html( pwsL10n.good + g );
                    break;
                case 4:
                    c.addClass( "strong" ).html( pwsL10n.strong + g );
                    break;
                case 5:
                    c.addClass( "short" ).html( pwsL10n.mismatch )
            }
            return f
        }
    };
    b.init();
};

var handleProductAttrShowcase = function( $ ) {
    jQuery( '.lc_prod_attr_showcase' ).each( function() {
        var $tabs = jQuery( '<div class="tab_attr"></div>' );
        jQuery( this ).find( ".lc_prod_attr_showcase_inner" ).prepend( $tabs );

        jQuery( this ).find( '.prod_show_attr' ).each( function() {
            $tabs.append( jQuery( this ).detach() );
        } )

        var $active_attr = jQuery( this ).find( '.prod_show_attr' ).first().addClass( "active_attr" );
        var rightId = $active_attr.data( "prodimg" );
        jQuery( this ).find( '#' + rightId ).addClass( "active_prodimg" );

        jQuery( '.prod_show_attr' ).click( function() {
            jQuery( this ).parent().find( '.active_attr' ).removeClass( "active_attr" );
            jQuery( this ).addClass( "active_attr" );

            rightId = jQuery( this ).data( "prodimg" );
            jQuery( this ).parent().parent().find( '.active_prodimg' ).removeClass( "active_prodimg" );
            jQuery( this ).parent().parent().find( '#' + rightId ).addClass( "active_prodimg" );
        } );
    } );
}

var handleVideoSection = function( $ ) {
    jQuery( '.at_video_section_play' ).click( function() {
        var video_source = jQuery( this ).parent().data( "vsource" );
        var video_id = jQuery( this ).parent().data( "vid" );

        var video_frame = '';
        if ( "youtube" == video_source ) {
            video_frame = '<iframe class="at_video_frame" src="' + location.protocol + '//www.youtube.com/embed/' + video_id + '?autoplay=1&amp;showinfo=0&amp;rel=0&amp;byline=0&amp;title=0&amp;portrait=0"></iframe>';
        }
        else if ( "vimeo" == video_source ) {
            video_frame = '<iframe class="at_video_frame" src="' + location.protocol + '//player.vimeo.com/video/' + video_id + '?autoplay=1&amp;byline=0&amp;title=0&amp;portrait=0"></iframe>';
        }

        jQuery( this ).fadeOut();
        jQuery( this ).parent().find( '.at_video_title' ).fadeOut();
        jQuery( this ).parent().find( 'iframe' ).show();

        jQuery( this ).parent().append( video_frame );
    } );
}

var heritageSwpHandleQuickView = function( $ ) {

    jQuery( '.heritage_swp_quickview_button a' ).fancybox( {
        baseClass         : 'at_fancybox woocommerce',
        type              : 'ajax',
        closeClickOutside : true,
        infobar           : true,
        buttons           : true,
        slideShow         : true,
        fullScreen        : true,
        closeBtn          : true,
        thumbs            : {
            showOnStart   : true, // Display thumbnails on opening
            hideOnClosing : true   // Hide thumbnail grid when closing animation starts
        }
    } );
};

var heritageSwpConfirmBox = function( opts ) {

    var defaults = {
        title            : '',
        message          : '',
        cancelButtonText : heritage_swp.confirmCancel,
        okButtonText     : heritage_swp.confirmOk,
        callback         : null
    };

    var options = jQuery.extend( {}, defaults, opts );

    jQuery.fancybox.open(
            '<div class="at_swp_popup_dialog at_confirm">' +
            '<h3 class="at_popup_dialog_title">' + options.title + '</h3>' +
            '<p class="at_popup_dialog_text">' + options.message + '</p>' +
            '<p class="at_popup_dialog_buttons">' +
            '<a data-value="0" data-fancybox-close class="button alt alignright">' + options.cancelButtonText + '</a>' +
            '<a data-value="1" data-fancybox-close class="button alignright">' + options.okButtonText + '</a>' +
            '</p>' +
            '</div>', {
                smallBtn          : false,
                buttons           : false,
                keyboard          : false,
                closeClickOutside : false,
                baseClass         : 'at_swp_popup',
                slideClass        : 'atSlideFromTop',
                afterClose        : function( instance, e ) {
                    var button = e ? e.target || e.currentTarget : null;
                    var value = button ? jQuery( button ).data( 'value' ) : 0;
                    if ( options.callback && jQuery.isFunction( options.callback ) ) {
                        options.callback( value );
                    }
                }
            }
    );
};

var heritageSwpAlertBox = function( opts ) {

    var defaults = {
        title        : '',
        message      : '',
        okButtonText : heritage_swp.alertOk,
        callback     : null
    };

    var options = jQuery.extend( {}, defaults, opts );

    jQuery.fancybox.open(
            '<div class="at_swp_popup_dialog at_alert">' +
            '<h3 class="at_popup_dialog_title">' + options.title + '</h3>' +
            '<p class="at_popup_dialog_text">' + options.message + '</p>' +
            '<p class="at_popup_dialog_buttons">' +
            '<a data-fancybox-close class="button alignright">' + options.okButtonText + '</a>' +
            '</p>' +
            '</div>', {
                smallBtn          : false,
                buttons           : false,
                closeClickOutside : false,
                baseClass         : 'at_swp_popup',
                slideClass        : 'atSlideFromTop',
                keyboard          : false,
                afterClose        : function() {
                    if ( options.callback && jQuery.isFunction( options.callback ) ) {
                        options.callback();
                    }
                }
            }
    );
};

(function( proxied ) {
    window.alert = function( message ) {
        // do something here
        return heritageSwpAlertBox( {'message' : message} );
    };
})( window.alert );

var customAspectRatio = function( $ ) {
    jQuery( '.at_swp_custom_ar' ).each( function() {
        if ( jQuery( this ).hasClass( "ar_square" ) ) {
            jQuery( this ).css( "height", jQuery( this ).width() );
        }
        if ( jQuery( this ).hasClass( "ar_43" ) ) {
            jQuery( this ).css( "height", jQuery( this ).width() / 4 * 3 );
        }
        if ( jQuery( this ).hasClass( "ar_169" ) ) {
            jQuery( this ).css( "height", jQuery( this ).width() / 16 * 9 );
        }
    } );
}

var makeProdImgCover = function( $ ) {
    if ( ! jQuery( '.at_sp_cover_img_slider' ).length ) {
        return;
    }

    var PORTRAIT_AR = 0.7;

    jQuery( '.at_sp_cover_img_slider' ).each( function() {
        jQuery( this ).find( 'li a > img' ).each( function() {
            var imageObj = new Image();
            var _self = this;

            imageObj.onload = function(){

                if ( imageObj.naturalHeight / imageObj.naturalWidth >= PORTRAIT_AR ) {
                    /*portrait image*/
                    jQuery( _self ).parent().parent().addClass( "portrait_prod_img" );
                }
                else {
                    jQuery( _self ).parent().parent().addClass( "make_it_cover" );
                    jQuery( _self ).parent().parent().css( "background-image", "url(" + jQuery( this ).attr( "src" ) + ")" );
                }
            };
            imageObj.src = jQuery( this ).attr( "src" );

        } );
    });
};

var handleType2ProductSliderImgHeight = function( $ ) {
    var container = jQuery( '.heritage_swp_template-type_2.woocommerce div.images' );
    if ( container.length ) {
        var topOffset = container.offset().top;
        jQuery( '.unslider img', container ).css( 'max-height', jQuery( window ).height() - topOffset );
    }
};

var handlePostRating = function($) {
    jQuery('#comments .comment-form-rating #rating').each( function() {
        jQuery( this ).hide().before( '<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>' );
    } );
    jQuery('body').on( 'click', '#comments .comment-form-rating p.stars a', function() {
        var $star = jQuery( this ),
                $rating = jQuery( this ).closest( '#respond' ).find( '#rating' ),
                $container = jQuery( this ).closest( '.stars' );

        $rating.val( $star.text() );
        $star.siblings( 'a' ).removeClass( 'active' );
        $star.addClass( 'active' );
        $container.addClass( 'selected' );

        return false;
    } )
};

function handleFooterSidebarsHeight($) {
    var container = jQuery('#footer_sidebars_inner');
    var firstSidebar = container.find('.lc_footer_sidebar:first-of-type');

    var sidebarWidthPercentage = parseInt(100 * firstSidebar.outerWidth(true) / container.width());

    var minHeight12 = 0;
    var minHeight34 = 0;
    var sidebars = container.find( '.lc_footer_sidebar' );
    switch(  sidebarWidthPercentage ) {
        case 25:
            sidebars.each(function(){
                var sHeight = jQuery( this ).outerHeight(true);
               if(  sHeight> minHeight12 ){
                   minHeight12 = sHeight;
                   minHeight34 = sHeight;
               }
            });
            break;
        case 50:
            sidebars.each(function(index, element) {
                var sHeight = jQuery( element ).outerHeight( true );
                if( index < 2 ) {
                    if( sHeight > minHeight12  ){
                        minHeight12 = sHeight;
                    }
                }
                else {
                    if ( sHeight > minHeight34 ) {
                        minHeight34 = sHeight;
                    }
                }
            });
            break;
    }

    jQuery('#footer_sidebar1,#footer_sidebar2').css('min-height', minHeight12);
    jQuery('#footer_sidebar3,#footer_sidebar4').css('min-height', minHeight34);
}

function lookTextOverImage($) {
    if (!jQuery('.lookbook_single.text_aside').length) {
        return;
    }

    jQuery('.lookbook_single.text_aside').each(function(){
        var containerRes = jQuery(this).width();
        var RESPONSIVE_VIEW_RES_MAX = 600;
        if (containerRes < RESPONSIVE_VIEW_RES_MAX) {
            jQuery(this).addClass("responsive_view");
            jQuery(this).find('.look_content_aside').addClass('lc_swp_full');
        } else {
            jQuery(this).removeClass("responsive_view");
            jQuery(this).find('.look_content_aside').removeClass('lc_swp_full');
        }
    })
}

function handleLookBooks($) {
    if (!jQuery('.lc_lookbook_slider_container').length) {
        return;
    }

    /*only for mobile*/
    if(jQuery('.lc_mobile_menu').css('display') == 'none') {
        return;
    }

    if (jQuery('.lc_lookbook_slider_container').find('.lookbook_single').first().hasClass('lookbook_single')) {
        var menu_size = jQuery('.lc_mobile_menu').height();
        if(jQuery('.lc_lookbook_slider_container').offset().top < menu_size) {
            jQuery('.lc_lookbook_slider_container').css("margin-top", menu_size);
        }
    }

}

function heritageSwpHandleType2TemplateVariationChangeImage($) {
    jQuery('.heritage_swp_template-type_2 .variations_form').on('wc_variation_form', function(event){
        jQuery(this).bind('found_variation reset_image', function(event, variation){

            var $form = jQuery(this),
                    $product = $form.closest( '.product' ),
                    $product_gallery = jQuery( '.heritage_swp_template-type_2' ).find( '.woocommerce-product-gallery' ),
                    $gallery_img = $product.find( '.flex-control-nav li:eq(0) img' ),
                    $product_img_wrap = $product_gallery.find( '.woocommerce-product-gallery__image, .woocommerce-product-gallery__image--placeholder' ).eq( 0 ),
                    $product_img = $product_img_wrap.find( '.wp-post-image' ),
                    $product_thumb_img = jQuery( '.heritage_swp_template-type_2' ).find('.heritage_swp_gallery_thumbnails').find( '.wp-post-thumb-image' ),
                    $product_link = $product_img_wrap.find( 'a' ).eq( 0 );

            if ( variation && variation.image && variation.image.src && variation.image.src.length > 1 ) {
                $product_img.wc_set_variation_attr( 'src', variation.image.src );
                $product_img.wc_set_variation_attr( 'height', variation.image.src_h );
                $product_img.wc_set_variation_attr( 'width', variation.image.src_w );
                $product_img.wc_set_variation_attr( 'srcset', variation.image.srcset );
                $product_img.wc_set_variation_attr( 'sizes', variation.image.sizes );
                $product_img.wc_set_variation_attr( 'title', variation.image.title );
                $product_img.wc_set_variation_attr( 'alt', variation.image.alt );
                $product_img.wc_set_variation_attr( 'data-src', variation.image.full_src );
                $product_img.wc_set_variation_attr( 'data-large_image', variation.image.full_src );
                $product_img.wc_set_variation_attr( 'data-large_image_width', variation.image.full_src_w );
                $product_img.wc_set_variation_attr( 'data-large_image_height', variation.image.full_src_h );

                $product_thumb_img.wc_set_variation_attr( 'src', variation.image.src );
                $product_thumb_img.wc_set_variation_attr( 'height', variation.image.src_h );
                $product_thumb_img.wc_set_variation_attr( 'width', variation.image.src_w );
                $product_thumb_img.wc_set_variation_attr( 'srcset', variation.image.srcset );
                $product_thumb_img.wc_set_variation_attr( 'sizes', variation.image.sizes );
                $product_thumb_img.wc_set_variation_attr( 'title', variation.image.title );
                $product_thumb_img.wc_set_variation_attr( 'alt', variation.image.alt );
                $product_thumb_img.wc_set_variation_attr( 'data-src', variation.image.full_src );
                $product_thumb_img.wc_set_variation_attr( 'data-large_image', variation.image.full_src );
                $product_thumb_img.wc_set_variation_attr( 'data-large_image_width', variation.image.full_src_w );
                $product_thumb_img.wc_set_variation_attr( 'data-large_image_height', variation.image.full_src_h );
                $product_thumb_img.wc_set_variation_attr( 'src', variation.image.src );

                $product_img_wrap.wc_set_variation_attr( 'data-thumb', variation.image.src );
                $product_link.wc_set_variation_attr( 'href', variation.image.full_src );
            }
            else {
                $product_img.wc_reset_variation_attr( 'src' );
                $product_img.wc_reset_variation_attr( 'width' );
                $product_img.wc_reset_variation_attr( 'height' );
                $product_img.wc_reset_variation_attr( 'srcset' );
                $product_img.wc_reset_variation_attr( 'sizes' );
                $product_img.wc_reset_variation_attr( 'title' );
                $product_img.wc_reset_variation_attr( 'alt' );
                $product_img.wc_reset_variation_attr( 'data-src' );
                $product_img.wc_reset_variation_attr( 'data-large_image' );
                $product_img.wc_reset_variation_attr( 'data-large_image_width' );
                $product_img.wc_reset_variation_attr( 'data-large_image_height' );

                $product_thumb_img.wc_reset_variation_attr( 'src' );
                $product_thumb_img.wc_reset_variation_attr( 'width' );
                $product_thumb_img.wc_reset_variation_attr( 'height' );
                $product_thumb_img.wc_reset_variation_attr( 'srcset' );
                $product_thumb_img.wc_reset_variation_attr( 'sizes' );
                $product_thumb_img.wc_reset_variation_attr( 'title' );
                $product_thumb_img.wc_reset_variation_attr( 'alt' );
                $product_thumb_img.wc_reset_variation_attr( 'data-src' );
                $product_thumb_img.wc_reset_variation_attr( 'data-large_image' );
                $product_thumb_img.wc_reset_variation_attr( 'data-large_image_width' );
                $product_thumb_img.wc_reset_variation_attr( 'data-large_image_height' );

                $product_img_wrap.wc_reset_variation_attr( 'data-thumb' );
                $gallery_img.wc_reset_variation_attr( 'src' );
                $product_link.wc_reset_variation_attr( 'href' );
            }

            window.setTimeout( function() {
                $product_gallery.trigger( 'woocommerce_gallery_init_zoom' );
                $form.wc_maybe_trigger_slide_position_reset( variation );
                jQuery( window ).trigger( 'resize' );
            }, 10 );
        })
    })
}

function heritageSwpHandleProductsMasonry($) {

    var grids = jQuery( '.lc_swp_prods_grid_container' );
    if ( !grids.length ) {
        return;
    }

    var  RATIO = 0.8;
    var  RATIO_1X = 2;
    grids.imagesLoaded(function() {
        $.each(grids, function(){
            var $grid = jQuery( this );
            var gap_width = $grid.data( "gapwidth" );
            var container_width = $grid.width();
            var bricks_on_row = $grid.data( "bricksonrow" );

            var container_outer_width = $grid.outerWidth();
            var bricks_on_row_responsive = getMasonryBricksOnRow( $, bricks_on_row, container_outer_width, {1 : 480, 2 : 979, 3 : 1200} );
            var brick_width;
            var brick_2x_width;
            var brick_2x_height;

            var user_ratio = $grid.data("ar");
            if ("ar16_9" == user_ratio) {
                RATIO = 0.5625;
            }


            if( bricks_on_row_responsive === 1 ){
                RATIO = 1;
                brick_width = container_width;
                brick_2x_width = brick_width;
                brick_3x_width = brick_width;
            }
            else {
                brick_width = Math.round((container_width - ((bricks_on_row_responsive - 1) * gap_width)) / bricks_on_row_responsive);
                brick_2x_width = Math.round(2 * brick_width + gap_width);
                brick_3x_width = Math.round(3 * brick_width + 2 * gap_width);
            }

            var brick_height = Math.round(brick_width * RATIO);
            brick_2x_height = Math.round(brick_2x_width * RATIO);
            brick_3x_height = Math.round(brick_3x_width * RATIO);

            jQuery( '.at_swp_single_grid_prod', $grid ).each( function() {
                if (bricks_on_row_responsive === 1) {
                    jQuery(this).addClass("bricks_responsive1");
                } else {
                    jQuery(this).removeClass("bricks_responsive1");
                }

                if ( ((bricks_on_row_responsive === 2) || (bricks_on_row_responsive === 3)) 
                    && container_outer_width < 1200)  {
                    jQuery(this).addClass("bricks_responsive2_3");
                } else {
                    jQuery(this).removeClass("bricks_responsive2_3");
                }

                if (jQuery(this).hasClass('width_brick_3x')) {
                    jQuery(this).css('width', brick_3x_width);
                } else {
                    if (jQuery(this).hasClass('width_brick_2x')) {
                        jQuery(this).css('width', brick_2x_width);
                    } else {
                        jQuery(this).css('width', brick_width);
                    }
                }

                if (jQuery(this).hasClass('height_brick_3x')) {
                    jQuery(this).css('height', brick_3x_height);
                } else {
                    if (jQuery(this).hasClass('height_brick_2x')) {
                        jQuery(this).css('height', brick_2x_height);
                    }
                    else {
                        jQuery(this).css('height', brick_height);
                    }
                }

                jQuery(this).css('margin-bottom', gap_width);
            });

            $grid.masonry( {
                columnWidth  : brick_width,
                itemSelector : '.at_swp_single_grid_prod',
                gutter       : gap_width
            } );
            $grid.fadeTo( "400", 1 );
        });
    });
}

function handleFullScreenSearch () {
    var $ = jQuery;
    var searching = false;
    var $container = jQuery( '#lc_global_search' );
    var $triggerSearch = jQuery( '#search-submit', $container );
    jQuery( '#search-word', $container ).on('focus click', function(){
        jQuery('.lc_global_search_inner', $container).addClass('active');
    });

    function doSearch ( searchTerm ) {
        var ajax_url = jQuery( '#search-form', $container ).data( 'ajaxAction' );
        if ( !ajax_url ) {
            return true;
        }
        $.ajax( {
            'url'        : ajax_url,
            'type'       : 'POST',
            'data'       : {
                'action'      : 'heritage_swp_ajax_search',
                'search_term' : searchTerm
            },
            'beforeSend' : function() {
                searching = true;
                $container.addClass('loading');
                jQuery( '.search_results', $container ).empty();
            },
            'success'    : function( response ) {
                //make sure display right results
                if ( searchTerm == jQuery( '#search-word', $container ).val().trim() ) {
                    searching = false;
                    response = JSON.parse( response );
                    if ( typeof response.posts !== "undefined" ) {
                        jQuery( '.search_results', $container ).html( response.posts );
                        var height = 0;
                        jQuery( '.search_results', $container ).find( '.heritage_swp_post' ).each( function() {
                            var selfHeight = jQuery( this ).outerHeight();
                            if ( height < selfHeight ) {
                                height = selfHeight;
                            }
                        } );
                        jQuery( '.search_results', $container ).find( '.heritage_swp_post' ).css( 'height', height );
                    }
                }
            },
            'complete'   : function() {
                if ( searchTerm == jQuery( '#search-word', $container ).val().trim() ) {
                    $container.find( '.search_dropdown' ).removeClass( 'loading' );
                    searching = false;
                    $container.removeClass( 'loading' );
                }
            },
            'error'      : function( jqXHR, textStatus, errorThrown ) {
                jQuery( '.search_results', $container ).html( errorThrown );
                if ( searchTerm == jQuery( '#search-word', $container ).val().trim() ) {
                    $container.find( '.search_dropdown' ).removeClass( 'loading' );
                    searching = false;
                }
            }
        } );
    }

    jQuery( '#search-form', $container ).on( 'submit', function( event ) {
        var ajax_url = jQuery( this ).data( 'ajaxAction' );
        if ( !ajax_url ) {
            return true;
        }
        event.preventDefault();
        var searchTerm = jQuery( this ).find( '#search-word' ).val().trim();
        if ( !searchTerm ) {
            alert( 'Please enter a search term' );
            return false;
        }
        doSearch( searchTerm );
        return false;
    } );
    jQuery( '#search-word', $container ).on( 'keyup', function( event ) {
        event.preventDefault();
        var searchTerm = jQuery( this ).val().trim();
        if ( searchTerm.length >= 3 ) {
            doSearch( searchTerm.trim() );
        }
        else {
            jQuery( '.search_results', $container ).empty();
        }

    } );
}
