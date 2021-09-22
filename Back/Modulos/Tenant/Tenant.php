<?php
	namespace Back\Modulos\Tenant;

	use Back\Core\Core;
	use PDO;
	use PDOException;
	/**
 	 * Esta classe contendo rotinas da tenant
 	 * Todas as requisições da tenant passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Tenant
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Tenant {
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
			include_once( 'Tenant.sql.php' );
			
			self::$RotSql[ 'GetRegTenan' ] = $GetRegTenan;
			self::$RotSql[ 'GetRegUsuaTenan' ] = $GetRegUsuaTenan;
			
			self::$RotSql[ 'DuplRegTenan' ] = $DuplRegTenan;
			self::$RotSql[ 'InstRegTenan' ] = $InstRegTenan;
			self::$RotSql[ 'UpdtRegTenan' ] = $UpdtRegTenan;

			self::$RotSql[ 'DeleRegTenan' ] = $DeleRegTenan;

			self::$RotSql[ 'GetRegTenanTerce' ] = $GetRegTenanTerce;

			self::$Conn = Core::Conecta();
		}

		/**
	 	 * Retorna Todos Dados.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetTenan( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Tenant::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegTenan' ] );

					$Prepara->bindValue( ':tenant_cada_docu', $Parametros[ 'tenant_cada_nome_docu' ] );
					$Prepara->bindValue( ':tenant_cada_nome', $Parametros[ 'tenant_cada_nome_docu' ] );
					$Prepara->bindValue( ':tenant_cada_stat', $Parametros[ 'tenant_cada_stat' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						if ( isset( $input['tenant_cada_boto'] ) == false){
							$Botao = '
								<button id="EditBtnTenan" type="button" class="btn btn-secondary" title="ALTERAR"><i class="fas fa-edit"></i></button>
								<button id="DeleBtnTenan" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-minus"></i></button>
							';
						};

						return array(
							'tenant_cada_boto' => $Botao,
							'tenant_cada_iden' => $input['tenant_cada_iden'],
							'tenant_cada_docu' => $input['tenant_cada_docu'],
							'tenant_cada_docu_esta' => $input['tenant_cada_docu_esta'],
							'tenant_cada_nome' => $input['tenant_cada_nome'],
							'tenant_cada_cep' => $input['tenant_cada_cep'],
							'tenant_cada_ende' => $input['tenant_cada_ende'],
							'tenant_cada_nume' => $input['tenant_cada_nume'],
							'tenant_cada_bairo' => $input['tenant_cada_bairo'],
							'tenant_cada_cida' => $input['tenant_cada_cida'],
							'tenant_cada_esta' => $input['tenant_cada_esta'],
							'tenant_cada_usua_iden' => $input['tenant_cada_usua_iden'],
							'tenant_cada_usua_nome_iden' => $input['tenant_cada_usua_nome_iden'],
							'tenant_cada_stat' => $input['tenant_cada_stat'],
						);
					}, $Retorno );

					self::$Conn->commit();
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Tenant',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Tenant com erro </br> '.$e->getMessage(),
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
		public static function SetSalvTenan( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 22,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 23,
				);
				
				$PermiAlter = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenTenan' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenTenan' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};

				Tenant::Inicia();

				try {
					$status = 'duplicado';
					$descricao = 'Inclusão de Tenant CNPJ Duplicado';
					$listreg = 'Registro CNPJ '.$Parametros[ 'DocTenan' ].' duplicado';

					if ( $Parametros[ 'IdenTenan' ] == 'Automatico' ){
						$Parametros[ 'IdenTenan' ] = 0;
					};

					self::$Conn->beginTransaction();

					$DublSele = self::$Conn->prepare( self::$RotSql[ 'DuplRegTenan' ] );
					$DublSele->bindValue( ':tenant_cada_docu', $Parametros[ 'DocTenan' ] );
					$DublSele->bindValue( ':tenant_cada_iden', $Parametros[ 'IdenTenan' ] );
					$DublSele->execute();
					
					$DublReto = $DublSele->fetchAll( PDO::FETCH_ASSOC );
					if( $DublReto[0][ 'tenant_cada_iden' ] == 0 ){
						if ( $Parametros[ 'IdenTenan' ] == 0 ){
							$descricao = 'Inclusão de Tenant';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegTenan' ] );
						} else {
							$descricao = 'Alteração de Tenant';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegTenan' ] );
							$Prepara->bindValue( ':tenant_cada_iden', $Parametros[ 'IdenTenan' ] );
						};
						
						$Prepara->bindValue( ':tenant_cada_docu', $Parametros[ 'DocTenan' ] );
						$Prepara->bindValue( ':tenant_cada_docu_esta', $Parametros[ 'DocEstTenan' ] );
						$Prepara->bindValue( ':tenant_cada_nome', Core::UpperCase( $Parametros[ 'NomeTenan' ] ) );
						$Prepara->bindValue( ':tenant_cada_cep', $Parametros[ 'CepTenan' ] );
						$Prepara->bindValue( ':tenant_cada_ende', Core::UpperCase( $Parametros[ 'EndeTenan' ] ) );
						$Prepara->bindValue( ':tenant_cada_nume', Core::UpperCase( $Parametros[ 'NumeTenan' ] ) );
						$Prepara->bindValue( ':tenant_cada_bairo', Core::UpperCase( $Parametros[ 'BairroTenan' ] ) );
						$Prepara->bindValue( ':tenant_cada_cida', Core::UpperCase( $Parametros[ 'CidaTenan' ] ) );
						$Prepara->bindValue( ':tenant_cada_esta', Core::UpperCase( $Parametros[ 'EstTenan' ] ) );
						$Prepara->bindValue( ':tenant_cada_usua_iden', $Parametros[ 'RespTenan' ] );
						$Prepara->bindValue( ':tenant_cada_stat', $Parametros[ 'StatTenan' ] );

						$Prepara->execute();
					
						if ( $descricao == 'Inclusão de Tenant' ){
							$Retorno = self::$Conn->lastInsertId().' incluido';
							$Parametros[ 'IdenTenan' ] = self::$Conn->lastInsertId();
						} else {
							$Retorno = $Parametros[ 'IdenTenan' ].' alterado';
						};

						self::$Conn->commit();
						
						$status = 'sucesso';
						$listreg = 'Registro ID '.$Retorno;

					};

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Tenant com erro </br> '.$e->getMessage(),
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
		public static function SetDeleTenan( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {		
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 24,
				);
				
				$PermiDele = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				if ( $PermiDele[ 'status' ] == 'restrito' ){
					return json_encode( $PermiDele	);
				};

				Tenant::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'DeleRegTenan' ] );
					$Prepara->bindValue( ':tenant_cada_iden', $Parametros[ 'IdenTenan' ] );

					$Prepara->execute();
					
					$Retorno = $Parametros[ 'IdenTenan' ].' excluido';
						
					self::$Conn->commit();

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => 'sucesso',
						'descricao' => 'Exclusão de Tenant',
						'listreg' => 'Registro ID '.$Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Usuários com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados de Usuários.
		 * administrador da Tenant
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetUsuaTenan( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Tenant::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegUsuaTenan' ] );

					$Prepara->bindValue( ':usua_cada_status', $Parametros[ 'usua_cada_status' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
					
					self::$Conn->commit();
					
					$Retorno = array_map( function( $input ) {
						return array(
							'id' => $input['usua_cada_iden'],
							'text' => $input['usua_cada_nome'],
						);
					}, $Retorno );

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => 'sucesso',
						'descricao' => 'Resultado Tenant Usuarios',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => 'invalido',
						'descricao' => 'Tenant Usuarios com erro </br> '.$e->getMessage(),
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
		 public static function GetRegTenanTerce( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Tenant::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegTenanTerce' ] );

					$Prepara->bindValue( ':tenant_cada_stat', $Parametros[ 'tenant_cada_stat' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						return array(
							'id' => $input['tenant_cada_iden'],
							'text' => $input['tenant_cada_nome'],
						);
					}, $Retorno );

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => 'sucesso',
						'descricao' => 'Resultado Terceiro Tenant',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => 'invalido',
						'descricao' => 'Terceiro Tenant com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>