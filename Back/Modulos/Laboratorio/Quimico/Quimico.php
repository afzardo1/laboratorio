<?php
	namespace Back\Modulos\Laboratorio\Quimico;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Comum\Empresas\Empresas;
	use Back\Modulos\Comum\Usuarios\Usuarios;
	use Back\Modulos\Comum\Anexos\Anexos;
	use Back\Modulos\Laboratorio\Clientes\Clientes;
	use Back\Modulos\Laboratorio\Fabricantes\Fabricantes;
	use Back\Modulos\Laboratorio\Materiais\Materiais;
	use Back\Modulos\Laboratorio\Areas\Areas;

	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas Quimico
 	 * Todas as requisições Quimico passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Quimico
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Quimico {
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
			include_once( 'Quimico.sql.php' );

			self::$RotSql[ 'GetRegQuimi' ] = $GetRegQuimi;
			
			self::$RotSql[ 'InstRegQuimi' ] = $InstRegQuimi;
			self::$RotSql[ 'UpdtRegQuimi' ] = $UpdtRegQuimi;

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
		public static function GetTenanQuimi( $Parametros = array() ){
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
		public static function GetEmpreQuimi( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Empresas::GetEmpreTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados dos Clientes.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetClieQuimi( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Clientes::GetRegClieTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados dos Fabricantes.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetFabrQuimi( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Fabricantes::GetRegFabrTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados dos Materiais.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetMateQuimi( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Materiais::GetRegMateTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados dos Materiais.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetAreaQuimi( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Areas::GetRegAreaTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}
		
		/**
	 	 * Retorna Todos Dados dos Ususarios.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		 public static function GetUsuaQuimi( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Usuarios::GetRegUsuaTerce( $Parametros );
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
		public static function GetQuimi( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Quimico::Inicia();

				if ( $Parametros[ 'amos_cada_tenan' ] == 0 || $Parametros[ 'amos_cada_tenan' ] == '' ){
					$Parametros[ 'amos_cada_tenan' ] = '%%';
				};

				if ( $Parametros[ 'amos_cada_empre' ] == 0 || $Parametros[ 'amos_cada_empre' ] == '' ){
					$Parametros[ 'amos_cada_empre' ] = '%%';
				};

				if ( $Parametros[ 'amos_cada_clie_iden' ] == 0 || $Parametros[ 'amos_cada_clie_iden' ] == '' ){
					$Parametros[ 'amos_cada_clie_iden' ] = '%%';
				};

				if ( $Parametros[ 'amos_cada_fabr_iden' ] == 0 || $Parametros[ 'amos_cada_fabr_iden' ] == '' ){
					$Parametros[ 'amos_cada_fabr_iden' ] = '%%';
				};

				if ( $Parametros[ 'amos_cada_area_iden' ] == 0 || $Parametros[ 'amos_cada_area_iden' ] == '' ){
					$Parametros[ 'amos_cada_area_iden' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$GetRegQuimi = str_replace(
						':FILTRO',
						'( amos_cada_regi LIKE :amos_cada_regi ) AND
						 ( amos_cada_orse LIKE :amos_cada_orse ) AND
						 ( amos_cada_emis >= :amos_cada_emis_ini AND
						   amos_cada_emis <= :amos_cada_emis_fim ) AND
						 ( amos_cada_clie_iden LIKE :amos_cada_clie_iden ) AND
						 ( amos_cada_fabr_iden LIKE :amos_cada_fabr_iden ) AND
						 ( amos_cada_area_iden LIKE :amos_cada_area_iden ) AND
						 ( amos_cada_tenan LIKE :amos_cada_tenan ) AND
						 ( amos_cada_empre LIKE :amos_cada_empre ) AND
						 ( amos_quimi_cada_fina LIKE :amos_quimi_cada_fina OR
						   amos_quimi_cada_fina IS NULL )',
						self::$RotSql[ 'GetRegQuimi' ]
					);

					$Prepara = self::$Conn->prepare( $GetRegQuimi );

					$Prepara->bindValue( ':amos_cada_regi', $Parametros[ 'amos_cada_regi' ] );
					$Prepara->bindValue( ':amos_cada_orse', $Parametros[ 'amos_cada_orse' ] );
					$Prepara->bindValue( ':amos_cada_emis_ini', Core::GetDataMariaDb( $Parametros[ 'amos_cada_emis_ini' ] ).' 00:00:00' );
					$Prepara->bindValue( ':amos_cada_emis_fim', Core::GetDataMariaDb( $Parametros[ 'amos_cada_emis_fim' ] ).' 23:59:59' );
					$Prepara->bindValue( ':amos_cada_clie_iden', $Parametros[ 'amos_cada_clie_iden' ] );
					$Prepara->bindValue( ':amos_cada_fabr_iden', $Parametros[ 'amos_cada_fabr_iden' ] );
					$Prepara->bindValue( ':amos_cada_area_iden', $Parametros[ 'amos_cada_area_iden' ] );
					$Prepara->bindValue( ':amos_cada_tenan', $Parametros[ 'amos_cada_tenan' ] );
					$Prepara->bindValue( ':amos_cada_empre', $Parametros[ 'amos_cada_empre' ] );
					$Prepara->bindValue( ':amos_quimi_cada_fina', $Parametros[ 'amos_quimi_cada_fina' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						$Figura = 'fas fa-eye';
						if ( isset( $input['amos_quimi_cada_boto'] ) == false){
							
							if ( $input['amos_quimi_cada_fina'] == 0 ){
								$Figura = 'fas fa-edit';
							};
							
							$Botao = $Botao.'
								<button id="EditBtnQuimi" type="button" class="btn btn-secondary" title="ALTERAR"><i class="'.$Figura.'"></i></button>
								<button id="ImprBtnQuimi" type="button" class="btn btn-success" title="IMPRIMIR"><i class="fas fa-print"></i></button>
							';
						};
						
						return array(
							'amos_quimi_cada_boto' => $Botao,
							'amos_cada_iden' => $input['amos_cada_iden'],
							'amos_cada_regi' => $input['amos_cada_regi'],
							'amos_cada_orse' => $input['amos_cada_orse'],
							'clie_cada_nome' => $input['clie_cada_nome'],
							'fabr_cada_nome' => $input['fabr_cada_nome'],
							'mate_cada_descr' => $input['mate_cada_descr'],
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
							'area_cada_descr' => $input['area_cada_descr'],
							'amos_cada_emis' => $input['amos_cada_emis'],
							'amos_cada_descr' => $input['amos_cada_descr'],
							'amos_cada_local' => $input['amos_cada_local'],
							'amos_cada_tenan' => $input['amos_cada_tenan'],
							'amos_cada_empre' => $input['amos_cada_empre'],
							'amos_quimi_cada_iden' => $input['amos_quimi_cada_iden'],
							'amos_quimi_cada_qtde' => $input['amos_quimi_cada_qtde'],
							'amos_quimi_cada_result' => $input['amos_quimi_cada_result'],
							'amos_quimi_cada_espe_C' => $input['amos_quimi_cada_espe_C'],
							'amos_quimi_cada_obti_C' => $input['amos_quimi_cada_obti_C'],
							'amos_quimi_cada_espe_Si' => $input['amos_quimi_cada_espe_Si'],
							'amos_quimi_cada_obti_Si' => $input['amos_quimi_cada_obti_Si'],
  							'amos_quimi_cada_espe_Mn' => $input['amos_quimi_cada_espe_Mn'],
  							'amos_quimi_cada_obti_Mn' => $input['amos_quimi_cada_obti_Mn'],
  							'amos_quimi_cada_espe_P' => $input['amos_quimi_cada_espe_P'],
  							'amos_quimi_cada_obti_P' => $input['amos_quimi_cada_obti_P'],
  							'amos_quimi_cada_espe_S' => $input['amos_quimi_cada_espe_S'],
  							'amos_quimi_cada_obti_S' => $input['amos_quimi_cada_obti_S'],
  							'amos_quimi_cada_espe_Cr' => $input['amos_quimi_cada_espe_Cr'],
  							'amos_quimi_cada_obti_Cr' => $input['amos_quimi_cada_obti_Cr'],
  							'amos_quimi_cada_espe_Ni' => $input['amos_quimi_cada_espe_Ni'],
  							'amos_quimi_cada_obti_Ni' => $input['amos_quimi_cada_obti_Ni'],
  							'amos_quimi_cada_espe_Mo' => $input['amos_quimi_cada_espe_Mo'],
  							'amos_quimi_cada_obti_Mo' => $input['amos_quimi_cada_obti_Mo'],
  							'amos_quimi_cada_espe_Cu' => $input['amos_quimi_cada_espe_Cu'],
  							'amos_quimi_cada_obti_Cu' => $input['amos_quimi_cada_obti_Cu'],
  							'amos_quimi_cada_espe_Al' => $input['amos_quimi_cada_espe_Al'],
  							'amos_quimi_cada_obti_Al' => $input['amos_quimi_cada_obti_Al'],
  							'amos_quimi_cada_espe_Fe' => $input['amos_quimi_cada_espe_Fe'],
  							'amos_quimi_cada_obti_Fe' => $input['amos_quimi_cada_obti_Fe'],
  							'amos_quimi_cada_espe_V' => $input['amos_quimi_cada_espe_V'],
  							'amos_quimi_cada_obti_V' => $input['amos_quimi_cada_obti_V'],
  							'amos_quimi_cada_espe_Co' => $input['amos_quimi_cada_espe_Co'],
  							'amos_quimi_cada_obti_Co' => $input['amos_quimi_cada_obti_Co'],
  							'amos_quimi_cada_espe_Nb' => $input['amos_quimi_cada_espe_Nb'],
  							'amos_quimi_cada_obti_Nb' => $input['amos_quimi_cada_obti_Nb'],
  							'amos_quimi_cada_espe_Ti' => $input['amos_quimi_cada_espe_Ti'],
  							'amos_quimi_cada_obti_Ti' => $input['amos_quimi_cada_obti_Ti'],
  							'amos_quimi_cada_espe_W' => $input['amos_quimi_cada_espe_W'],
  							'amos_quimi_cada_obti_W' => $input['amos_quimi_cada_obti_W'],
  							'amos_quimi_cada_espe_Mg' => $input['amos_quimi_cada_espe_Mg'],
  							'amos_quimi_cada_obti_Mg' => $input['amos_quimi_cada_obti_Mg'],
  							'amos_quimi_cada_espe_Zn' => $input['amos_quimi_cada_espe_Zn'],
  							'amos_quimi_cada_obti_Zn' => $input['amos_quimi_cada_obti_Zn'],
  							'amos_quimi_cada_espe_Pb' => $input['amos_quimi_cada_espe_Pb'],
  							'amos_quimi_cada_obti_Pb' => $input['amos_quimi_cada_obti_Pb'],
  							'amos_quimi_cada_espe_Sb' => $input['amos_quimi_cada_espe_Sb'],
  							'amos_quimi_cada_obti_Sb' => $input['amos_quimi_cada_obti_Sb'],
  							'amos_quimi_cada_espe_Sn' => $input['amos_quimi_cada_espe_Sn'],
  							'amos_quimi_cada_obti_Sn' => $input['amos_quimi_cada_obti_Sn'],
  							'amos_quimi_cada_espe_Ca' => $input['amos_quimi_cada_espe_Ca'],
  							'amos_quimi_cada_obti_Ca' => $input['amos_quimi_cada_obti_Ca'],
  							'amos_quimi_cada_espe_Cl' => $input['amos_quimi_cada_espe_Cl'],
  							'amos_quimi_cada_obti_Cl' => $input['amos_quimi_cada_obti_Cl'],
  							'amos_quimi_cada_espe_N' => $input['amos_quimi_cada_espe_N'],
  							'amos_quimi_cada_obti_N' => $input['amos_quimi_cada_obti_N'],
  							'amos_quimi_cada_espe_Na' => $input['amos_quimi_cada_espe_Na'],
  							'amos_quimi_cada_obti_Na' => $input['amos_quimi_cada_obti_Na'],
  							'amos_quimi_cada_espe_Ceq' => $input['amos_quimi_cada_espe_Ceq'],
  							'amos_quimi_cada_obti_Ceq' => $input['amos_quimi_cada_obti_Ceq'],
							'amos_quimi_cada_obs' => $input['amos_quimi_cada_obs'],
							'amos_quimi_cada_fina' => $input['amos_quimi_cada_fina'],
							'amos_quimi_cada_fina_data' => $input['amos_quimi_cada_fina_data'],
							'amos_quimi_cada_fina_usua_iden' => $input['amos_quimi_cada_fina_usua_iden'],
						);
					}, $Retorno );
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Quimico',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Quimico',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Quimico',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Quimico com erro </br> '.$e->getMessage(),
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
		public static function SetSalvQuimi( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 112,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 113,
				);
				
				$PermiAlter = Usuarios::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenQuimi' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenQuimi' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};
				Quimico::Inicia();

				try {
					
					if ( $Parametros[ 'IdenQuimi' ] == 'Automatico' ){
						$Parametros[ 'IdenQuimi' ] = 0;
					};

					self::$Conn->beginTransaction();

					if ( $Parametros[ 'IdenQuimi' ] == 0 ){
						$descricao = 'Inclusão de Quimico';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegQuimi' ] );
					} else {
						$descricao = 'Alteração de Quimico';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegQuimi' ] );
						$Prepara->bindValue( ':amos_quimi_cada_iden', $Parametros[ 'IdenQuimi' ] );
					};

					$Prepara->bindValue( ':amos_quimi_cada_amos_iden', $Parametros[ 'IdenAmos' ] );
					$Prepara->bindValue( ':amos_quimi_cada_qtde', str_replace( '.', '', $Parametros[ 'QtdeQuimi' ] ) );
					$Prepara->bindValue( ':amos_quimi_cada_result', $Parametros[ 'ResulQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_C', $Parametros[ 'EspeCQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_C', $Parametros[ 'ObitCQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Si', $Parametros[ 'EspeSiQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Si', $Parametros[ 'ObitSiQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Mn', $Parametros[ 'EspeMnQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Mn', $Parametros[ 'ObitMnQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_P', $Parametros[ 'EspePQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_P', $Parametros[ 'ObitPQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_S', $Parametros[ 'EspeSQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_S', $Parametros[ 'ObitSQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Cr', $Parametros[ 'EspeCrQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Cr', $Parametros[ 'ObitCrQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Ni', $Parametros[ 'EspeNiQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Ni', $Parametros[ 'ObitNiQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Mo', $Parametros[ 'EspeMoQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Mo', $Parametros[ 'ObitMoQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Cu', $Parametros[ 'EspeCuQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Cu', $Parametros[ 'ObitCuQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Al', $Parametros[ 'EspeAlQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Al', $Parametros[ 'ObitAlQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Fe', $Parametros[ 'EspeFeQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Fe', $Parametros[ 'ObitFeQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_V', $Parametros[ 'EspeVQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_V', $Parametros[ 'ObitVQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Co', $Parametros[ 'EspeCoQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Co', $Parametros[ 'ObitCoQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Nb', $Parametros[ 'EspeNbQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Nb', $Parametros[ 'ObitNbQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Ti', $Parametros[ 'EspeTiQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Ti', $Parametros[ 'ObitTiQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_W', $Parametros[ 'EspeWQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_W', $Parametros[ 'ObitWQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Mg', $Parametros[ 'EspeMgQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Mg', $Parametros[ 'ObitMgQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Zn', $Parametros[ 'EspeZnQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Zn', $Parametros[ 'ObitZnQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Pb', $Parametros[ 'EspePbQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Pb', $Parametros[ 'ObitPbQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Sb', $Parametros[ 'EspeSbQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Sb', $Parametros[ 'ObitSbQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Sn', $Parametros[ 'EspeSnQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Sn', $Parametros[ 'ObitSnQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Ca', $Parametros[ 'EspeCaQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Ca', $Parametros[ 'ObitCaQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Cl', $Parametros[ 'EspeClQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Cl', $Parametros[ 'ObitClQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_N', $Parametros[ 'EspeNQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_N', $Parametros[ 'ObitNQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Na', $Parametros[ 'EspeNaQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Na', $Parametros[ 'ObitNaQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Ceq', $Parametros[ 'EspeCeqQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Ceq', $Parametros[ 'ObitCeqQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_espe_Pb', $Parametros[ 'EspePbQuimi' ] );
					$Prepara->bindValue( 'amos_quimi_cada_obti_Pb', $Parametros[ 'ObitPbQuimi' ] );
					$Prepara->bindValue( ':amos_quimi_cada_obs',  Core::UpperCase( $Parametros[ 'ObseQuimi' ] ) );
					$Prepara->bindValue( ':amos_quimi_cada_fina', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'FinaQuimi' ] ) );
					if ( $Parametros[ 'FinaQuimi' ] == 'true' ){
						$Prepara->bindValue( ':amos_quimi_cada_fina_data', Core::GetDataMariaDb( $Parametros[ 'DatFinaQuimi' ] ) );
						$Prepara->bindValue( ':amos_quimi_cada_fina_usua_iden', $Parametros[ 'ExcutQuimi' ] );
					} else {
						$Prepara->bindValue( ':amos_quimi_cada_fina_data', 'NULL' );
						$Prepara->bindValue( ':amos_quimi_cada_fina_usua_iden', 'NULL' );
					}
					$Prepara->execute();
					
					if ( $descricao == 'Inclusão de Quimico' ){
						$Retorno = self::$Conn->lastInsertId().' incluido';
						$Parametros[ 'IdenQuimi' ] = self::$Conn->lastInsertId();
					} else {
						$Retorno = $Parametros[ 'IdenQuimi' ].' alterado';
					};


					$RetorAnexos = Anexos::SetSalvAnex( $Parametros[ 'AnexosQuimi' ], $Parametros[ 'anexo_ensa_tabe' ], $Parametros[ 'IdenQuimi' ], self::$Conn );

					self::$Conn->commit();

					if ( $RetorAnexos['status'] == 'sucesso' ) {
							
						$status = 'sucesso';
						$listreg = 'Registro ID '.$Retorno;

						return json_encode( array(
							'sistema' => Core::config( 'system_apelido' ),
							'modulo' => 'Quimico',
							'status' => $status,
							'descricao' => $descricao,
							'listreg' => $listreg,
						));
					} else {
						return json_encode( $RetorAnexos );
					};
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Quimico',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Quimico com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Gera PDF a amostra cadastrada
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return integer Ultimo id
		 * @access public
		*/
		public static function SetImpreQuimi( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Quimico::Inicia();

				try{
					self::$Conn->beginTransaction();

					$GetRegMeta = str_replace(
						':FILTRO',
						'( amos_cada_iden = :amos_cada_iden )', 
						self::$RotSql[ 'GetRegQuimi' ]
					);
					
					$Prepara = self::$Conn->prepare( $GetRegMeta );
					$Prepara->bindValue( ':amos_cada_iden', $Parametros[ 'IdenQuimi' ] );
					
					$Prepara->execute();

					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
					
					$Cabecalho = '
						<table border="0" style="border-collapse: collapse">
        					<tr>
          						<td width="100" height="100" align="center"></td>
	          					<td width="580" align="center">
    	        					<span style="font-size: 15pt"><b> DUREZA </b></span>
        	  					</td>
              				</tr>
							<tr>
          						<td width="681">
									<hr style="height:1px; border:none; color:#000; background-color:#000"/>
								</td>
							</tr>
      					</table>
					';

					$amos_quimi_cada_result = '';

					if ( $Retorno[0]['amos_quimi_cada_result'] != -1 ){
						$amos_quimi_cada_result = str_replace(
							array( 0, 1, 2, 3 ), 
							array( 'REPROVADO', 'INFORMATIVO', 'TOLERAVEL', 'APROVADO' ),
							$Retorno[0]['amos_quimi_cada_result']
						);
					};

					$amos_quimi_cada_fina_data = '';
					if ( $Retorno[0]['amos_quimi_cada_fina_data'] != '' && $Retorno[0]['amos_quimi_cada_fina_data'] != '0000-00-00 00:00:00' ){
						$amos_quimi_cada_fina_data = date( Core::config( 'date_format' ), strtotime( $Retorno[0]['amos_quimi_cada_fina_data'] ) );
					};

					$Corpo = '
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">
        					<tr>
          						<td width="170"> <b>R.G.: </b>'.$Retorno[0]['amos_cada_regi'].'</td>
	          					<td width="170"> <b>O.S.: </b>'.$Retorno[0]['amos_cada_orse'].'</td>
          						<td width="170"> <b>Emissão: </b>'.date( Core::config( 'date_format' ), strtotime( $Retorno[0]['amos_cada_emis'] ) ).'</td>
	          					<td width="170"> <b>Local: '.$Retorno[0]['amos_cada_local'].'</b></td>
              				</tr>
							<tr>
							  <td width="340"> <b>Cliente: </b>'.$Retorno[0]['clie_cada_nome'].'</td>
							  <td width="340"> <b>Fabricante: </b>'.$Retorno[0]['fabr_cada_nome'].'</td>
						 	</tr>
							<tr>
								<td width="340"> <b>Material: </b>'.$Retorno[0]['mate_cada_descr'].'</td>
							 	<td width="340"> <b>Área: </b>'.$Retorno[0]['area_cada_descr'].'</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">		
							<tr>
								<td width="340"> <b>Quantidade: </b>'.$Retorno[0]['amos_quimi_cada_qtde'].'</td>
								<td width="340" align="center" style="background-color:#d5d6d8;"> <b>Quimico: </b>'.$amos_quimi_cada_result.'</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">		
							<tr>
								<td width="170"> <b>Especificado </b> </td>
								<td width="170"> <b>Obtido </b> </td>
								<td width="170"> <b>Especificado </b> </td>
								<td width="170"> <b>Obtido </b> </td>
							</tr>
							<tr>
								<td width="170"> <b>C: </b>'.$Retorno[0]['amos_quimi_cada_espe_C'].'</td>
								<td width="170"> <b>C: </b>'.$Retorno[0]['amos_quimi_cada_obti_C'].'</td>
								<td width="170"> <b>Si: </b>'.$Retorno[0]['amos_quimi_cada_espe_Si'].'</td>
								<td width="170"> <b>Si: </b>'.$Retorno[0]['amos_quimi_cada_obti_Si'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>Mn: </b>'.$Retorno[0]['amos_quimi_cada_espe_Mn'].'</td>
								<td width="170"> <b>Mn: </b>'.$Retorno[0]['amos_quimi_cada_obti_Mn'].'</td>
								<td width="170"> <b>P: </b>'.$Retorno[0]['amos_quimi_cada_espe_P'].'</td>
								<td width="170"> <b>P: </b>'.$Retorno[0]['amos_quimi_cada_obti_P'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>S: </b>'.$Retorno[0]['amos_quimi_cada_espe_S'].'</td>
								<td width="170"> <b>S: </b>'.$Retorno[0]['amos_quimi_cada_obti_S'].'</td>
								<td width="170"> <b>Cr: </b>'.$Retorno[0]['amos_quimi_cada_espe_Cr'].'</td>
								<td width="170"> <b>Cr: </b>'.$Retorno[0]['amos_quimi_cada_obti_Cr'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>Ni: </b>'.$Retorno[0]['amos_quimi_cada_espe_Ni'].'</td>
								<td width="170"> <b>Ni: </b>'.$Retorno[0]['amos_quimi_cada_obti_Ni'].'</td>
								<td width="170"> <b>Mo: </b>'.$Retorno[0]['amos_quimi_cada_espe_Mo'].'</td>
								<td width="170"> <b>Mo: </b>'.$Retorno[0]['amos_quimi_cada_obti_Mo'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>Cu: </b>'.$Retorno[0]['amos_quimi_cada_espe_Cu'].'</td>
								<td width="170"> <b>Cu: </b>'.$Retorno[0]['amos_quimi_cada_obti_Cu'].'</td>
								<td width="170"> <b>Al: </b>'.$Retorno[0]['amos_quimi_cada_espe_Al'].'</td>
								<td width="170"> <b>Al: </b>'.$Retorno[0]['amos_quimi_cada_obti_Al'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>Fe: </b>'.$Retorno[0]['amos_quimi_cada_espe_Fe'].'</td>
								<td width="170"> <b>Fe: </b>'.$Retorno[0]['amos_quimi_cada_obti_Fe'].'</td>
								<td width="170"> <b>V: </b>'.$Retorno[0]['amos_quimi_cada_espe_V'].'</td>
								<td width="170"> <b>V: </b>'.$Retorno[0]['amos_quimi_cada_obti_V'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>Co: </b>'.$Retorno[0]['amos_quimi_cada_espe_Co'].'</td>
								<td width="170"> <b>Co: </b>'.$Retorno[0]['amos_quimi_cada_obti_Co'].'</td>
								<td width="170"> <b>Nb: </b>'.$Retorno[0]['amos_quimi_cada_espe_Nb'].'</td>
								<td width="170"> <b>Nb: </b>'.$Retorno[0]['amos_quimi_cada_obti_Nb'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>Ti: </b>'.$Retorno[0]['amos_quimi_cada_espe_Ti'].'</td>
								<td width="170"> <b>Ti: </b>'.$Retorno[0]['amos_quimi_cada_obti_Ti'].'</td>
								<td width="170"> <b>W: </b>'.$Retorno[0]['amos_quimi_cada_espe_W'].'</td>
								<td width="170"> <b>W: </b>'.$Retorno[0]['amos_quimi_cada_obti_W'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>Mg: </b>'.$Retorno[0]['amos_quimi_cada_espe_Mg'].'</td>
								<td width="170"> <b>Mg: </b>'.$Retorno[0]['amos_quimi_cada_obti_Mg'].'</td>
								<td width="170"> <b>Zn: </b>'.$Retorno[0]['amos_quimi_cada_espe_Zn'].'</td>
								<td width="170"> <b>Zn: </b>'.$Retorno[0]['amos_quimi_cada_obti_Zn'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>Sb: </b>'.$Retorno[0]['amos_quimi_cada_espe_Sb'].'</td>
								<td width="170"> <b>Sb: </b>'.$Retorno[0]['amos_quimi_cada_obti_Sb'].'</td>
								<td width="170"> <b>Sn: </b>'.$Retorno[0]['amos_quimi_cada_espe_Sn'].'</td>
								<td width="170"> <b>Sn: </b>'.$Retorno[0]['amos_quimi_cada_obti_Sn'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>Ca: </b>'.$Retorno[0]['amos_quimi_cada_espe_Ca'].'</td>
								<td width="170"> <b>Ca: </b>'.$Retorno[0]['amos_quimi_cada_obti_Ca'].'</td>
								<td width="170"> <b>Cl: </b>'.$Retorno[0]['amos_quimi_cada_espe_Cl'].'</td>
								<td width="170"> <b>Cl: </b>'.$Retorno[0]['amos_quimi_cada_obti_Cl'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>N: </b>'.$Retorno[0]['amos_quimi_cada_espe_N'].'</td>
								<td width="170"> <b>N: </b>'.$Retorno[0]['amos_quimi_cada_obti_N'].'</td>
								<td width="170"> <b>Na: </b>'.$Retorno[0]['amos_quimi_cada_espe_Na'].'</td>
								<td width="170"> <b>Na: </b>'.$Retorno[0]['amos_quimi_cada_obti_Na'].'</td>
							</tr>
							<tr>
								<td width="170"> <b>Ceq: </b>'.$Retorno[0]['amos_quimi_cada_espe_Ceq'].'</td>
								<td width="170"> <b>Ceq: </b>'.$Retorno[0]['amos_quimi_cada_obti_Ceq'].'</td>
								<td width="170"> <b>Pb: </b>'.$Retorno[0]['amos_quimi_cada_espe_Pb'].'</td>
								<td width="170"> <b>Pb: </b>'.$Retorno[0]['amos_quimi_cada_obti_Pb'].'</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 9pt">
							<tr>
								<td width="680" style="height:97px">
									 <b>Descrição</b>
								 	<br>
								 	 '.nl2br( $Retorno[0]['amos_cada_descr'] ).'
								</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 9pt">
							<tr>
								<td width="680" style="height:97px">
									 <b>Observação</b>
									<br>
									 '.nl2br( $Retorno[0]['amos_quimi_cada_obs'] ).'
								</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">
							<tr>
								<td width="125"> <b>Finalizado ?: </b>'.str_replace( array( 0, 1 ), array( 'NÃO', 'SIM' ), $Retorno[0]['amos_quimi_cada_fina'] ).'</td>
								<td width="180"> <b>Finalizado Em: </b>'.$amos_quimi_cada_fina_data.'</td>
								<td width="375"> <b>Realizado Por: </b>'.$Retorno[0]['usua_cada_nome'].'</td>
							</tr>
						</table>
					';

					$listreg = Core::SetGeraPdf(
						$Cabecalho,
						$Corpo,
						str_replace( array( 'Back\Modulos\Laboratorio\Quimico', 'Back/Modulos/Laboratorio/Quimico' ), '', __DIR__ ).'Imagem/'.$Retorno[0]['sis_para_logo'],
						'P',
						'SIMPLES',
						array( 10, 40, 10, 5 )
					);

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Quimico',
						'status' => 'sucesso',
						'descricao' => 'Impressão de Quimico',
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Quimico',
						'status' => 'invalido',
						'descricao' => 'Impressão de Quimico com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Exclui arquivos.
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return boolean
		 * @access public
		*/
		public static function SetExclArqu( $Parametros = array() ){
			try{
				Core::GetExclArqu( $Parametros['ArquiExcl'] );
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Quimico',
					'status' => 'sucesso',
					'descricao' => 'Exclusão de Arquivo',
					'listreg' => true,
				));
			} catch ( PDOException $e ) {
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Quimico',
					'status' => 'invalido',
					'descricao' => 'Exclusão de Arquivo com erro </br> '.$e->getMessage(),
					'listreg' => false,
				));
			};
		}
	}
?>