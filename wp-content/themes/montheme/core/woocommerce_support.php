<?php


add_theme_support('woocommerce');


/**
 * Unhook the Woocommerce wrappers
 */

remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);

remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);
remove_action('woocommerce_after_main_content', 'woocommerce_breadcrumb', 20);

// add HERITAGE wrapper
add_action('woocommerce_before_main_content', 'HERITAGE_woocommerce_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'HERITAGE_woocommerce_wrapper_end', 10);

// view mode
add_action('init', 'HERITAGE_set_product_view_mode');
add_action('woocommerce_before_shop_loop', 'HERITAGE_show_grid_mode', 10);
add_action( 'woocommerce_before_shop_loop', 'HERITAGE_products_per_row_buttons', 25 );

// cart
add_action('woocommerce_cart_actions', 'HERITAGE_add_cart_buttons');

//minicart
add_action('woocommerce_widget_cart_item_quantity', 'HERITAGE_minicart_quantity', 10, 3);


//product image
add_action('woocommerce_after_product_images','HERITAGE_after_product_images');

function HERITAGE_woocommerce_wrapper_start() {

        /*todo: check product page type; if default => boxed*/
        $boxed_class = "lc_swp_boxed";
        if (is_product()) {
            if( /*ARTEMIS_SWP_get_product_page_template() != 'default'
                && ARTEMIS_SWP_get_product_page_template() != 'type_3'*/ true) { // diférente template (pas encore proposé)
                $boxed_class = "lc_swp_full";
            }
        }
        if (is_shop()) {
            $boxed_class = 'lc_swp_full'; //ARTEMIS_SWP_get_shop_width_class();
        }

        echo '<div class="lc_content_full '.esc_attr($boxed_class). ' lc_big_content_padding">';
}

function HERITAGE_woocommerce_wrapper_end() {
    echo '</div>';
}

function HERITAGE_show_grid_mode() {
    $grid_mode = HERITAGE_get_products_view_mode();
    ?>
    <div class="at_product_list_mode_container">
        <form id="at_product_list_mode_form">
            <input type="hidden" id="at_product_view_mode" name="mode" value="<?php esc_attr($grid_mode) ?>">
            <a data-mode="grid" class="at_product_list_mode grid <?php echo ( 'grid' == $grid_mode ) ? 'active' : '' ?>">
                <i class="fa fa-grid-view"></i>
            </a>
            <a data-mode="list" class="at_product_list_mode list <?php echo ( 'list' == $grid_mode ) ? 'active' : '' ?>">
                <i class="fa fa-list-view"></i>
            </a>
            <?php
            // Keep query string vars intact
            foreach ( $_GET as $key => $val ) {
                if ( 'mode' === $key || 'submit' === $key ) {
                    continue;
                }
                if ( is_array( $val ) ) {
                    foreach ( $val as $innerVal ) {
                        echo '<input type="hidden" name="' . esc_attr( $key ) . '[]" value="' . esc_attr( $innerVal ) . '" />';
                    }
                } else {
                    echo '<input type="hidden" name="' . esc_attr( $key ) . '" value="' . esc_attr( $val ) . '" />';
                }
            }
            ?>
        </form>
    </div>
    <?php
}

function HERITAGE_set_product_view_mode() {
    if ( isset( $_REQUEST['mode'] ) ) {
        $grid_mode = intval( $_REQUEST['mode'] );
        if ( ! in_array( $grid_mode, array('grid', 'list') ) ) {
            $grid_mode = 'grid';
        }
        setcookie( 'heritage_products_view_mode', $grid_mode );
    }
}

function HERITAGE_products_per_row_buttons( ) {
    $ppr = HERITAGE_get_products_per_row(); ?>
    <div class="at_products_per_row_container">
        <form id="at_products_per_page_form" method="get">
            <input type="hidden" id="at_products_per_row" name="products_per_row" value="<?php echo esc_attr($ppr) ?>">
            <?php esc_attr_e('Show Grid:', 'heritage') ?>
            <a href="#" data-per_page="3" class="at_products_per_row_item <?php echo esc_attr($ppr == 3 ? 'active' : ''); ?>">3</a>
            <a href="#" data-per_page="4" class="at_products_per_row_item <?php echo esc_attr($ppr == 4 ? 'active' : ''); ?>">4</a>
            <a href="#" data-per_page="5" class="at_products_per_row_item <?php echo esc_attr($ppr == 5 ? 'active' : ''); ?>">5</a>
            <?php
            // Keep query string vars intact
            foreach ( $_GET as $key => $val ) {
                if ( 'products_per_row' === $key || 'submit' === $key ) {
                    continue;
                }
                if ( is_array( $val ) ) {
                    foreach ( $val as $innerVal ) {
                        echo '<input type="hidden" name="' . esc_attr( $key ) . '[]" value="' . esc_attr( $innerVal ) . '" />';
                    }
                } else {
                    echo '<input type="hidden" name="' . esc_attr( $key ) . '" value="' . esc_attr( $val ) . '" />';
                }
            }
            ?>
        </form>
    </div>
    <?php
}

/**
 * Cart
 */

function HERITAGE_add_cart_buttons() {
    $emptyCartUrl = add_query_arg( 'empty-cart', 1, wc_get_cart_url() ); ?>
    <a class="button alt at_clear_cart" href="<?php echo esc_url( $emptyCartUrl ) ?>">
        <?php echo esc_html__( 'Clear Shopping Cart', 'heritage' ) ?>
    </a>
    <?php
}

/**
 * Minicart
 */

if(!function_exists('HERITAGE_minicart_quantity')){

    function HERITAGE_minicart_quantity($value, $cart_item, $cart_item_key){
        $output = '<dl>' .
            '<dt>' . esc_html__('Qty', 'heritage').  ':</dt>' .
            '<dd>' . sprintf('%s', $cart_item['quantity']).  '</dd>' .
            '</dl>';
        return $output;
    }
}

function HERITAGE_after_product_images() {
    global $post, $product, $woocommerce;
    ?>
    <div class="artemis_swp_gallery_thumbnails clearfix">
    <?php
    $attachment_ids = $product->get_gallery_image_ids();

    if ( has_post_thumbnail() ) {
        $props = wc_get_product_attachment_props( get_post_thumbnail_id(), $post );
        $image = wp_get_attachment_image( get_post_thumbnail_id(), apply_filters( 'single_product_small_thumbnail_size', 'thumbnail' ), 0 );

        echo apply_filters(
            'woocommerce_single_product_image_thumbnail_html',
            sprintf(
                '<a href="%s" class="%s" title="%s" class="wp-post-thumb-image">%s</a>',
                esc_url( $props['url'] ),
                'artemis_swp_gallery_thumbnail active',
                esc_attr( $props['caption'] ),
                $image
            ),
            $post->ID
        );
    } else {
        $placeholder_src = wc_placeholder_img_src();
        printf( '<a href="%s" class="%s" title="%s" ><img src="%s" alt="%s" class="wp-post-thumb-image"/></a>',
            $placeholder_src,
            'artemis_swp_gallery_thumbnail active',
            esc_html__( 'Awaiting product image', 'heritage' ),
            $placeholder_src,
            esc_html__( 'Awaiting product image', 'heritage' ) );
    }
    if ( $attachment_ids ) {
        foreach ( $attachment_ids as $attachment_id ) {

            $props = wc_get_product_attachment_props( $attachment_id, $post );

            if ( ! $props['url'] ) {
                continue;
            }

            echo apply_filters(
                'woocommerce_single_product_image_thumbnail_html',
                sprintf(
                    '<a href="%s" class="%s" title="%s">%s</a>',
                    esc_url( $props['url'] ),
                    'artemis_swp_gallery_thumbnail',
                    esc_attr( $props['caption'] ),
                    wp_get_attachment_image( $attachment_id, apply_filters( 'single_product_small_thumbnail_size', 'thumbnail' ), 0 )
                ),
                $attachment_id,
                $post->ID,
                ''//esc_attr( $image_class )
            );
        }


    }
    ?></div><?php
}







