<?php

function HERITAGE_get_page_custom_menu_style(&$page_logo, &$menu_bar_bg, &$menu_txt_col, &$above_menu_bg, &$above_menu_txt_col) {
    $post_id = get_the_ID();

    $page_logo = $menu_bar_bg = $menu_txt_col = $above_menu_bg = $above_menu_txt_col = "";

    $page_logo 	= get_post_meta($post_id, 'lc_swp_meta_page_logo', true);
    $menu_bar_bg = get_post_meta($post_id, 'lc_swp_meta_page_menu_bg', true);
    $menu_txt_col = get_post_meta($post_id, 'lc_swp_meta_page_menu_txt_color', true);
    $above_menu_bg = get_post_meta($post_id, 'lc_swp_meta_page_above_menu_bg', true);
    $above_menu_txt_col = get_post_meta($post_id, 'lc_swp_meta_page_above_menu_txt_color', true);

    return (!empty($menu_bar_bg) ||
    !empty($menu_txt_col) ||
    !empty($above_menu_bg) ||
    !empty($above_menu_txt_col));
}

/*
 * UTILISÉ POUR L'AFFICHAGE DE LA RECHERCHE
 *
 * */

function HERITAGE_get_tags() {
    $tags = array();
    if( true /*ARTEMIS_SWP_is_woocommerce_active()*/ ) {
        $args = array(
            'taxonomy' => 'product_tag',
            'echo'     => false,
            'orderby'  => 'count',
            'order'    => 'DESC',
            'number'   => 4
        );
        $tags = get_terms($args);
    }

    if( !count($tags) ){
        $args = array(
            'taxonomy' => 'post_tag',
            'echo'     => false,
            'orderby'  => 'count',
            'order'    => 'DESC',
            'number'   => 4
        );
        $tags = get_terms($args);
    }

    return $tags;
}