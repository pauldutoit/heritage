<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'jaWbSTMQ{r#eQ^)>~0E[Q85Og;q>*gULP&/q>u{ ]^`ED^hx(BJh**24vO}XE#:G' );
define( 'SECURE_AUTH_KEY',  'e|20(Wf(NE5qyoU9T?Kn,Y2Pb d=h%0H|&nZt6w|yxM?28i$J<WNc;_m]ih-S?rj' );
define( 'LOGGED_IN_KEY',    'gHlY!D[Ass:=^qKg`jF1V2BoW14;ti5[a#`3I,qa4w$P8 ~MeF9HC:g[yS4_4HT~' );
define( 'NONCE_KEY',        'QYZ>WnHoO5_i!{tj2sH#&@^me5v>01e~VzfkgVD5D&.]w?M4i/]=KO8i~2cz(q>i' );
define( 'AUTH_SALT',        'y2y{#zWE#(/A)SdQ%l/#J~F]<<O1ZA5%(1)ziPi~O~cxk5zAp(oD]~62|-uYE!5R' );
define( 'SECURE_AUTH_SALT', 'i3]!0EoK](br=7JUzpx[;TXY^3Ji][U3GvQ,otOU%ei0L24%@|mU6%=!qxfudJ8n' );
define( 'LOGGED_IN_SALT',   '3P[twvX?]%sG,gPZ`[oA|X=ZGT#4wnELZ4_l{#P5N))N?3+ HFXW^Vt%LM5/[=z(' );
define( 'NONCE_SALT',       'h<jg+;gCjA|GwDMh?mY]-e-_|>xC`eX$fIZg(O1n!?{QV/L JcB_A/SSzY%&N5q[' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
