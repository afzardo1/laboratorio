<?php
	namespace Back\Modulos\Laboratorio\Areas;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Comum\Empresas\Empresas;

	use PDO;
	use PDOException;
	/**
 	 * Esta classe contendo rotinas das Áreas
 	 * Todas as requisições dos areas passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Areas
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Areas {
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
			include_once( 'Areas.sql.php' );

			self::$RotSql[ 'GetRegArea' ] = $GetRegArea;
			
			self::$RotSql[ 'InstRegArea' ] = $InstRegArea;
			self::$RotSql[ 'UpdtRegArea' ] = $UpdtRegArea;

			self::$RotSql[ 'DeleRegArea' ] = $DeleRegArea;

			self::$RotSql[ 'GetRegAreaTerce' ] = $GetRegAreaTerce;

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
		public static function GetTenanArea( $Parametros = array() ){
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
		public static function GetEmpreArea( $Parametros = array() ){
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
		public static function GetArea( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Areas::Inicia();

				if ( $Parametros[ 'area_cada_tenan' ] == 0 || $Parametros[ 'area_cada_tenan' ] == '' ){
					$Parametros[ 'area_cada_tenan' ] = '%%';
				};

				if ( $Parametros[ 'area_cada_empre' ] == 0 || $Parametros[ 'area_cada_empre' ] == '' ){
					$Parametros[ 'area_cada_empre' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegArea' ] );

					$Prepara->bindValue( ':area_cada_refe', $Parametros[ 'area_cada_descr_refe' ] );
					$Prepara->bindValue( ':area_cada_descr', $Parametros[ 'area_cada_descr_refe' ] );
					$Prepara->bindValue( ':area_cada_tenan', $Parametros[ 'area_cada_tenan' ] );
					$Prepara->bindValue( ':area_cada_empre', $Parametros[ 'area_cada_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						if ( isset( $input['area_cada_boto'] ) == false){
							$Botao = '
								<button id="EditBtnArea" type="button" class="btn btn-secondary" title="ALTERAR"><i class="fas fa-edit"></i></button>
								<button id="DeleBtnArea" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-minus"></i></button>
							';
						};

						return array(
							'area_cada_boto' => $Botao,
							'area_cada_iden' => $input['area_cada_iden'],
							'area_cada_refe' => $input['area_cada_refe'],
							'area_cada_descr' => $input['area_cada_descr'],
							'area_cada_stat' => $input['area_cada_stat'],
							'area_cada_tenan' => $input['area_cada_tenan'],
							'area_cada_empre' => $input['area_cada_empre'],
						);
					}, $Retorno );

					self::$Conn->commit();
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Areas',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Áreas',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Areas',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Áreas com erro </br> '.$e->getMessage(),
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
		public static function SetSalvArea( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 72,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 73,
				);
				
				$PermiAlter = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenArea' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenArea' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};

				Areas::Inicia();

				try {
					if ( $Parametros[ 'IdenArea' ] == 'Automatico' ){
						$Parametros[ 'IdenArea' ] = 0;
					};

					self::$Conn->beginTransaction();

					if ( $Parametros[ 'IdenArea' ] == 0 ){
						$descricao = 'Inclusão de Áreas';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegArea' ] );
					} else {
						$descricao = 'Alteração de Áreas';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegArea' ] );
						$Prepara->bindValue( ':area_cada_iden', $Parametros[ 'IdenArea' ] );
					};
						
					$Prepara->bindValue( ':area_cada_refe', Core::UpperCase( $Parametros[ 'RefeArea' ] ) );
					$Prepara->bindValue( ':area_cada_descr', Core::UpperCase( $Parametros[ 'DescrArea' ] ) );
					$Prepara->bindValue( ':area_cada_stat', $Parametros[ 'StatArea' ] );
					$Prepara->bindValue( ':area_cada_tenan', $Parametros[ 'TenanArea' ] );
					$Prepara->bindValue( ':area_cada_empre', $Parametros[ 'EmpreArea' ] );

					$Prepara->execute();
					
					if ( $descricao == 'Inclusão de Áreas' ){
						$Retorno = self::$Conn->lastInsertId().' incluido';
						$Parametros[ 'IdenArea' ] = self::$Conn->lastInsertId();
					} else {
						$Retorno = $Parametros[ 'IdenArea' ].' alterado';
					};

					self::$Conn->commit();
						
					$status = 'sucesso';
					$listreg = 'Registro ID '.$Retorno;

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Areas',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Areas',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Áreas com erro </br> '.$e->getMessage(),
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
		public static function SetDeleArea( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {		
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 74,
				);
				
				$PermiDele = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				if ( $PermiDele[ 'status' ] == 'restrito' ){
					return json_encode( $PermiDele	);
				};

				Areas::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'DeleRegArea' ] );
					$Prepara->bindValue( ':area_cada_iden', $Parametros[ 'IdenArea' ] );

					$Prepara->execute();
					
					$Retorno = $Parametros[ 'IdenArea' ].' excluido';
						
					self::$Conn->commit();

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Areas',
						'status' => 'sucesso',
						'descricao' => 'Exclusão de Áreas',
						'listreg' => 'Registro ID '.$Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Areas',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Áreas com erro </br> '.$e->getMessage(),
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
		public static function GetRegAreaTerce( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Areas::Inicia();

				try {
					if ( $Parametros[ 'area_cada_tenan' ] == 0 || $Parametros[ 'area_cada_tenan' ] == '' ){
						$Parametros[ 'area_cada_tenan' ] = '%%';
					};
	
					if ( $Parametros[ 'area_cada_empre' ] == 0 || $Parametros[ 'area_cada_empre' ] == '' ){
						$Parametros[ 'area_cada_empre' ] = '%%';
					};

					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegAreaTerce' ] );

					$Prepara->bindValue( ':area_cada_stat', $Parametros[ 'area_cada_stat' ] );
					$Prepara->bindValue( ':area_cada_tenan', $Parametros[ 'area_cada_tenan' ] );
					$Prepara->bindValue( ':area_cada_empre', $Parametros[ 'area_cada_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						return array(
							'id' => $input['area_cada_iden'],
							'text' => $input['area_cada_descr'],
						);
					}, $Retorno );

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Areas',
						'status' => 'sucesso',
						'descricao' => 'Resultado Terceiro Áreas',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Areas',
						'status' => 'invalido',
						'descricao' => 'Terceiro Áreas com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>