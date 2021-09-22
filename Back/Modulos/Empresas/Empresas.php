<?php
	namespace Back\Modulos\Empresas;

	use Back\Core\Core;
	use Back\Modulos\Tenant\Tenant;

	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas da empresa
 	 * Todas as requisições da empresa passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Empresas
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Empresas {
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
			include_once( 'Empresas.sql.php' );
			
			self::$RotSql[ 'GetRegEmpre' ] = $GetRegEmpre;
			self::$RotSql[ 'GetRegUsuaEmpre' ] = $GetRegUsuaEmpre;
			
			self::$RotSql[ 'DuplRegEmpre' ] = $DuplRegEmpre;
			self::$RotSql[ 'InstRegEmpre' ] = $InstRegEmpre;
			self::$RotSql[ 'UpdtRegEmpre' ] = $UpdtRegEmpre;

			self::$RotSql[ 'DeleRegEmpre' ] = $DeleRegEmpre;

			self::$RotSql[ 'GetRegEmpreTerce' ] = $GetRegEmpreTerce;

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
		public static function GetEmpre( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Empresas::Inicia();

				if ( $Parametros[ 'empre_cada_tenant' ] == 0 ){
					$Parametros[ 'empre_cada_tenant' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegEmpre' ] );

					$Prepara->bindValue( ':empre_cada_docu', $Parametros[ 'empre_cada_nome_docu' ] );
					$Prepara->bindValue( ':empre_cada_nome', $Parametros[ 'empre_cada_nome_docu' ] );
					$Prepara->bindValue( ':empre_cada_tenant', $Parametros[ 'empre_cada_tenant' ] );
					

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						if ( isset( $input['empre_cada_boto'] ) == false){
							$Botao = '
								<button id="EditBtnEmpre" type="button" class="btn btn-secondary" title="ALTERAR"><i class="fas fa-edit"></i></button>
								<button id="DeleBtnEmpre" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-minus"></i></button>
							';
						};

						return array(
							'empre_cada_boto' => $Botao,
							'empre_cada_iden' => $input['empre_cada_iden'],
							'empre_cada_docu' => $input['empre_cada_docu'],
							'empre_cada_docu_esta' => $input['empre_cada_docu_esta'],
							'empre_cada_nome' => $input['empre_cada_nome'],
							'empre_cada_cep' => $input['empre_cada_cep'],
							'empre_cada_ende' => $input['empre_cada_ende'],
							'empre_cada_nume' => $input['empre_cada_nume'],
							'empre_cada_bairo' => $input['empre_cada_bairo'],
							'empre_cada_cida' => $input['empre_cada_cida'],
							'empre_cada_esta' => $input['empre_cada_esta'],
							'empre_cada_usua_iden' => $input['empre_cada_usua_iden'],
							'empre_cada_usua_nome_iden' => $input['empre_cada_usua_nome_iden'],
							'empre_cada_stat' => $input['empre_cada_stat'],
							'empre_cada_tenant' => $input['empre_cada_tenant'],
						);
					}, $Retorno );

					self::$Conn->commit();
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Empresas',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Empresa',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Empresas',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Empresa com erro </br> '.$e->getMessage(),
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
		public static function SetSalvEmpre( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 32,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 33,
				);
				
				$PermiAlter = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenEmpre' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenEmpre' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};

				Empresas::Inicia();

				try {
					$status = 'duplicado';
					$descricao = 'Inclusão de Empresa CNPJ Duplicado';
					$listreg = 'Registro CNPJ '.$Parametros[ 'DocEmpre' ].' duplicado';

					if ( $Parametros[ 'IdenEmpre' ] == 'Automatico' ){
						$Parametros[ 'IdenEmpre' ] = 0;
					};

					self::$Conn->beginTransaction();

					$DublSele = self::$Conn->prepare( self::$RotSql[ 'DuplRegEmpre' ] );
					$DublSele->bindValue( ':empre_cada_docu', $Parametros[ 'DocEmpre' ] );
					$DublSele->bindValue( ':empre_cada_iden', $Parametros[ 'IdenEmpre' ] );
					$DublSele->execute();
					
					$DublReto = $DublSele->fetchAll( PDO::FETCH_ASSOC );
					if( $DublReto[0][ 'empre_cada_iden' ] == 0 ){
						if ( $Parametros[ 'IdenEmpre' ] == 0 ){
							$descricao = 'Inclusão de Empresas';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegEmpre' ] );
						} else {
							$descricao = 'Alteração de Empresas';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegEmpre' ] );
							$Prepara->bindValue( ':empre_cada_iden', $Parametros[ 'IdenEmpre' ] );
						};
						
						$Prepara->bindValue( ':empre_cada_docu', $Parametros[ 'DocEmpre' ] );
						$Prepara->bindValue( ':empre_cada_docu_esta', $Parametros[ 'DocEstEmpre' ] );
						$Prepara->bindValue( ':empre_cada_nome', Core::UpperCase( $Parametros[ 'NomeEmpre' ] ) );
						$Prepara->bindValue( ':empre_cada_cep', $Parametros[ 'CepEmpre' ] );
						$Prepara->bindValue( ':empre_cada_ende', Core::UpperCase( $Parametros[ 'EndeEmpre' ] ) );
						$Prepara->bindValue( ':empre_cada_nume', Core::UpperCase( $Parametros[ 'NumeEmpre' ] ) );
						$Prepara->bindValue( ':empre_cada_bairo', Core::UpperCase( $Parametros[ 'BairroEmpre' ] ) );
						$Prepara->bindValue( ':empre_cada_cida', Core::UpperCase( $Parametros[ 'CidaEmpre' ] ) );
						$Prepara->bindValue( ':empre_cada_esta', Core::UpperCase( $Parametros[ 'EstEmpre' ] ) );
						$Prepara->bindValue( ':empre_cada_usua_iden', $Parametros[ 'RespEmpre' ] );
						$Prepara->bindValue( ':empre_cada_stat', $Parametros[ 'StatEmpre' ] );
						$Prepara->bindValue( ':empre_cada_tenant', $Parametros[ 'TenanEmpre' ] );						

						$Prepara->execute();
					
						if ( $descricao == 'Inclusão de Empresas' ){
							$Retorno = self::$Conn->lastInsertId().' incluido';
							$Parametros[ 'IdenEmpre' ] = self::$Conn->lastInsertId();
						} else {
							$Retorno = $Parametros[ 'IdenEmpre' ].' alterado';
						};

						self::$Conn->commit();
						
						$status = 'sucesso';
						$listreg = 'Registro ID '.$Retorno;

					};

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Empresas',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Empresas',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Empresas com erro </br> '.$e->getMessage(),
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
		public static function SetDeleEmpre( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {		
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 34,
				);
				
				$PermiDele = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				if ( $PermiDele[ 'status' ] == 'restrito' ){
					return json_encode( $PermiDele	);
				};

				Empresas::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'DeleRegEmpre' ] );
					$Prepara->bindValue( ':empre_cada_iden', $Parametros[ 'IdenEmpre' ] );

					$Prepara->execute();
					
					$Retorno = $Parametros[ 'IdenEmpre' ].' excluido';
						
					self::$Conn->commit();

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Empresas',
						'status' => 'sucesso',
						'descricao' => 'Exclusão de Empresas',
						'listreg' => 'Registro ID '.$Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Empresas',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Empresas com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados de Usuários.
		 * usuários da Tenant
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetUsuaEmpre( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Empresas::Inicia();

				try {
					self::$Conn->beginTransaction();

					$usua_cada_tenant = Core::Sessao()::Get( 'usua_cada_tenant' );
					
					if ( $usua_cada_tenant == '0' ){
						$usua_cada_tenant = '%%';
					};

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegUsuaEmpre' ] );

					$Prepara->bindValue( ':usua_cada_tenant', $usua_cada_tenant );
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
						'modulo' => 'Empresas',
						'status' => 'sucesso',
						'descricao' => 'Resultado Usuarios Empresas',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Empresas',
						'status' => 'invalido',
						'descricao' => 'Usuarios Empresas com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados da Tenant.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetTenanEmpre( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Tenant::GetRegTenanTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados para Terceiros.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		 public static function GetEmpreTerce( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Empresas::Inicia();
				
				if ( $Parametros[ 'empre_cada_tenant' ] == 0 || $Parametros[ 'empre_cada_tenant' ] == '' ){
					$Parametros[ 'empre_cada_tenant' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegEmpreTerce' ] );

					$Prepara->bindValue( ':empre_cada_stat', $Parametros[ 'empre_cada_stat' ] );
					$Prepara->bindValue( ':empre_cada_tenant', $Parametros[ 'empre_cada_tenant' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
					
					self::$Conn->commit();
					
					$Retorno = array_map( function( $input ) {
						return array(
							'id' => $input['empre_cada_iden'],
							'text' => $input['empre_cada_nome'],
						);
					}, $Retorno );

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Clientes',
						'status' => 'sucesso',
						'descricao' => 'Resultado Clientes Empresas',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Clientes',
						'status' => 'invalido',
						'descricao' => 'Clientes Empresas com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}


	}
?>