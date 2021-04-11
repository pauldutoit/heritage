<?php

function HERITAGE_setup_admin_menus()
{

    add_theme_page(
        'Heritage Theme Settings', /* page title*/
        'Heritage Settings',  /* menu title */
        'administrator',    /*capability*/
        'heritage_menu_page',  /*menu_slug*/
        'HERITAGE_option_page_settings'  /*function */
    );
}
add_action("admin_menu", "HERITAGE_setup_admin_menus");

