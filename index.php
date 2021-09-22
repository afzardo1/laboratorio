<?php
    include 'Back/Dependencias/vendor/autoload.php';
    
    use Back\Core\Core;
    
    spl_autoload_register( function ($class){
        if ( strpos( $class, 'Core' ) > 0){
            include  str_replace( '\\', '/', $class ).'.php';
        } else {
            include  str_replace( '\\', '/', $class ).'.php';
        }
    } );

    echo Core::Rota( $_SERVER[ 'PHP_SELF' ] );
?>