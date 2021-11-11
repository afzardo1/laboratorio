<?php
	namespace Back\Modulos\Laboratorio\Amostras;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Comum\Empresas\Empresas;
	use Back\Modulos\Laboratorio\Clientes\Clientes;
	use Back\Modulos\Laboratorio\Fabricantes\Fabricantes;
	use Back\Modulos\Laboratorio\Materiais\Materiais;
	use Back\Modulos\Laboratorio\Areas\Areas;

	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas das Amostras
 	 * Todas as requisições dos amostras passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Amostras
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Amostras {
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
			include_once( 'Amostras.sql.php' );

			self::$RotSql[ 'GetRegAmos' ] = $GetRegAmos;
			
			self::$RotSql[ 'InstRegAmos' ] = $InstRegAmos;
			self::$RotSql[ 'UpdtRegAmos' ] = $UpdtRegAmos;

			self::$RotSql[ 'DeleRegAmos' ] = $DeleRegAmos;

			self::$RotSql[ 'GetStatAmos' ] = $GetStatAmos;

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
		public static function GetTenanAmos( $Parametros = array() ){
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
		public static function GetEmpreAmos( $Parametros = array() ){
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
		public static function GetClieAmos( $Parametros = array() ){
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
		public static function GetFabrAmos( $Parametros = array() ){
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
		public static function GetMateAmos( $Parametros = array() ){
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
		public static function GetAreaAmos( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Areas::GetRegAreaTerce( $Parametros );
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
		public static function GetAmos( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Amostras::Inicia();

				if ( $Parametros[ 'amos_cada_tenan' ] == 0 || $Parametros[ 'amos_cada_tenan' ] == '' ){
					$Parametros[ 'amos_cada_tenan' ] = '%%';
				};

				if ( $Parametros[ 'amos_cada_empre' ] == 0 || $Parametros[ 'amos_cada_empre' ] == '' ){
					$Parametros[ 'amos_cada_empre' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$SqlGetRegAmos = str_replace(
						':FILTRO',
						'( amos_cada_regi LIKE :amos_cada_regi ) AND
						( amos_cada_orse LIKE :amos_cada_orse ) AND
						( amos_cada_emis >= :amos_cada_emis_ini AND
					  	  amos_cada_emis <= :amos_cada_emis_fim ) AND
						( amos_cada_tenan LIKE :amos_cada_tenan ) AND
						( amos_cada_empre LIKE :amos_cada_empre )', self::$RotSql[ 'GetRegAmos' ] );
					
					$Prepara = self::$Conn->prepare( $SqlGetRegAmos );

					$Prepara->bindValue( ':amos_cada_regi', $Parametros[ 'amos_cada_regi' ] );
					$Prepara->bindValue( ':amos_cada_orse', $Parametros[ 'amos_cada_orse' ] );
					$Prepara->bindValue( ':amos_cada_emis_ini', Core::GetDataMariaDb( $Parametros[ 'amos_cada_emis_ini' ] ).' 00:00:00' );
					$Prepara->bindValue( ':amos_cada_emis_fim', Core::GetDataMariaDb( $Parametros[ 'amos_cada_emis_fim' ] ).' 23:59:59' );
					$Prepara->bindValue( ':amos_cada_tenan', $Parametros[ 'amos_cada_tenan' ] );
					$Prepara->bindValue( ':amos_cada_empre', $Parametros[ 'amos_cada_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						$Figura = 'fas fa-eye';
						if ( isset( $input['amos_cada_boto'] ) == false){
							
							if ( $input['amos_cada_stat'] == 0 ){
								$Figura = 'fas fa-edit';
							};
							
							$Botao = $Botao.'
								<button id="EditBtnAmos" type="button" class="btn btn-secondary" title="ALTERAR"><i class="'.$Figura.'"></i></button>
								<button id="DeleBtnAmos" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-minus"></i></button>
								<button id="ImprBtnAmos" type="button" class="btn btn-secondary" title="IMPRIMIR"><i class="fas fa-print"></i></button>
							';
						};

						return array(
							'amos_cada_boto' => $Botao,
							'amos_cada_iden' => $input['amos_cada_iden'],
							'amos_cada_regi' => $input['amos_cada_regi'],
							'amos_cada_orse' => $input['amos_cada_orse'],
							'amos_cada_clie_iden' => $input['amos_cada_clie_iden'],
							'amos_cada_fabr_iden' => $input['amos_cada_fabr_iden'],
							'amos_cada_mate_iden' => $input['amos_cada_mate_iden'],
							'amos_cada_area_iden' => $input['amos_cada_area_iden'],
							'amos_cada_emis' => $input['amos_cada_emis'],
							'amos_cada_descr' => $input['amos_cada_descr'],
							'amos_cada_usua_iden' => $input['amos_cada_usua_iden'],
							'usua_cada_nome' => $input['usua_cada_nome'],
							'amos_cada_corde' => $input['amos_cada_corde'],
							'amos_cada_priori' => $input['amos_cada_priori'],
							'amos_cada_conta' => $input['amos_cada_conta'],
							'amos_cada_distri' => $input['amos_cada_distri'],
							'amos_cada_obser' => $input['amos_cada_obser'],
							'amos_cada_metalo' => $input['amos_cada_metalo'],
							'amos_cada_metalo_final' => $input['amos_cada_metalo_final'],
							'amos_cada_quimica' => $input['amos_cada_quimica'],
							'amos_cada_quimica_final' => $input['amos_cada_quimica_final'],
							'amos_cada_tracao_1' => $input['amos_cada_tracao_1'],
							'amos_cada_tracao_2' => $input['amos_cada_tracao_2'],
							'amos_cada_dureza' => $input['amos_cada_dureza'],
							'amos_cada_dureza_final' => $input['amos_cada_dureza_final'],
							'amos_cada_charp' => $input['amos_cada_charp'],
							'amos_cada_charp_final' => $input['amos_cada_charp_final'],							
							'amos_cada_achat_expan' => $input['amos_cada_achat_expan'],
							'amos_cada_achat_final' => $input['amos_cada_achat_final'],
							'amos_cada_expan_final' => $input['amos_cada_expan_final'],
							'amos_cada_pce' => $input['amos_cada_pce'],
							'amos_cada_pce_final' => $input['amos_cada_pce_final'],
							'amos_cada_dobram_2cps' => $input['amos_cada_dobram_2cps'],
							'amos_cada_dobram_2cps_final' => $input['amos_cada_dobram_2cps_final'],
							'amos_cada_dobram_4cps' => $input['amos_cada_dobram_4cps'],
							'amos_cada_dobram_4cps_final' => $input['amos_cada_dobram_4cps_final'],
							'amos_cada_macrog' => $input['amos_cada_macrog'],
							'amos_cada_macrog_final' => $input['amos_cada_macrog_final'],							
							'amos_cada_campo_metalo' => $input['amos_cada_campo_metalo'],
							'amos_cada_campo_metalo_final' => $input['amos_cada_campo_metalo_final'],							
							'amos_cada_campo_quimica' => $input['amos_cada_campo_quimica'],
							'amos_cada_campo_quimica_final' => $input['amos_cada_campo_quimica_final'],							
							'amos_cada_forne_tracao' => $input['amos_cada_forne_tracao'],

							'amos_cada_forne_dureza' => $input['amos_cada_forne_dureza'],
							'amos_cada_forne_dureza_final' => $input['amos_cada_forne_dureza_final'],
							'amos_cada_forne_charp' => $input['amos_cada_forne_charp'],
							'amos_cada_forne_charp_final' => $input['amos_cada_forne_charp_final'],
							'amos_cada_tenan' => $input['amos_cada_tenan'],
							'amos_cada_empre' => $input['amos_cada_empre'],
							'amos_cada_stat' => $input['amos_cada_stat'],
							'amos_cada_situ' => $input['amos_cada_situ'],
						);
					}, $Retorno );
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Amostras',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Amostras',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Amostras',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Amostras com erro </br> '.$e->getMessage(),
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
		public static function SetSalvAmos( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 82,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 83,
				);
				
				$PermiAlter = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenAmos' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenAmos' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};

				Amostras::Inicia();

				try {
					
					if ( $Parametros[ 'IdenAmos' ] == 'Automatico' ){
						$Parametros[ 'IdenAmos' ] = 0;
					};

					self::$Conn->beginTransaction();

					$PrepStat = self::$Conn->prepare( self::$RotSql[ 'GetStatAmos' ] );
					$PrepStat->bindValue( ':amos_cada_iden', $Parametros[ 'IdenAmos' ] );
					
					$PrepStat->execute();

					$Retorno = $PrepStat->fetchAll( PDO::FETCH_ASSOC );

					if( ( is_array( $Retorno ) == true ) && ( empty( $Retorno ) == false ) ){
						$descricao = 'Manutenção de Amostras';
						$status = 'status';
						if ( $Retorno[0][ 'amos_cada_stat' ] == 1  ){
							$listreg = 'Registro '.$Parametros[ 'RGAmos' ].' em Andamento';
						} else if ( $Retorno[0][ 'amos_cada_stat' ] == 2  ){
							$listreg = 'Registro '.$Parametros[ 'RGAmos' ].' Concluido';
						};

					} else {
						if ( $Parametros[ 'IdenAmos' ] == 0 ){
							$descricao = 'Inclusão de Amostras';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegAmos' ] );
						} else {
							$descricao = 'Alteração de Amostras';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegAmos' ] );
							$Prepara->bindValue( ':amos_cada_iden', $Parametros[ 'IdenAmos' ] );
						};
						
						$Prepara->bindValue( ':amos_cada_regi', Core::UpperCase( $Parametros[ 'RGAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_orse', Core::UpperCase( $Parametros[ 'OSAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_clie_iden', $Parametros[ 'ClieAmos' ] );
						$Prepara->bindValue( ':amos_cada_fabr_iden', $Parametros[ 'FabrAmos' ] );
						$Prepara->bindValue( ':amos_cada_mate_iden', $Parametros[ 'MateAmos' ] );
						$Prepara->bindValue( ':amos_cada_area_iden', $Parametros[ 'AreaAmos' ] );
						$Prepara->bindValue( ':amos_cada_emis', Core::GetDataMariaDb( $Parametros[ 'EmisAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_descr', Core::UpperCase( $Parametros[ 'DescrAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_usua_iden', $Parametros[ 'CadaPorAmos' ] );
						$Prepara->bindValue( ':amos_cada_corde', Core::GetDataMariaDb( $Parametros[ 'CordeAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_priori', $Parametros[ 'PrioAmos' ] );
						$Prepara->bindValue( ':amos_cada_conta',  Core::UpperCase( $Parametros[ 'ContaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_distri', Core::LowerCase( $Parametros[ 'DistrAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_obser', Core::UpperCase( $Parametros[ 'ObsAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_metalo', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'MetaEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_quimica', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'QuimiEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_tracao_1', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'Trac1EnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_tracao_2', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'Trac2EnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_dureza', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'DureEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_charp', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'CharpEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_achat_expan', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'AchatExpanEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_pce', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'TPCEEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_dobram_2cps', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'Dobram2EnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_dobram_4cps', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'Dobram4EnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_macrog', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'MacroEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_campo_metalo', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'MetaCampoEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_campo_quimica', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'QuimiCampoEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_forne_tracao', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'TracaForneEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_forne_dureza', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'DureForneEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_forne_charp', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'CharpForneEnsaAmos' ] ) );
						$Prepara->bindValue( ':amos_cada_tenan', $Parametros[ 'TenanAmos' ] );
						$Prepara->bindValue( ':amos_cada_empre', $Parametros[ 'EmpreAmos' ] );

						$Prepara->execute();
						
						if ( $descricao == 'Inclusão de Amostras' ){
							$Retorno = self::$Conn->lastInsertId().' incluido';
							$Parametros[ 'IdenAmos' ] = self::$Conn->lastInsertId();
						} else {
							$Retorno = $Parametros[ 'IdenAmos' ].' alterado';
						};

						self::$Conn->commit();
							
						$status = 'sucesso';
						$listreg = 'Registro ID '.$Retorno;
					};

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Amostras',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Amostras',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Amostras com erro </br> '.$e->getMessage(),
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
		public static function SetDeleAmos( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 84,
				);
				
				$PermiDele = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				if ( $PermiDele[ 'status' ] == 'restrito' ){
					return json_encode( $PermiDele	);
				};

				Amostras::Inicia();

				try {
					self::$Conn->beginTransaction();

					$PrepStat = self::$Conn->prepare( self::$RotSql[ 'GetStatAmos' ] );
					$PrepStat->bindValue( ':amos_cada_iden', $Parametros[ 'IdenAmos' ] );
					
					$PrepStat->execute();

					$Retorno = $PrepStat->fetchAll( PDO::FETCH_ASSOC );

					if( ( is_array( $Retorno ) == true ) && ( empty( $Retorno ) == false ) ){
						$descricao = 'Manutenção de Amostras';
						$status = 'status';
						if ( $Retorno[0][ 'amos_cada_stat' ] == 1  ){
							$listreg = 'Registro '.$Parametros[ 'RGAmos' ].' em Andamento';
						} else if ( $Retorno[0][ 'amos_cada_stat' ] == 2  ){
							$listreg = 'Registro '.$Parametros[ 'RGAmos' ].' Concluido';
						};
					} else {
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'DeleRegAmos' ] );
						$Prepara->bindValue( ':amos_cada_iden', $Parametros[ 'IdenAmos' ] );

						$Prepara->execute();
					
						$listreg = 'Registro ID '.$Parametros[ 'IdenAmos' ].' excluido';
					
						self::$Conn->commit();
					};

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Amostras',
						'status' => 'sucesso',
						'descricao' => 'Exclusão de Amostras',
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Amostras',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Amostras com erro </br> '.$e->getMessage(),
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
		public static function SetImpreAmos( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Amostras::Inicia();

				try{
					self::$Conn->beginTransaction();

					$SqlGetRegAmos = str_replace(
						':FILTRO',
						'( amos_cada_iden LIKE :amos_cada_iden )', self::$RotSql[ 'GetRegAmos' ] );
					
					$Prepara = self::$Conn->prepare( $SqlGetRegAmos );
					$Prepara->bindValue( ':amos_cada_iden', $Parametros[ 'IdenAmos' ] );
					
					$Prepara->execute();

					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
					
					$Cabecalho = '
						<table border="0" style="border-collapse: collapse">
        					<tr>
          						<td width="100" height="100" align="center"></td>
	          					<td width="580" align="center">
    	        					<span style="font-size: 15pt"><b> FICHA DA AMOSTRA </b></span>
        	  					</td>
              				</tr>
							<tr>
          						<td width="681">
									<hr style="height:1px; border:none; color:#000; background-color:#000"/>
								</td>
							</tr>
      					</table>
					';
					
					$Ensaios = '';

					$EnsaPadrao = '
						<tr>
							<td width="226" align="center">
								:ENSAIO
							</td>
							<td width="226" align="center">
								:RESULT
							</td>
							<td width="228" align="center">
							</td>
						</tr>
					';
						
					$EnsaLista = array(
						'amos_cada_achat_expan' => 'Achatamento Expansão',
						'amos_cada_achat_final' => 'resultado achat',
						'amos_cada_expan_final' => 'resultado expan',
						'amos_cada_charp' => 'Charpy',
						'amos_cada_charp_final' => 'resultado',
						'amos_cada_dobram_2cps' => 'DOBRAM 2 CPs',
						'amos_cada_dobram_2cps_final' => 'resultado',
						'amos_cada_dobram_4cps' => 'DOBRAM 4 CPs',
						'amos_cada_dobram_4cps_final' => 'resultado',
						'amos_cada_dureza' => 'Dureza',
						'amos_cada_dureza_final' => 'resultado',
						'amos_cada_macrog' => 'Macrografia',
						'amos_cada_macrog_final' => 'resultado',
						'amos_cada_metalo' => 'Metalogarafico',
						'amos_cada_metalo_final' => 'resultado',
						'amos_cada_pce' => 'PCE',
						'amos_cada_pce_final' => 'resultado',
						'amos_cada_quimica' => 'Quimico',
						'amos_cada_quimica_final' => 'resultado',
						'amos_cada_tracao_1' => 'Tração 1º',
						//'amos_cada_tracao_1_final' => 'resultado',
						'amos_cada_tracao_2' => 'Tração 2º',
						//'amos_cada_tracao_2_final' => 'resultado',
						'amos_cada_campo_quimica' => 'Quimico em Campo',
						'amos_cada_campo_quimica_final' => 'resultado',
						'amos_cada_campo_metalo' => 'Metalografico em Campo',
						'amos_cada_campo_metalo_final' => 'resultado',
						'amos_cada_forne_tracao' => 'Tração no Fabricante',
						//'amos_cada_forne_tracao_final' => 'resultado',
						'amos_cada_forne_dureza' => 'Dureza no Fabricante',
						'amos_cada_forne_dureza_final' => 'resultado',
						'amos_cada_forne_charp' => 'Charpy no Fabricante',
						'amos_cada_forne_charp_final' => 'resultado',
					);

					$vResultado = array(
						'EM ANÁLISE',
						'REPROVADO',
						'INFORMATIVO',
						'TOLERÁVEL',
						'APROVADO',
						'',
					);
					
					$vChatExpan = '';
					foreach ( $EnsaLista as $Campo => $Valor ) {
						if( $Valor == 'resultado achat' ){
							$vChatExpan = 'Achatamento: '.$vResultado[ $Retorno[0][ $Campo ] + 1 ];
						};
						if( $Valor == 'resultado expan' ){
							$vChatExpan = $vChatExpan.'<br>Expanção: '.$vResultado[ $Retorno[0][ $Campo ] + 1 ];
							$Ensaios = str_replace( ':RESULT', $vChatExpan, $Ensaios );
						};
						if( $Valor == 'resultado' ){
							$Ensaios = str_replace( ':RESULT', $vResultado[ $Retorno[0][ $Campo ] + 1 ], $Ensaios );
						} else {
							if ( $Retorno[0][ $Campo ] == 1 ) {	
								$Ensaios = $Ensaios.str_replace( ':ENSAIO', $Valor, $EnsaPadrao );
							};
						};
					};

					$Ensaios = str_replace( ':RESULT', '', $Ensaios );

					$Corpo = '
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">
        					<tr>
          						<td width="170"> <b>R.G.: </b>'.$Retorno[0]['amos_cada_regi'].'</td>
	          					<td width="170"> <b>O.S.: </b>'.$Retorno[0]['amos_cada_orse'].'</td>
          						<td width="170"> <b>Emissão: </b>'.date( Core::config( 'date_format' ), strtotime($Retorno[0]['amos_cada_emis'] ) ).'</td>
	          					<td width="170" align="center" style="background-color:#d5d6d8; font-size: 13pt"> <b>Prioridade: '.$Retorno[0]['amos_cada_priori'].'</b></td>
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
								<td width="680" style="height:150px">
									 <b>Descrição</b>
								 	<br>
								 	'.$Retorno[0]['amos_cada_descr'].'
								</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">
							<tr>
								<td width="680" style="height:150px">
									 <b>Observação</b>
								 	<br>
								 	'.$Retorno[0]['amos_cada_obser'].'
								</td>
							</tr>
      					</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">
        					<tr>
								<td width="680" align="center">
									<b>LISTA DE ENSAIOS E ANÁLISES LIBERADOS</b>
								</td>
							</tr>
							'.$Ensaios.'
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">
        					<tr>
								<td width="680">
									 <b>Cadastrado Por: </b> '.$Retorno[0]['usua_cada_nome'].'
								</td>
							</tr>
						</table>
						<br>
						<br>
						<br>
						<table border="1" cellpadding="5" style="border-collapse: collapse; font-size: 10pt">
        					<tr>
								<td width="680" align="center" style="height:25px">
									<img src="@'.Core::SetCodBarrPDF( $Retorno[0]['amos_cada_regi'], 'C128', 3, 50 ).'"/><br>
									'.$Retorno[0]['amos_cada_regi'].'
								</td>
							</tr>
						</table>
					';

					$listreg = Core::SetGeraPdf(
						$Cabecalho,
						$Corpo,
						str_replace( array( 'Back\Modulos\Laboratorio\Amostras', 'Back/Modulos/Laboratorio/Amostras' ), '', __DIR__ ).'Imagem/'.$Retorno[0]['sis_para_logo'],
						'P',
						'SIMPLES',
						array( 10, 40, 10 )
					);

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Amostras',
						'status' => 'sucesso',
						'descricao' => 'Impressão de Amostras',
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Amostras',
						'status' => 'invalido',
						'descricao' => 'Impressão de Amostras com erro </br> '.$e->getMessage(),
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
					'modulo' => 'Amostras',
					'status' => 'sucesso',
					'descricao' => 'Exclusão de Arquivo',
					'listreg' => true,
				));
			} catch ( PDOException $e ) {
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Amostras',
					'status' => 'invalido',
					'descricao' => 'Exclusão de Arquivo com erro </br> '.$e->getMessage(),
					'listreg' => false,
				));
			};
		}
	}
?>