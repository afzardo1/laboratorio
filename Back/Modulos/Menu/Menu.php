<?php
	namespace Back\Modulos\Menu;

	use Back\Core\Core;
	use PDO;
	use PDOException;
	/**
 	 * Esta classe contendo rotinas de Menu
 	 * Todas as requisições de menu passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Menu
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Menu {
		/**
	 	 * Armazena a coneção com o banco de dados.
	 	 *
	 	 * @access private
	 	 * @var    object
	 	*/		
		private static $Conn = array();

		/**
	 	 * Rotinas Sql do arquivo NOME DA CLASSE.sql.php.
	 	 *
	 	 * @access private
	 	 * @var    object
	 	*/		
		private static $RotSql = array();

		/**
	 	 * Inicia modulo de usuarios
	 	 *
		 * @return mixed
	 	 * @access public
	 	*/
		public static function Inicia(){
			include_once( 'Menu.sql.php' );

			self::$RotSql[ 'GetRegMenu' ] = $GetRegMenu;

			self::$Conn = Core::Conecta();
		}

		/**
	 	 * Retorna Todos Dados de Permissões dos usuários.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetMenuSist( $Parametros ){
			Menu::Inicia();

			try {
				self::$Conn->beginTransaction();

				$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegMenu' ] );

				$Prepara->bindValue( ':usua_aces_cada_usua_iden', Core::Sessao()::Get( $Parametros ) );

				$Prepara->execute();
				
				$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
					
				self::$Conn->commit();
					
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Menu',
					'status' => 'sucesso',
					'descricao' => 'Resultado Menu Sistema',
					'listreg' => $Retorno,
				));
			} catch ( PDOException $e ) {
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Menu',
					'status' => 'invalido',
					'descricao' => 'Menu Sistema com erro </br> '.$e->getMessage(),
					'listreg' => false,
				));
			};
		}
	}
?>