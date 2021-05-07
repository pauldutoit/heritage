<?php


function HERITAGE_get_user_logo_img() {
    return HERITAGE_get_theme_option('heritage_theme_general_options', 'lc_custom_logo');
}

//function HERITAGE_get_default_color_scheme(){
//
//    $color_scheme = HERITAGE_get_theme_option('heritage_theme_general_options', '');
//    if(!empty($color_scheme)){
//        return $color_scheme;
//    }
//    return 'black_on_white';
//}

function HERITAGE_get_menu_style(){
    $menu_style = HERITAGE_get_theme_option('heritage_theme_general_options', 'lc_menu_style');

    if(empty($menu_style)){
        $menu_style = 'creative_menu';
    }

    return $menu_style;
}

function HERITAGE_is_sticky_menu() {
    $sticky_menu = HERITAGE_get_theme_option('heritage_theme_general_options', 'lc_enable_sticky_menu');

    if (empty($sticky_menu) || ("enabled" == $sticky_menu)) {
        return true;
    }

    return false;
}

function HERITAGE_is_back_to_top_enabled() {
    $back_to_top = HERITAGE_get_theme_option('heritage_theme_general_options', 'lc_back_to_top');

    if (empty($back_to_top) || ("disabled" == $back_to_top)) {
        return false;
    }
    return true;
}

function HERITAGE_is_login_popup_enabled() {
    $enabled = HERITAGE_get_theme_option( 'heritage_theme_general_options', 'lc_login_popup_enable' );
    if ( empty( $enabled ) ) {
        $enabled = true;
    }
    return $enabled == 'yes';
}

function HERITAGE_get_products_view_mode(){
    $view_modes = array('list', 'grid');
    if(isset($_REQUEST['mode'])){
        $view_mode = sanitize_text_field($_REQUEST['mode']);
        if(in_array($view_mode, $view_modes)){
            return $view_mode;
        }
    }

    $view_mode = isset($_COOKIE['heritage_products_view_mode']) ? sanitize_text_field($_COOKIE['heritage_products_view_mode']) : '';
    if(in_array($view_mode, $view_modes)){
        return $view_mode;
    }

    $view_mode = HERITAGE_get_theme_option( 'heritage_theme_shop_options', 'lc_products_view_mode' );

    if ( !in_array( $view_mode, $view_modes ) ) {
        return 'grid';
    }

    return $view_mode;
}

function HERITAGE_get_products_per_row(){
    if ( isset( $_REQUEST['products_per_row'] ) ) {
        $ppr = intval( $_REQUEST['products_per_row'] );
        if ( 3 <= $ppr && $ppr <= 5 ) {
            return  $ppr;
        }
    }

    $ppr_in_cookie = isset( $_COOKIE['heritage_products_per_row'] ) ? intval( $_COOKIE['heritage_products_per_row'] ) : 0;
    if ( 3 <= $ppr_in_cookie && $ppr_in_cookie <= 5 ) {
        return $ppr_in_cookie;
    }

    $products_per_row = HERITAGE_get_theme_option( 'heritage_theme_shop_options', 'lc_products_per_row' );

    if ( !intval( $products_per_row ) ) {
        $products_per_row = 4;
    }

    return $products_per_row;
}

function HERITAGE_get_default_color_scheme() {
    /* pas encore implementé */
    //$color_scheme = HERITAGE_get_theme_option('heritage_theme_general_options', 'lc_default_color_scheme');
//    if (!empty($color_scheme)) {
//        return $color_scheme;
//    }
    return  'black_on_white';
}

