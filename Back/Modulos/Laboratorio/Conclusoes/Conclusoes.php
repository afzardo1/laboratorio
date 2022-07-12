<?php
	namespace Back\Modulos\Laboratorio\Conclusoes;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Comum\Empresas\Empresas;

	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas das Conclusoes
 	 * Todas as requisições dos amostras passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Conclusoes
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Conclusoes {
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
			include_once( 'Conclusoes.sql.php' );

			self::$RotSql[ 'GetRegAmosConcl' ] = $GetRegAmosConcl;
			
			self::$RotSql[ 'InstRegAmosConcl' ] = $InstRegAmosConcl;
			self::$RotSql[ 'UpdtRegAmosConcl' ] = $UpdtRegAmosConcl;
			self::$RotSql[ 'DeleRegAmosConcl' ] = $DeleRegAmosConcl;

			self::$RotSql[ 'GetRegAmosConclTerce' ] = $GetRegAmosConclTerce;			

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
		public static function GetTenanAmosConcl( $Parametros = array() ){
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
		public static function GetEmpreAmosConcl( $Parametros = array() ){
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
		public static function GetAmosConcl( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Conclusoes::Inicia();

				if ( $Parametros[ 'labo_amos_concl_tenan' ] == 0 || $Parametros[ 'labo_amos_concl_tenan' ] == '' ){
					$Parametros[ 'labo_amos_concl_tenan' ] = '%%';
				};

				if ( $Parametros[ 'labo_amos_concl_empre' ] == 0 || $Parametros[ 'labo_amos_concl_empre' ] == '' ){
					$Parametros[ 'labo_amos_concl_empre' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$SqlGetRegAmosConcl = str_replace(
						':FILTRO',
						'( labo_amos_concl_apeli LIKE :labo_amos_concl_apeli OR
						   labo_amos_concl_iden LIKE :labo_amos_concl_iden ) AND
						( labo_amos_concl_tenan LIKE :labo_amos_concl_tenan ) AND
						( labo_amos_concl_empre LIKE :labo_amos_concl_empre )', self::$RotSql[ 'GetRegAmosConcl' ] );
					
					$Prepara = self::$Conn->prepare( $SqlGetRegAmosConcl );

					$Prepara->bindValue( ':labo_amos_concl_apeli', $Parametros[ 'labo_amos_concl_codi_apeli' ] );
					$Prepara->bindValue( ':labo_amos_concl_iden', $Parametros[ 'labo_amos_concl_codi_apeli' ] );
					$Prepara->bindValue( ':labo_amos_concl_tenan', $Parametros[ 'labo_amos_concl_tenan' ] );
					$Prepara->bindValue( ':labo_amos_concl_empre', $Parametros[ 'labo_amos_concl_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						if ( isset( $input['amos_cada_boto'] ) == false){
							$Botao = $Botao.'
								<button id="EditBtnConcl" type="button" class="btn btn-secondary" title="ALTERAR"><i class="fas fa-edit"></i></button>
								<button id="DeleBtnConcl" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-minus"></i></button>
							';
						};

						return array(
							'labo_amos_concl_boto' => $Botao,
							'labo_amos_concl_iden' => $input['labo_amos_concl_iden'],
							'labo_amos_concl_apeli' => $input['labo_amos_concl_apeli'],
							'labo_amos_concl_obse' => $input['labo_amos_concl_obse'],
							'labo_amos_concl_tenan' => $input['labo_amos_concl_tenan'],
							'labo_amos_concl_empre' => $input['labo_amos_concl_empre'],
						);
					}, $Retorno );
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Conclusão',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Conclusão',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Conclusão',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Conclusão com erro </br> '.$e->getMessage(),
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
		public static function SetSalvAmosConcl( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 140,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 141,
				);
				
				$PermiAlter = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenConcl' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenConcl' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};

				Conclusoes::Inicia();

				try {
					
					if ( $Parametros[ 'IdenConcl' ] == 'Automatico' ){
						$Parametros[ 'IdenConcl' ] = 0;
					};

					self::$Conn->beginTransaction();

					if ( $Parametros[ 'IdenConcl' ] == 0 ){
						$descricao = 'Inclusão de Conclusões';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegAmosConcl' ] );
					} else {
						$descricao = 'Alteração de Conclusões';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegAmosConcl' ] );
						$Prepara->bindValue( ':labo_amos_concl_iden', $Parametros[ 'IdenConcl' ] );
					};
						
					$Prepara->bindValue( ':labo_amos_concl_apeli', Core::UpperCase( $Parametros[ 'ApelConcl' ] ) );
					$Prepara->bindValue( ':labo_amos_concl_obse', Core::UpperCase( $Parametros[ 'DescrConcl' ] ) );
					$Prepara->bindValue( ':labo_amos_concl_tenan', $Parametros[ 'TenanConcl' ] );
					$Prepara->bindValue( ':labo_amos_concl_empre', $Parametros[ 'EmpreConcl' ] );

					$Prepara->execute();
						
					if ( $descricao == 'Inclusão de Conclusões' ){
						$Retorno = self::$Conn->lastInsertId().' incluido';
						$Parametros[ 'IdenConcl' ] = self::$Conn->lastInsertId();
					} else {
						$Retorno = $Parametros[ 'IdenConcl' ].' alterado';
					};

					self::$Conn->commit();
						
					$status = 'sucesso';
					$listreg = 'Registro ID '.$Retorno;

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Conclusões',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Conclusões',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Conclusões com erro </br> '.$e->getMessage(),
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
		public static function SetDeleAmosConcl( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 142,
				);
				
				$PermiDele = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				if ( $PermiDele[ 'status' ] == 'restrito' ){
					return json_encode( $PermiDele	);
				};

				Conclusoes::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'DeleRegAmosConcl' ] );
					$Prepara->bindValue( ':labo_amos_concl_iden', $Parametros[ 'IdenConcl' ] );

					$Prepara->execute();
					
					$listreg = 'Registro ID '.$Parametros[ 'IdenConcl' ].' excluido';
					
					self::$Conn->commit();

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Conclusões',
						'status' => 'sucesso',
						'descricao' => 'Exclusão de Conclusões',
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Conclusões',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Conclusões com erro </br> '.$e->getMessage(),
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
		 public static function GetRegAmosConclTerce( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Conclusoes::Inicia();

				try {
					if ( $Parametros[ 'labo_amos_concl_tenan' ] == 0 || $Parametros[ 'labo_amos_concl_tenan' ] == '' ){
						$Parametros[ 'labo_amos_concl_tenan' ] = '%%';
					};
	
					if ( $Parametros[ 'labo_amos_concl_empre' ] == 0 || $Parametros[ 'labo_amos_concl_empre' ] == '' ){
						$Parametros[ 'labo_amos_concl_empre' ] = '%%';
					};

					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegAmosConclTerce' ] );

					$Prepara->bindValue( ':labo_amos_concl_tenan', $Parametros[ 'labo_amos_concl_tenan' ] );
					$Prepara->bindValue( ':labo_amos_concl_empre', $Parametros[ 'labo_amos_concl_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						return array(
							'id' => $input['labo_amos_concl_iden'],
							'text' => $input['labo_amos_concl_apeli'],
							//'obs' =>  $input['labo_amos_concl_obsee'],
						);
					}, $Retorno );

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Conclusões',
						'status' => 'sucesso',
						'descricao' => 'Resultado Terceiro Conclusões',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Conclusões',
						'status' => 'invalido',
						'descricao' => 'Terceiro Conclusões com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>