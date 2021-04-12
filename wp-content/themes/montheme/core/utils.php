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