<?php
    namespace Back\Core;

    use Exception;
    
    /**
     * Esta classe serve apenas para direcionar as exceções
     * para o manipulador de erros, tratando mensagens
     * desconhecidas.
     * 
     *
     * @package    CoreException
     * @author     Alexandre Farinelli Zardo
 	 * @copyright  TK TELECOM
    */
    class CoreException extends Exception {
        public function __construct( $message, $code ){
    	    if ( empty( $message ) ) {
    		   $message = " Unknow error : " . $message;
    	    };
            parent::__construct( $message, $code );
        }
    }
?>