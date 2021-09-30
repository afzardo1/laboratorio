<?php
	namespace Back\Modulos\Laboratorio\Fabricantes;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Comum\Empresas\Empresas;

	use PDO;
	use PDOException;
	/**
 	 * Esta classe contendo rotinas dos Fabricantes
 	 * Todas as requisições dos fabricantes passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Fabricantes
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Fabricantes {
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
	 	 * Inicia modulo
	 	 *
		 * @return mixed
	 	 * @access public
	 	*/
		public static function Inicia(){
			include_once( 'Fabricantes.sql.php' );

			self::$RotSql[ 'GetRegFabr' ] = $GetRegFabr;
			
			self::$RotSql[ 'DuplRegFabr' ] = $DuplRegFabr;
			self::$RotSql[ 'InstRegFabr' ] = $InstRegFabr;
			self::$RotSql[ 'UpdtRegFabr' ] = $UpdtRegFabr;

			self::$RotSql[ 'DeleRegFabr' ] = $DeleRegFabr;
			
			self::$RotSql[ 'GetRegFabrTerce' ] = $GetRegFabrTerce;

			self::$Conn = Core::Conecta();
		}

		/**
	 	 * Retorna Todos Dados da Tenant.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetTenanFabr( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Tenant::GetRegTenanTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados da empresa.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetEmpreFabr( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Empresas::GetEmpreTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetFabr( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Fabricantes::Inicia();

				if ( $Parametros[ 'fabr_cada_tenan' ] == 0 || $Parametros[ 'fabr_cada_tenan' ] == '' ){
					$Parametros[ 'fabr_cada_tenan' ] = '%%';
				};

				if ( $Parametros[ 'fabr_cada_empre' ] == 0 || $Parametros[ 'fabr_cada_empre' ] == '' ){
					$Parametros[ 'fabr_cada_empre' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegFabr' ] );

					$Prepara->bindValue( ':fabr_cada_refe', $Parametros[ 'fabr_cada_nome_docu_refe' ] );
					$Prepara->bindValue( ':fabr_cada_docu', $Parametros[ 'fabr_cada_nome_docu_refe' ] );
					$Prepara->bindValue( ':fabr_cada_nome', $Parametros[ 'fabr_cada_nome_docu_refe' ] );
					$Prepara->bindValue( ':fabr_cada_tenan', $Parametros[ 'fabr_cada_tenan' ] );
					$Prepara->bindValue( ':fabr_cada_empre', $Parametros[ 'fabr_cada_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						if ( isset( $input['fabr_cada_boto'] ) == false){
							$Botao = '
								<button id="EditBtnFabr" type="button" class="btn btn-secondary" title="ALTERAR"><i class="fas fa-edit"></i></button>
								<button id="DeleBtnFabr" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-minus"></i></button>
							';
						};

						return array(
							'fabr_cada_boto' => $Botao,
							'fabr_cada_iden' => $input['fabr_cada_iden'],
							'fabr_cada_refe' => $input['fabr_cada_refe'],
							'fabr_cada_docu' => $input['fabr_cada_docu'],
							'fabr_cada_nome' => $input['fabr_cada_nome'],
							'fabr_cada_tenan' => $input['fabr_cada_tenan'],
							'fabr_cada_empre' => $input['fabr_cada_empre'],
							'fabr_cada_stat' => $input['fabr_cada_stat'],
						);
					}, $Retorno );

					self::$Conn->commit();
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Fabricantes',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Fabricantes',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Fabricantes',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Fabricantes com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
		
		/**
		 * Salva quando for inclusão ou alteração.
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return integer Ultimo id
		 * @access public
		*/
		public static function SetSalvFabr( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 52,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 53,
				);
				
				$PermiAlter = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenFabr' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenFabr' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};

				Fabricantes::Inicia();

				try {
					$status = 'duplicado';
					$descricao = 'Inclusão de Fabricante CNPJ Duplicado';
					$listreg = 'Registro CNPJ '.$Parametros[ 'DocFabr' ].' duplicado';

					if ( $Parametros[ 'IdenFabr' ] == 'Automatico' ){
						$Parametros[ 'IdenFabr' ] = 0;
					};

					self::$Conn->beginTransaction();

					$DublSele = self::$Conn->prepare( self::$RotSql[ 'DuplRegFabr' ] );
					$DublSele->bindValue( ':fabr_cada_docu', $Parametros[ 'DocFabr' ] );
					$DublSele->bindValue( ':fabr_cada_iden', $Parametros[ 'IdenFabr' ] );
					$DublSele->execute();
					
					$DublReto = $DublSele->fetchAll( PDO::FETCH_ASSOC );
					if( $DublReto[0][ 'fabr_cada_iden' ] == 0 ){
						if ( $Parametros[ 'IdenFabr' ] == 0 ){
							$descricao = 'Inclusão de Fabricantes';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegFabr' ] );
						} else {
							$descricao = 'Alteração de Fabricantes';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegFabr' ] );
							$Prepara->bindValue( ':fabr_cada_iden', $Parametros[ 'IdenFabr' ] );
						};
						
						$Prepara->bindValue( ':fabr_cada_refe', Core::UpperCase( $Parametros[ 'RefeFabr' ] ) );
						$Prepara->bindValue( ':fabr_cada_docu', $Parametros[ 'DocFabr' ] );
						$Prepara->bindValue( ':fabr_cada_nome', Core::UpperCase( $Parametros[ 'NomeFabr' ] ) );
						$Prepara->bindValue( ':fabr_cada_tenan', $Parametros[ 'TenanFabr' ] );
						$Prepara->bindValue( ':fabr_cada_empre', $Parametros[ 'EmpreFabr' ] );
						$Prepara->bindValue( ':fabr_cada_stat', $Parametros[ 'StatFabr' ] );

						$Prepara->execute();
					
						if ( $descricao == 'Inclusão de Fabricantes' ){
							$Retorno = self::$Conn->lastInsertId().' incluido';
							$Parametros[ 'IdenFabr' ] = self::$Conn->lastInsertId();
						} else {
							$Retorno = $Parametros[ 'IdenFabr' ].' alterado';
						};

						self::$Conn->commit();
						
						$status = 'sucesso';
						$listreg = 'Registro ID '.$Retorno;

					};

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Fabricantes',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Fabricantes',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Fabricantes com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Exclui registro.
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return integer Ultimo id
		 * @access public
		*/
		public static function SetDeleFabr( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {		
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 54,
				);
				
				$PermiDele = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				if ( $PermiDele[ 'status' ] == 'restrito' ){
					return json_encode( $PermiDele	);
				};

				Fabricantes::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'DeleRegFabr' ] );
					$Prepara->bindValue( ':fabr_cada_iden', $Parametros[ 'IdenFabr' ] );

					$Prepara->execute();
					
					$Retorno = $Parametros[ 'IdenFabr' ].' excluido';
						
					self::$Conn->commit();

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Fabricantes',
						'status' => 'sucesso',
						'descricao' => 'Exclusão de Fabricantes',
						'listreg' => 'Registro ID '.$Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Fabricantes',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Fabricantes com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados Para Terceiros.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		 public static function GetRegFabrTerce( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Fabricantes::Inicia();

				try {
					if ( $Parametros[ 'fabr_cada_tenan' ] == 0 || $Parametros[ 'fabr_cada_tenan' ] == '' ){
						$Parametros[ 'fabr_cada_tenan' ] = '%%';
					};
	
					if ( $Parametros[ 'fabr_cada_empre' ] == 0 || $Parametros[ 'fabr_cada_empre' ] == '' ){
						$Parametros[ 'fabr_cada_empre' ] = '%%';
					};

					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegFabrTerce' ] );

					$Prepara->bindValue( ':fabr_cada_stat', $Parametros[ 'fabr_cada_stat' ] );
					$Prepara->bindValue( ':fabr_cada_tenan', $Parametros[ 'fabr_cada_tenan' ] );
					$Prepara->bindValue( ':fabr_cada_empre', $Parametros[ 'fabr_cada_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						return array(
							'id' => $input['fabr_cada_iden'],
							'text' => $input['fabr_cada_nome'],
						);
					}, $Retorno );

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Fabricantes',
						'status' => 'sucesso',
						'descricao' => 'Resultado Terceiro Fabricantes',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Fabricantes',
						'status' => 'invalido',
						'descricao' => 'Terceiro Fabricantes com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>