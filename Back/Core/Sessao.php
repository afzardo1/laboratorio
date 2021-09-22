<?php
    namespace Back\Core;

    use Back\Core\Core;

    /**
     * Esta classe tem o objetivo de manipular
     * as sessões utilizadas na aplicação.
     *
     * @package    Sessao
     * @author     Alexandre Farinelli Zardo
     * @copyright  TK TELECOM
    */
    final class Sessao {
        /**
         * Método implementado para alterar configurações
         * e inicializar atributos da classe.
         *
         * @return void
         * @access private
        */
        public function __construct(){
            if ( session_status() !== PHP_SESSION_ACTIVE ) {
                // altera o tempo de expiração do cache
                if ( Core::config( 'sess_cache_expire' ) !== false )
                    session_cache_expire( Core::config('sess_cache_expire') );

                if ( Core::config( 'sess_cookie_params' ) !== false ){
                    session_set_cookie_params( Core::config('sess_cookie_params') );
                    ini_set( 'session.gc_maxlifetime', Core::config('sess_cookie_params') );
                };
                
                // define nome para o grupo da sessão
                session_name( Core::config( 'sess_name' ) );

                // inicializa a sessão
                session_start();

                // regenera o id da sessão
                if ( Core::config( 'sess_regenerate' ) )
                    session_regenerate_id(true);
            };
        }

        /**
         * Método implementado para checar
         * se asessão esta ativa.
         *
         * @param  $name  - o nome do indice da sessão
         * @return boolean
         * @access public
        */
        public static function Chk( $name ) {
            if ( Sessao::Get( $name ) == false ) { 
				if ( empty( session_id() ) ) {
                    Sessao::Dst();
                };
                
                return json_encode( array(
                    'sistema' => Core::config( 'system_apelido' ),
                    'modulo' => 'menu',
                    'status' => 'expirado',
                    'descricao' => 'Sessao Expirada',
                    'listreg' => '',
                ));
			} else {
				return json_encode( array(
                    'sistema' => Core::config( 'system_apelido' ),
                    'modulo' => 'menu',
                    'status' => 'aberto',
                    'descricao' => 'Sessao Aberta',
                    'listreg' => '',
                ));
			};
		}

        /**
         * Método implementado para definir um valor
         * a uma sessão e criptografá-lo.
         *
         * @param  $name  - o nome do indice da sessão
         * @param  $value - o valor que será armazenado na sessão
         * @return boolean
         * @access public
        */
        public static function Set( $name, $value ){
            // verifica se os valores foram passados
            if ( empty($name) )
                return false;

            // verifica se o valor passado é um array e monta sua estrutura
            if ( is_array($value) ){
                foreach ( $value as $v ){
                    $_SESSION[$name][] = base64_encode( $v );
                };
            } else {
                $_SESSION[$name] = base64_encode( $value );
            };

            return true;
        }

        /**
         * Método implementado para retornar o valor de
         * uma determinada dessão.
         *
         * @param  $name - o indice do array $_SESSION
         * @param  $p    - posição em que o valor está caso seja array
         * @return mixed
         * @access public
        */
        public static function Get( $name, $p = false ){
            // verifica se o nome foi passado
            if ( empty($name) || !isset($_SESSION[$name]) )
                return false;

            // verifica se quer pegar um valor de dentro do array
            if ( is_array($_SESSION[$name]) && $p === false ){
                // cria um array para guardar as informações puras
                $session = array();

                foreach ( $_SESSION[$name] as $k => $v ) {
                    $session[$name][$k] = base64_decode( $v );
                }

                // retorna o array
                return (array) $session;
            } else if ( is_array($_SESSION[$name]) && $p !== false ){
                return isset( $_SESSION[$name][$p] ) ?  base64_decode( $_SESSION[$name][$p] ) : false;
            }else{
                return isset( $_SESSION[$name] ) ?  base64_decode( $_SESSION[$name] ) : false;
            };
        }

        /**
         * Método implementado para excluir uma
         * sessão existente.
         * 
         * @return boolean
         * @access public
        */
        public static function delete($name) {
            if ( isset( $_SESSION[$name] ) )
                unset( $_SESSION[$name] );

            return true; 
        }
        
        /**
         * Método implementado para destruir o array $_SESSION
         * junto com o cookie que armazena o id da
         * sessão no pc do usuário.
         *
         * @return void
         * @access public
        */
        public static function Dst( $name = '' ){
            // limpa o array superglobal
            unset( $_SESSION );

            // remove o cookie da sessão
            if ( isset( $_COOKIE[ session_name() ] ) )
                setcookie( session_name(), null, -1, '/' );

            // destrói a sessão
            session_destroy();
        }

        /**
         * Método implementado para retornar as propriedades
         * da classe em formato de string.
         *
         * @return string
         * @access public
        */
        public function __toString(){
            return ( string ) "<pre>".print_r( $this,true ).print_r( $_SESSION,true )."</pre>";
        }
    }
?>