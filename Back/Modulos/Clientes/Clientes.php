<?php
	namespace Back\Modulos\Clientes;

	use Back\Core\Core;
	use Back\Modulos\Tenant\Tenant;
	use Back\Modulos\Empresas\Empresas;

	use PDO;
	use PDOException;

	/**
 	 * Esta classe contendo rotinas da empresa
 	 * Todas as requisições da empresa passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Clientes
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Clientes {
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
			include_once( 'Clientes.sql.php' );
			
			self::$RotSql[ 'GetRegClie' ] = $GetRegClie;
			
			self::$RotSql[ 'DuplRegClie' ] = $DuplRegClie;
			self::$RotSql[ 'InstRegClie' ] = $InstRegClie;
			self::$RotSql[ 'UpdtRegClie' ] = $UpdtRegClie;

			self::$RotSql[ 'DeleRegClie' ] = $DeleRegClie;

			self::$RotSql[ 'GetRegClieTerce' ] = $GetRegClieTerce;

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
		public static function GetTenanClie( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Tenant::GetRegTenanTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados da Empresa.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		 public static function GetEmpreClie( $Parametros = array() ){
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
		public static function GetClie( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Clientes::Inicia();

				if ( $Parametros[ 'clie_cada_tenan' ] == 0 || $Parametros[ 'clie_cada_tenan' ] == '' ){
					$Parametros[ 'clie_cada_tenan' ] = '%%';
				};

				if ( $Parametros[ 'clie_cada_empre' ] == 0 || $Parametros[ 'clie_cada_empre' ] == '' ){
					$Parametros[ 'clie_cada_empre' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegClie' ] );

					$Prepara->bindValue( ':clie_cada_refe', $Parametros[ 'clie_cada_nome_docu_refe' ] );
					$Prepara->bindValue( ':clie_cada_docu', $Parametros[ 'clie_cada_nome_docu_refe' ] );
					$Prepara->bindValue( ':clie_cada_nome', $Parametros[ 'clie_cada_nome_docu_refe' ] );
					$Prepara->bindValue( ':clie_cada_tenan', $Parametros[ 'clie_cada_tenan' ] );
					$Prepara->bindValue( ':clie_cada_empre', $Parametros[ 'clie_cada_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						if ( isset( $input['clie_cada_boto'] ) == false){
							$Botao = '
								<button id="EditBtnClie" type="button" class="btn btn-secondary" title="ALTERAR"><i class="fas fa-edit"></i></button>
								<button id="DeleBtnClie" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-minus"></i></button>
							';
						};

						return array(
							'clie_cada_boto' => $Botao,
							'clie_cada_iden' => $input['clie_cada_iden'],
							'clie_cada_refe' => $input['clie_cada_refe'],
							'clie_cada_docu' => $input['clie_cada_docu'],
							'clie_cada_nome' => $input['clie_cada_nome'],
							'clie_cada_tenan' => $input['clie_cada_tenan'],
							'clie_cada_empre' => $input['clie_cada_empre'],
							'clie_cada_stat' => $input['clie_cada_stat'],
						);
					}, $Retorno );

					self::$Conn->commit();
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Clientes',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Clientes',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Clientes',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Clientes com erro </br> '.$e->getMessage(),
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
		public static function SetSalvClie( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 42,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 43,
				);
				
				$PermiAlter = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenClie' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenClie' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};

				Clientes::Inicia();

				try {
					$status = 'duplicado';
					$descricao = 'Inclusão de Cliente CNPJ Duplicado';
					$listreg = 'Registro CNPJ '.$Parametros[ 'DocClie' ].' duplicado';

					if ( $Parametros[ 'IdenClie' ] == 'Automatico' ){
						$Parametros[ 'IdenClie' ] = 0;
					};

					self::$Conn->beginTransaction();

					$DublSele = self::$Conn->prepare( self::$RotSql[ 'DuplRegClie' ] );
					$DublSele->bindValue( ':clie_cada_docu', $Parametros[ 'DocClie' ] );
					$DublSele->bindValue( ':clie_cada_iden', $Parametros[ 'IdenClie' ] );
					$DublSele->execute();
					
					$DublReto = $DublSele->fetchAll( PDO::FETCH_ASSOC );
					if( $DublReto[0][ 'clie_cada_iden' ] == 0 ){
						if ( $Parametros[ 'IdenClie' ] == 0 ){
							$descricao = 'Inclusão de Clientes';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegClie' ] );
						} else {
							$descricao = 'Alteração de Clientes';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegClie' ] );
							$Prepara->bindValue( ':clie_cada_iden', $Parametros[ 'IdenClie' ] );
						};
						
						$Prepara->bindValue( ':clie_cada_refe', Core::UpperCase( $Parametros[ 'RefeClie' ] ) );
						$Prepara->bindValue( ':clie_cada_docu', $Parametros[ 'DocClie' ] );
						$Prepara->bindValue( ':clie_cada_nome', Core::UpperCase( $Parametros[ 'NomeClie' ] ) );
						$Prepara->bindValue( ':clie_cada_tenan', $Parametros[ 'TenanClie' ] );
						$Prepara->bindValue( ':clie_cada_empre', $Parametros[ 'EmpreClie' ] );
						$Prepara->bindValue( ':clie_cada_stat', $Parametros[ 'StatClie' ] );

						$Prepara->execute();
					
						if ( $descricao == 'Inclusão de Clientes' ){
							$Retorno = self::$Conn->lastInsertId().' incluido';
							$Parametros[ 'IdenClie' ] = self::$Conn->lastInsertId();
						} else {
							$Retorno = $Parametros[ 'IdenClie' ].' alterado';
						};

						self::$Conn->commit();
						
						$status = 'sucesso';
						$listreg = 'Registro ID '.$Retorno;

					};

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Clientes',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Clientes',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Clientes com erro </br> '.$e->getMessage(),
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
		public static function SetDeleClie( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {		
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 44,
				);
				
				$PermiDele = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				if ( $PermiDele[ 'status' ] == 'restrito' ){
					return json_encode( $PermiDele	);
				};

				Clientes::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'DeleRegClie' ] );
					$Prepara->bindValue( ':clie_cada_iden', $Parametros[ 'IdenClie' ] );

					$Prepara->execute();
					
					$Retorno = $Parametros[ 'IdenClie' ].' excluido';
						
					self::$Conn->commit();

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Clientes',
						'status' => 'sucesso',
						'descricao' => 'Exclusão de Clientes',
						'listreg' => 'Registro ID '.$Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Clientes',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Clientes com erro </br> '.$e->getMessage(),
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
		 public static function GetRegClieTerce( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Clientes::Inicia();

				try {
					if ( $Parametros[ 'clie_cada_tenan' ] == 0 || $Parametros[ 'clie_cada_tenan' ] == '' ){
						$Parametros[ 'clie_cada_tenan' ] = '%%';
					};
	
					if ( $Parametros[ 'clie_cada_empre' ] == 0 || $Parametros[ 'clie_cada_empre' ] == '' ){
						$Parametros[ 'clie_cada_empre' ] = '%%';
					};

					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegClieTerce' ] );

					$Prepara->bindValue( ':clie_cada_stat', $Parametros[ 'clie_cada_stat' ] );
					$Prepara->bindValue( ':clie_cada_tenan', $Parametros[ 'clie_cada_tenan' ] );
					$Prepara->bindValue( ':clie_cada_empre', $Parametros[ 'clie_cada_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						return array(
							'id' => $input['clie_cada_iden'],
							'text' => $input['clie_cada_nome'],
						);
					}, $Retorno );

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Clientes',
						'status' => 'sucesso',
						'descricao' => 'Resultado Terceiro Clientes',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Clientes',
						'status' => 'invalido',
						'descricao' => 'Terceiro Clientes com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>