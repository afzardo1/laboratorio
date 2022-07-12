<?php
	namespace Back\Modulos\Comum\Parametros;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Comum\Empresas\Empresas;

	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas da parametro
 	 * Todas as requisições da parametro passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Parametro
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Parametros {
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
			include_once( 'Parametros.sql.php' );
			
			self::$RotSql[ 'GetRegPara' ] = $GetRegPara;

			self::$RotSql[ 'InstRegPara' ] = $InstRegPara;
			self::$RotSql[ 'UpdtRegPara' ] = $UpdtRegPara;

			self::$RotSql[ 'AnteRegPara' ] = $AnteRegPara;

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
		public static function GetTenanPara( $Parametros = array() ){
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
		public static function GetEmprePara( $Parametros = array() ){
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
		public static function GetPara( $Parametros = array(), $Tipo = '' ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Parametros::Inicia();

				if ( $Parametros[ 'sist_para_empre' ] == 0 ){
					$Parametros[ 'sist_para_empre' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegPara' ] );

					$Prepara->bindValue( ':sist_para_tenant', $Parametros[ 'sist_para_tenant' ] );
					$Prepara->bindValue( ':sist_para_empre', $Parametros[ 'sist_para_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					if( $Tipo == 'TELA' ){
						$Retorno = array_map( function( $input ) {
							return array(
								'sist_para_iden' => $input['sist_para_iden'],
								'sist_para_tenant' => $input['sist_para_tenant'],
								'sist_para_empre' => $input['sist_para_empre'],
								'sis_para_logo' => explode( '_', $input['sis_para_logo'] )[2],
								'sis_para_selo' => $input['sis_para_selo'],
								'sist_para_smtp' => $input['sist_para_smtp'],
								'sist_para_porta' => $input['sist_para_porta'],
								'sist_para_secu' => $input['sist_para_secu'],
								'sist_para_auth' => $input['sist_para_auth'],
								'sist_para_user' => $input['sist_para_user'],
								'sis_para_from' => $input['sis_para_from'],
								'sis_para_from_name' => $input['sis_para_from_name'],
								'sis_para_cabe' => $input['sis_para_cabe'],
							);
						}, $Retorno );
					} else {
						$Retorno = array_map( function( $input ) {
							return array(
								'sist_para_iden' => $input['sist_para_iden'],
								'sist_para_tenant' => $input['sist_para_tenant'],
								'sist_para_empre' => $input['sist_para_empre'],
								'sis_para_logo' => $input['sis_para_logo'],
								'sis_para_selo' => $input['sis_para_selo'],
								'sist_para_smtp' => $input['sist_para_smtp'],
								'sist_para_porta' => $input['sist_para_porta'],
								'sist_para_secu' => $input['sist_para_secu'],
								'sist_para_auth' => $input['sist_para_auth'],
								'sist_para_user' => $input['sist_para_user'],
								'sis_para_pwd' => $input['sis_para_pwd'],
								'sis_para_from' => $input['sis_para_from'],
								'sis_para_from_name' => $input['sis_para_from_name'],
								'sis_para_cabe' => $input['sis_para_cabe'],
							);
						}, $Retorno );
					};
					

					self::$Conn->commit();
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Parametros',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Parametros',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Parametros',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Parametros com erro </br> '.$e->getMessage(),
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
		public static function SetSalvPara( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				
				if (  $Parametros[ 'LogoPara' ] == 'SELECIONE UM ARQUIVO' || $Parametros[ 'LogoPara' ] == 'Selecione um Arquivo' ){
					$Parametros[ 'LogoPara' ] = '';
				};

				if (  $Parametros[ 'SeloPara' ] == 'SELECIONE UM ARQUIVO' || $Parametros[ 'SeloPara' ] == 'Selecione um Arquivo' ){
					$Parametros[ 'SeloPara' ] = '';
				};
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 144,
				);
				
				$PermiAlter = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenPara' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};

				Parametros::Inicia();

				try {
					if ( $Parametros[ 'IdenPara' ] == 'Automatico' ){
						$Parametros[ 'IdenPara' ] = 0;
					};

					self::$Conn->beginTransaction();

					$descricao = 'Atualização Parâmetros';
					if ( $Parametros[ 'IdenPara' ] == 0 ){
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegPara' ] );
					} else {
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegPara' ] );
						$Prepara->bindValue( ':sist_para_iden', $Parametros[ 'IdenPara' ] );
					};
					
					$Prepara->bindValue( ':sis_para_logo', Core::UpperCase( $Parametros[ 'LogoPara' ] ) );
					$Prepara->bindValue( ':sis_para_selo', Core::UpperCase( $Parametros[ 'SeloPara' ] ) );
					$Prepara->bindValue( ':sist_para_smtp', Core::LowerCase( $Parametros[ 'SmtpPara' ] ) );
					$Prepara->bindValue( ':sist_para_porta', $Parametros[ 'PortSmtpPara' ] );
					$Prepara->bindValue( ':sist_para_secu', $Parametros[ 'CriptSmtpPara' ] );
					$Prepara->bindValue( ':sist_para_auth', $Parametros[ 'AuthSmtpPara' ] );
					$Prepara->bindValue( ':sist_para_user', $Parametros[ 'UsuaSmtpPara' ] );
					$Prepara->bindValue( ':sis_para_pwd', $Parametros[ 'SenhaSmtpPara' ] );
					$Prepara->bindValue( ':sis_para_from', Core::LowerCase( $Parametros[ 'EmailSmtpPara' ] ) );
					$Prepara->bindValue( ':sis_para_from_name', Core::LowerCase( $Parametros[ 'NomeSmtpPara' ] ) );
					$Prepara->bindValue( ':sis_para_cabe', $Parametros[ 'CabePara' ] );
					$Prepara->bindValue( ':sist_para_tenant', $Parametros[ 'FiltTenanPara' ] );
					$Prepara->bindValue( ':sist_para_empre', $Parametros[ 'FiltEmprePara' ] );

					$Prepara->execute();
					
					if ( $Parametros[ 'IdenPara' ] == 0 ){
						$Retorno = self::$Conn->lastInsertId().' atualizado';
						$Parametros[ 'IdenPara' ] = self::$Conn->lastInsertId();
					} else {
						$Retorno = $Parametros[ 'IdenPara' ].' atualizado';
					};

					$PrepImag = self::$Conn->prepare( self::$RotSql[ 'AnteRegPara' ] );
					$PrepImag->bindValue( ':sist_para_iden', $Parametros[ 'IdenPara' ] );
					$PrepImag->execute();
					$RetoImag = $PrepImag->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();
					
					if ( $Parametros[ 'BaseLogoPara' ] != '' ){
						
						if ( $RetoImag[0][ 'sis_para_logo' ] != '' ){
							if ( $RetoImag[0][ 'sis_para_logo' ] != Core::UpperCase( $Parametros[ 'LogoPara' ] ) ){
								$ArqAnteAnexo = str_replace( 
									array( 'Back\Modulos\Comum\Parametros', 'Back/Modulos/Comum/Parametros' ),
									'',
									__DIR__ ).'Imagem/'.$Parametros[ 'FiltTenanPara' ].'_'.$Parametros[ 'FiltEmprePara' ].'_'.$RetoImag[0][ 'sis_para_logo' ];

								if ( file_exists ( $ArqAnteAnexo ) ) {
									unlink( $ArqAnteAnexo );
								};
							};
						};
						
						$ArquLogo = str_replace( 
							array( 'Back\Modulos\Comum\Parametros', 'Back/Modulos/Comum/Parametros' ),
							'',
							__DIR__ ).'Imagem/'.$Parametros[ 'FiltTenanPara' ].'_'.$Parametros[ 'FiltEmprePara' ].'_'.Core::UpperCase( $Parametros[ 'LogoPara' ] );

						$StrLogBas64 = $Parametros[ 'BaseLogoPara' ];
						$StrLogBas64 = explode( ',', $StrLogBas64 ); 
						$StrLogBas64 = str_replace( ' ','+',$StrLogBas64[1] ); 
						$StrLogBas64 = base64_decode( $StrLogBas64 );
					
						if ( file_exists ( $ArquLogo ) ) {
							unlink( $ArquLogo );
						};

						file_put_contents( $ArquLogo, $StrLogBas64 );
					};

					if ( $Parametros[ 'BaseSeloPara' ] != '' ){
						
						if ( $RetoImag[0][ 'sis_para_selo' ] != '' ){
							if ( $RetoImag[0][ 'sis_para_selo' ] != Core::UpperCase( $Parametros[ 'SeloPara' ] ) ){
								$ArqAnteAnexo = str_replace( 
									array( 'Back\Modulos\Comum\Parametros', 'Back/Modulos/Comum/Parametros' ),
									'',
									__DIR__ ).'Imagem/'.$Parametros[ 'FiltTenanPara' ].'_'.$Parametros[ 'FiltEmprePara' ].'_'.$RetoImag[0][ 'sis_para_selo' ];

								if ( file_exists ( $ArqAnteAnexo ) ) {
									unlink( $ArqAnteAnexo );
								};
							};
						};
						
						$ArquLogo = str_replace( 
							array( 'Back\Modulos\Comum\Parametros', 'Back/Modulos/Comum/Parametros' ),
							'',
							__DIR__ ).'Imagem/'.$Parametros[ 'FiltTenanPara' ].'_'.$Parametros[ 'FiltEmprePara' ].'_'.Core::UpperCase( $Parametros[ 'SeloPara' ] );

						$StrLogBas64 = $Parametros[ 'BaseSeloPara' ];
						$StrLogBas64 = explode( ',', $StrLogBas64 ); 
						$StrLogBas64 = str_replace( ' ','+',$StrLogBas64[1] ); 
						$StrLogBas64 = base64_decode( $StrLogBas64 );
					
						if ( file_exists ( $ArquLogo ) ) {
							unlink( $ArquLogo );
						};

						file_put_contents( $ArquLogo, $StrLogBas64 );
					};
					
					$status = 'sucesso';
					$listreg = 'Registro ID '.$Retorno;

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Parametros',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tenant',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Parâmetros com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>