<?php

if (!class_exists('WalkerNavMenu')) {
    class WalkerNavMenu extends Walker_Nav_Menu {

        public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
            $classes = empty($item->classes) ? array() : (array) $item->classes;

            if (0 == $depth) {
                $classes[] = 'menu-item-swp';
            }

            if ($item->customImageUrl) {
                $classes[] = 'swp-menu-item-with-image';
            }

            $item->classes = $classes;
            parent::start_el($output, $item, $depth, $args, $id);

            if ($item->customImageUrl) {
                /*inject data attr after menu id attr*/
                $replace = 'id="menu-item-' . $item->ID . '" data-menuitemimg="' . esc_attr($item->customImageUrl) . '"';
                $placeholder = 'id="menu-item-'. $item->ID .'"';
                $output = str_replace($placeholder, $replace, $output);
            }
        }
    }
}

?>