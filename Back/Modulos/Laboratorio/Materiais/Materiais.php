<?php
	namespace Back\Modulos\Laboratorio\Materiais;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Comum\Empresas\Empresas;

	use PDO;
	use PDOException;
	/**
 	 * Esta classe contendo rotinas dos Materiais
 	 * Todas as requisições dos materiais passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Materiais
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Materiais {
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
			include_once( 'Materiais.sql.php' );

			self::$RotSql[ 'GetRegMate' ] = $GetRegMate;
			
			self::$RotSql[ 'InstRegMate' ] = $InstRegMate;
			self::$RotSql[ 'UpdtRegMate' ] = $UpdtRegMate;

			self::$RotSql[ 'DeleRegMate' ] = $DeleRegMate;

			self::$RotSql[ 'GetRegMateTerce' ] = $GetRegMateTerce;

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
		public static function GetTenanMate( $Parametros = array() ){
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
		public static function GetEmpreMate( $Parametros = array() ){
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
		public static function GetMate( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Materiais::Inicia();

				if ( $Parametros[ 'mate_cada_tenant_iden' ] == 0 || $Parametros[ 'mate_cada_tenant_iden' ] == '' ){
					$Parametros[ 'mate_cada_tenant_iden' ] = '%%';
				};

				if ( $Parametros[ 'mate_cada_empre_iden' ] == 0 || $Parametros[ 'mate_cada_empre_iden' ] == '' ){
					$Parametros[ 'mate_cada_empre_iden' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegMate' ] );

					$Prepara->bindValue( ':mate_cada_descr', $Parametros[ 'mate_cada_descr_forne' ] );
					$Prepara->bindValue( ':mate_cada_forne', $Parametros[ 'mate_cada_descr_forne' ] );
					$Prepara->bindValue( ':mate_cada_tenant_iden', $Parametros[ 'mate_cada_tenant_iden' ] );
					$Prepara->bindValue( ':mate_cada_empre_iden', $Parametros[ 'mate_cada_empre_iden' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						if ( isset( $input['mate_cada_boto'] ) == false){
							$Botao = '
								<button id="EditBtnMate" type="button" class="btn btn-secondary" title="ALTERAR"><i class="fas fa-edit"></i></button>
								<button id="DeleBtnMate" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-minus"></i></button>
							';
						};

						return array(
							'mate_cada_boto' => $Botao,
							'mate_cada_iden' => $input['mate_cada_iden'],
							'mate_cada_descr' => $input['mate_cada_descr'],
							'mate_cada_forne' => $input['mate_cada_forne'],
							'mate_cada_limi_resi' => $input['mate_cada_limi_resi'],
							'mate_cada_limi_esco' => $input['mate_cada_limi_esco'],
							'mate_cada_along' => $input['mate_cada_along'],
							'mate_cada_redu_area' => $input['mate_cada_redu_area'],
							'mate_cada_dure' => $input['mate_cada_dure'],
							'mate_cada_impa' => $input['mate_cada_impa'],
							'mate_cada_prof_cama_endu' => $input['mate_cada_prof_cama_endu'],
							'mate_cada_C' => $input['mate_cada_C'],
							'mate_cada_Si' => $input['mate_cada_Si'],
							'mate_cada_Mn' => $input['mate_cada_Mn'],
							'mate_cada_P' => $input['mate_cada_P'],
							'mate_cada_S' => $input['mate_cada_S'],
							'mate_cada_Cr' => $input['mate_cada_Cr'],
							'mate_cada_Ni' => $input['mate_cada_Ni'],
							'mate_cada_Mo' => $input['mate_cada_Mo'],
							'mate_cada_Cu' => $input['mate_cada_Cu'],
							'mate_cada_Al' => $input['mate_cada_Al'],
							'mate_cada_Fe' => $input['mate_cada_Fe'],
							'mate_cada_V' => $input['mate_cada_V'],
							'mate_cada_Co' => $input['mate_cada_Co'],
							'mate_cada_Nb' => $input['mate_cada_Nb'],
							'mate_cada_Ti' => $input['mate_cada_Ti'],
							'mate_cada_W' => $input['mate_cada_W'],
							'mate_cada_Mg' => $input['mate_cada_Mg'],
				  			'mate_cada_Zn' => $input['mate_cada_Zn'],
  							'mate_cada_Pb' => $input['mate_cada_Pb'],
  							'mate_cada_Sb' => $input['mate_cada_Sb'],
  							'mate_cada_Sn' => $input['mate_cada_Sn'],
  							'mate_cada_Ca' => $input['mate_cada_Ca'],
  							'mate_cada_Cl' => $input['mate_cada_Cl'],
  							'mate_cada_N' => $input['mate_cada_N'],
  							'mate_cada_Na' => $input['mate_cada_Na'],
  							'mate_cada_Ceq' => $input['mate_cada_Ceq'],
							'mate_cada_tenant_iden' => $input['mate_cada_tenant_iden'],
							'mate_cada_empre_iden' => $input['mate_cada_empre_iden'],
						);
					}, $Retorno );

					self::$Conn->commit();
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Materiais',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Materiais',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Materiais',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Materiais com erro </br> '.$e->getMessage(),
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
		public static function SetSalvMate( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 62,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 63,
				);
				
				$PermiAlter = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenMate' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenMate' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};

				Materiais::Inicia();

				try {
					if ( $Parametros[ 'IdenMate' ] == 'Automatico' ){
						$Parametros[ 'IdenMate' ] = 0;
					};

					self::$Conn->beginTransaction();

					if ( $Parametros[ 'IdenMate' ] == 0 ){
						$descricao = 'Inclusão de Materiais';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegMate' ] );
					} else {
						$descricao = 'Alteração de Materiais';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegMate' ] );
						$Prepara->bindValue( ':mate_cada_iden', $Parametros[ 'IdenMate' ] );
					};
						
					$Prepara->bindValue( ':mate_cada_descr', Core::UpperCase( $Parametros[ 'DescrMate' ] ) );
					$Prepara->bindValue( ':mate_cada_forne', Core::UpperCase( $Parametros[ 'FabrMate' ] ) );
					$Prepara->bindValue( ':mate_cada_limi_resi', $Parametros[ 'LimiResiMate' ] );
					$Prepara->bindValue( ':mate_cada_limi_esco', $Parametros[ 'LimiEscoMate' ] );
					$Prepara->bindValue( ':mate_cada_along', $Parametros[ 'AlongMate' ] );
					$Prepara->bindValue( ':mate_cada_redu_area', $Parametros[ 'ReduAreaMate' ] );
					$Prepara->bindValue( ':mate_cada_dure', $Parametros[ 'DureMate' ] );
					$Prepara->bindValue( ':mate_cada_impa', $Parametros[ 'ImpactoMate' ] );
					$Prepara->bindValue( ':mate_cada_prof_cama_endu', $Parametros[ 'ProfCamaEnduMate' ] );
					$Prepara->bindValue( ':mate_cada_C', $Parametros[ 'C_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Si', $Parametros[ 'Si_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Mn', $Parametros[ 'Mn_Mate' ] );
					$Prepara->bindValue( ':mate_cada_P', $Parametros[ 'P_Mate' ] );
					$Prepara->bindValue( ':mate_cada_S', $Parametros[ 'S_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Cr', $Parametros[ 'Cr_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Ni', $Parametros[ 'Ni_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Mo', $Parametros[ 'Mo_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Cu', $Parametros[ 'Cu_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Al', $Parametros[ 'Al_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Fe', $Parametros[ 'Fe_Mate' ] );
					$Prepara->bindValue( ':mate_cada_V', $Parametros[ 'V_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Co', $Parametros[ 'Co_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Nb', $Parametros[ 'Nb_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Ti', $Parametros[ 'Ti_Mate' ] );
					$Prepara->bindValue( ':mate_cada_W', $Parametros[ 'W_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Mg', $Parametros[ 'Mg_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Zn', $Parametros[ 'Zn_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Pb', $Parametros[ 'Pb_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Sb', $Parametros[ 'Sb_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Sn', $Parametros[ 'Sn_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Ca', $Parametros[ 'Ca_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Cl', $Parametros[ 'Cl_Mate' ] );
					$Prepara->bindValue( ':mate_cada_N', $Parametros[ 'N_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Na', $Parametros[ 'Na_Mate' ] );
					$Prepara->bindValue( ':mate_cada_Ceq', $Parametros[ 'Ceq_Mate' ] );
					$Prepara->bindValue( ':mate_cada_tenant_iden', $Parametros[ 'TenanMate' ] );
					$Prepara->bindValue( ':mate_cada_empre_iden', $Parametros[ 'EmpreMate' ] );

					$Prepara->execute();
					
					if ( $descricao == 'Inclusão de Materiais' ){
						$Retorno = self::$Conn->lastInsertId().' incluido';
						$Parametros[ 'IdenMate' ] = self::$Conn->lastInsertId();
					} else {
						$Retorno = $Parametros[ 'IdenMate' ].' alterado';
					};

					self::$Conn->commit();
						
					$status = 'sucesso';
					$listreg = 'Registro ID '.$Retorno;

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Materiais',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Materiais',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Materiais com erro </br> '.$e->getMessage(),
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
		public static function SetDeleMate( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {		
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 64,
				);
				
				$PermiDele = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				if ( $PermiDele[ 'status' ] == 'restrito' ){
					return json_encode( $PermiDele	);
				};

				Materiais::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'DeleRegMate' ] );
					$Prepara->bindValue( ':mate_cada_iden', $Parametros[ 'IdenMate' ] );

					$Prepara->execute();
					
					$Retorno = $Parametros[ 'IdenMate' ].' excluido';
						
					self::$Conn->commit();

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Materiais',
						'status' => 'sucesso',
						'descricao' => 'Exclusão de Materiais',
						'listreg' => 'Registro ID '.$Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Materiais',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Materiais com erro </br> '.$e->getMessage(),
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
		public static function GetRegMateTerce( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Materiais::Inicia();

				try {
					if ( $Parametros[ 'mate_cada_tenant_iden' ] == 0 || $Parametros[ 'mate_cada_tenant_iden' ] == '' ){
						$Parametros[ 'mate_cada_tenant_iden' ] = '%%';
					};
	
					if ( $Parametros[ 'mate_cada_empre_iden' ] == 0 || $Parametros[ 'mate_cada_empre_iden' ] == '' ){
						$Parametros[ 'mate_cada_empre_iden' ] = '%%';
					};

					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegMateTerce' ] );

					$Prepara->bindValue( ':mate_cada_tenant_iden', $Parametros[ 'mate_cada_tenant_iden' ] );
					$Prepara->bindValue( ':mate_cada_empre_iden', $Parametros[ 'mate_cada_empre_iden' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						return array(
							'id' => $input['mate_cada_iden'],
							'text' => $input['mate_cada_descr'],
						);
					}, $Retorno );

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Materiais',
						'status' => 'sucesso',
						'descricao' => 'Resultado Terceiro Materiais',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Materiais',
						'status' => 'invalido',
						'descricao' => 'Terceiro Materiais com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>