<?php
	namespace Back\Modulos\Laboratorio\Tracao;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Comum\Empresas\Empresas;
	use Back\Modulos\Comum\Usuarios\Usuarios;
	use Back\Modulos\Comum\Anexos\Anexos;
	use Back\Modulos\Laboratorio\Clientes\Clientes;
	use Back\Modulos\Laboratorio\Fabricantes\Fabricantes;
	use Back\Modulos\Laboratorio\Materiais\Materiais;
	use Back\Modulos\Laboratorio\Areas\Areas;
	use Back\Modulos\Laboratorio\Certificado\Certificado;

	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas Tração
 	 * Todas as requisições Tração passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Tração
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Tracao {
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
			include_once( 'Tracao.sql.php' );

			self::$RotSql[ 'GetRegTrac' ] = $GetRegTrac;
			
			self::$RotSql[ 'InstRegTrac' ] = $InstRegTrac;
			self::$RotSql[ 'UpdtRegTrac' ] = $UpdtRegTrac;

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
		public static function GetTenanTrac( $Parametros = array() ){
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
		public static function GetEmpreTrac( $Parametros = array() ){
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
		public static function GetClieTrac( $Parametros = array() ){
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
		public static function GetFabrTrac( $Parametros = array() ){
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
		public static function GetMateTrac( $Parametros = array() ){
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
		public static function GetAreaTrac( $Parametros = array() ){
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
		 public static function GetUsuaTrac( $Parametros = array() ){
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
		public static function GetTrac( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Tracao::Inicia();

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

					$GetRegTrac = str_replace(
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
						 ( amos_tracao_cada_fina LIKE :amos_tracao_cada_fina OR
						   amos_tracao_cada_fina IS NULL )',
						self::$RotSql[ 'GetRegTrac' ]
					);

					$Prepara = self::$Conn->prepare( $GetRegTrac );

					$Prepara->bindValue( ':amos_cada_regi', $Parametros[ 'amos_cada_regi' ] );
					$Prepara->bindValue( ':amos_cada_orse', $Parametros[ 'amos_cada_orse' ] );
					$Prepara->bindValue( ':amos_cada_emis_ini', Core::GetDataMariaDb( $Parametros[ 'amos_cada_emis_ini' ] ).' 00:00:00' );
					$Prepara->bindValue( ':amos_cada_emis_fim', Core::GetDataMariaDb( $Parametros[ 'amos_cada_emis_fim' ] ).' 23:59:59' );
					$Prepara->bindValue( ':amos_cada_clie_iden', $Parametros[ 'amos_cada_clie_iden' ] );
					$Prepara->bindValue( ':amos_cada_fabr_iden', $Parametros[ 'amos_cada_fabr_iden' ] );
					$Prepara->bindValue( ':amos_cada_area_iden', $Parametros[ 'amos_cada_area_iden' ] );
					$Prepara->bindValue( ':amos_cada_tenan', $Parametros[ 'amos_cada_tenan' ] );
					$Prepara->bindValue( ':amos_cada_empre', $Parametros[ 'amos_cada_empre' ] );
					$Prepara->bindValue( ':amos_tracao_cada_fina', $Parametros[ 'amos_tracao_cada_fina' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						$Figura = 'fas fa-eye';
						if ( isset( $input['amos_tracao_cada_boto'] ) == false){
							
							if ( $input['amos_tracao_cada_fina'] == 0 ){
								$Figura = 'fas fa-edit';
							};
							
							$Botao = $Botao.'
								<button id="EditBtnTrac" type="button" class="btn btn-secondary" title="ALTERAR"><i class="'.$Figura.'"></i></button>
								<button id="ImprBtnTrac" type="button" class="btn btn-success" title="IMPRIMIR"><i class="fas fa-print"></i></button>
								<button id="CertBtnTrac" type="button" class="btn btn-primary" title="CERTIFICADO"><i class="fas fa-certificate"></i></button>
							';
						};
						
						return array(
							'amos_tracao_cada_boto' => $Botao,
							'amos_cada_iden' => $input['amos_cada_iden'],
							'amos_cada_regi' => $input['amos_cada_regi'],
							'amos_cada_orse' => $input['amos_cada_orse'],
							'clie_cada_nome' => $input['clie_cada_nome'],
							'fabr_cada_nome' => $input['fabr_cada_nome'],
							'mate_cada_descr' => $input['mate_cada_descr'],
							'area_cada_descr' => $input['area_cada_descr'],
							'amos_cada_emis' => $input['amos_cada_emis'],
							'amos_cada_descr' => $input['amos_cada_descr'],
							'amos_cada_local' => $input['amos_cada_local'],
							'amos_cada_tipo' => $input['amos_cada_tipo'],
							'amos_cada_tenan' => $input['amos_cada_tenan'],
							'amos_cada_empre' => $input['amos_cada_empre'],
							'amos_tracao_cada_iden' => $input['amos_tracao_cada_iden'],
							'amos_tracao_cada_qtde' => $input['amos_tracao_cada_qtde'],
							'amos_tracao_cada_result' => $input['amos_tracao_cada_result'],
							'amos_tracao_cada_limi_resist' => $input['amos_tracao_cada_limi_resist'],
							'amos_tracao_cada_limi_escoa' => $input['amos_tracao_cada_limi_escoa'],
							'amos_tracao_cada_along' => $input['amos_tracao_cada_along'],
							'amos_tracao_cada_redu_area' => $input['amos_tracao_cada_redu_area'],
							'amos_tracao_cada_area' => $input['amos_tracao_cada_area'],
							'amos_tracao_cada_aeo' => $input['amos_tracao_cada_aeo'],
							'amos_tracao_cada_aef' => $input['amos_tracao_cada_aef'],
							'amos_tracao_cada_ra' => $input['amos_tracao_cada_ra'],
							'amos_tracao_cada_lo' => $input['amos_tracao_cada_lo'],
							'amos_tracao_cada_lf' => $input['amos_tracao_cada_lf'],
							'amos_tracao_cada_al' => $input['amos_tracao_cada_al'],
							'amos_tracao_cada_obs' => $input['amos_tracao_cada_obs'],
							'amos_tracao_cada_fina' => $input['amos_tracao_cada_fina'],
							'amos_tracao_cada_fina_data' => $input['amos_tracao_cada_fina_data'],
							'amos_tracao_cada_fina_usua_iden' => $input['amos_tracao_cada_fina_usua_iden'],
						);
					}, $Retorno );
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tração',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Tração',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tração',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Tração com erro </br> '.$e->getMessage(),
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
		public static function SetSalvTrac( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 136,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 137,
				);
				
				$PermiAlter = Usuarios::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenTrac' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenTrac' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};
				Tracao::Inicia();

				try {
					
					if ( $Parametros[ 'IdenTrac' ] == 'Automatico' ){
						$Parametros[ 'IdenTrac' ] = 0;
					};

					self::$Conn->beginTransaction();

					if ( $Parametros[ 'IdenTrac' ] == 0 ){
						$descricao = 'Inclusão de Tração';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegTrac' ] );
					} else {
						$descricao = 'Alteração de Tração';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegTrac' ] );
						$Prepara->bindValue( ':amos_tracao_cada_iden', $Parametros[ 'IdenTrac' ] );
					};

					$Prepara->bindValue( ':amos_tracao_cada_amos_iden', $Parametros[ 'IdenAmos' ] );
					$Prepara->bindValue( ':amos_tracao_cada_qtde', str_replace( '.', '', $Parametros[ 'QtdeTrac' ] ) );
					$Prepara->bindValue( ':amos_tracao_cada_result', $Parametros[ 'ResulTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_limi_resist', $Parametros[ 'LimResiTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_limi_escoa', $Parametros[ 'LimEscoTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_along', $Parametros[ 'AlonTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_redu_area', $Parametros[ 'ReduAreTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_area', $Parametros[ 'AreaAnaTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_aeo', $Parametros[ 'AEOTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_aef', $Parametros[ 'AEfTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_ra', $Parametros[ 'RATrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_lo', $Parametros[ 'LOTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_lf', $Parametros[ 'LfTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_al', $Parametros[ 'ALTrac' ] );
					$Prepara->bindValue( ':amos_tracao_cada_obs',  Core::UpperCase( $Parametros[ 'ObseTrac' ] ) );
					$Prepara->bindValue( ':amos_tracao_cada_fina', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'FinaTrac' ] ) );

					if ( $Parametros[ 'FinaTrac' ] == 'true' ){
						$Prepara->bindValue( ':amos_tracao_cada_fina_data', Core::GetDataMariaDb( $Parametros[ 'DatFinaTrac' ] ) );
						$Prepara->bindValue( ':amos_tracao_cada_fina_usua_iden', $Parametros[ 'ExcutTrac' ] );
					} else {
						$Prepara->bindValue( ':amos_tracao_cada_fina_data', 'NULL' );
						$Prepara->bindValue( ':amos_tracao_cada_fina_usua_iden', 'NULL' );
					}
					$Prepara->execute();
					
					if ( $descricao == 'Inclusão de Tração' ){
						$Retorno = self::$Conn->lastInsertId().' incluido';
						$Parametros[ 'IdenTrac' ] = self::$Conn->lastInsertId();
					} else {
						$Retorno = $Parametros[ 'IdenTrac' ].' alterado';
					};


					$RetorAnexos = Anexos::SetSalvAnex( $Parametros[ 'AnexosTrac' ], $Parametros[ 'anexo_ensa_tabe' ], $Parametros[ 'IdenTrac' ], self::$Conn );

					self::$Conn->commit();

					if ( $RetorAnexos['status'] == 'sucesso' ) {
							
						$status = 'sucesso';
						$listreg = 'Registro ID '.$Retorno;

						return json_encode( array(
							'sistema' => Core::config( 'system_apelido' ),
							'modulo' => 'Tração',
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
						'modulo' => 'Tração',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Tração com erro </br> '.$e->getMessage(),
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
		public static function SetImpreTrac( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Tracao::Inicia();

				try{
					self::$Conn->beginTransaction();

					$GetRegMeta = str_replace(
						':FILTRO',
						'( amos_cada_iden = :amos_cada_iden )', 
						self::$RotSql[ 'GetRegTrac' ]
					);
					
					$Prepara = self::$Conn->prepare( $GetRegMeta );
					$Prepara->bindValue( ':amos_cada_iden', $Parametros[ 'IdenTrac' ] );
					
					$Prepara->execute();

					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
					
					$Cabecalho = '
						<table border="0" style="border-collapse: collapse">
        					<tr>
          						<td width="100" height="100" align="center"></td>
	          					<td width="580" align="center">
    	        					<span style="font-size: 15pt"><b> TRAÇÃO </b></span>
        	  					</td>
              				</tr>
							<tr>
          						<td width="681">
									<hr style="height:1px; border:none; color:#000; background-color:#000"/>
								</td>
							</tr>
      					</table>
					';

					$amos_tracao_cada_result = '';

					if ( $Retorno[0]['amos_tracao_cada_result'] != -1 ){
						$amos_tracao_cada_result = str_replace(
							array( 0, 1, 2, 3 ), 
							array( 'REPROVADO', 'INFORMATIVO', 'TOLERAVEL', 'APROVADO' ),
							$Retorno[0]['amos_tracao_cada_result']
						);
					};

					$amos_tracao_cada_fina_data = '';
					if ( $Retorno[0]['amos_tracao_cada_fina_data'] != '' && $Retorno[0]['amos_tracao_cada_fina_data'] != '0000-00-00 00:00:00' ){
						$amos_tracao_cada_fina_data = date( Core::config( 'date_format' ), strtotime( $Retorno[0]['amos_tracao_cada_fina_data'] ) );
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
								<td width="264"> <b>Tipo: </b>'.$Retorno[0]['amos_cada_tipo'].'</td>
								<td width="190"> <b>Quantidade: </b>'.$Retorno[0]['amos_tracao_cada_qtde'].'</td>
								<td width="226" align="center" style="background-color:#d5d6d8;"> <b>Tração: </b>'.$amos_tracao_cada_result.'</td>
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
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">		
							<tr>
								<td width="340"> <b>Limite Resistencia: </b>'.$Retorno[0]['amos_tracao_cada_limi_resist'].'</td>
								<td width="340"> <b>Limite Escoamento: </b>'.$Retorno[0]['amos_tracao_cada_limi_escoa'].'</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">		
							<tr>
								<td width="340"> <b>Alongamento: </b>'.$Retorno[0]['amos_tracao_cada_along'].'</td>
								<td width="340"> <b>Redução de Área: </b>'.$Retorno[0]['amos_tracao_cada_redu_area'].'</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">		
							<tr>
								<td width="340"> <b>Área (mm2): </b>'.$Retorno[0]['amos_tracao_cada_area'].'</td>
								<td width="340"> <b>AEO (mm): </b>'.$Retorno[0]['amos_tracao_cada_aeo'].'</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">		
							<tr>
								<td width="340"> <b>AEf (mm): </b>'.$Retorno[0]['amos_tracao_cada_aef'].'</td>
								<td width="340"> <b>R.A. (%): </b>'.$Retorno[0]['amos_tracao_cada_ra'].'</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">		
							<tr>
								<td width="226"> <b>LO (mm): </b>'.$Retorno[0]['amos_tracao_cada_lo'].'</td>
								<td width="227"> <b>Lf (mm): </b>'.$Retorno[0]['amos_tracao_cada_lf'].'</td>
								<td width="227"> <b>AL (%): </b>'.$Retorno[0]['amos_tracao_cada_al'].'</td>
							</tr>
						</table>
						<br>
						<br>

						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 9pt">
							<tr>
								<td width="680" style="height:97px">
									 <b>Observação</b>
									<br>
									 '.nl2br( $Retorno[0]['amos_tracao_cada_obs'] ).'
								</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">
							<tr>
								<td width="125"> <b>Finalizado ?: </b>'.str_replace( array( 0, 1 ), array( 'NÃO', 'SIM' ), $Retorno[0]['amos_tracao_cada_fina'] ).'</td>
								<td width="180"> <b>Finalizado Em: </b>'.$amos_tracao_cada_fina_data.'</td>
								<td width="375"> <b>Realizado Por: </b>'.$Retorno[0]['usua_cada_nome'].'</td>
							</tr>
						</table>
					';

					$CabeLogo = '';
					if( $Retorno[0]['sis_para_logo'] != '' ){
						$CabeLogo = str_replace( array( 'Back\Modulos\Laboratorio\Tracao', 'Back/Modulos/Laboratorio/Tracao' ), '', __DIR__ ).'Imagem/'.$Retorno[0]['sis_para_logo'];
					};

					$listreg = Core::SetGeraPdf(
						$Cabecalho,
						$Corpo,
						$CabeLogo,
						'P',
						'SIMPLES',
						array( 10, 40, 10, 5 )
					);

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tração',
						'status' => 'sucesso',
						'descricao' => 'Impressão de Tração',
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tração',
						'status' => 'invalido',
						'descricao' => 'Impressão de Tração com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Gera PDF a Quimica cadastrada
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return arquivo
		 * @access public
		*/
		public static function SetImprCertTrac( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Certificado::SetImpreCert( $Parametros );
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
					'modulo' => 'Tração',
					'status' => 'sucesso',
					'descricao' => 'Exclusão de Arquivo',
					'listreg' => true,
				));
			} catch ( PDOException $e ) {
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Tração',
					'status' => 'invalido',
					'descricao' => 'Exclusão de Arquivo com erro </br> '.$e->getMessage(),
					'listreg' => false,
				));
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
		public static function GetRegTracTerce( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Tracao::Inicia();

				try {
					self::$Conn->beginTransaction();

					$GetRegTrac = str_replace(
						':FILTRO',
						'( amos_cada_iden = :amos_cada_iden )', 
						self::$RotSql[ 'GetRegTrac' ]
					);
					
					$Prepara = self::$Conn->prepare( $GetRegTrac );
					$Prepara->bindValue( ':amos_cada_iden', $Parametros[ 'amos_cada_iden' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tração',
						'status' => 'sucesso',
						'descricao' => 'Resultado Terceiro Tração',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Tração',
						'status' => 'invalido',
						'descricao' => 'Terceiro Tração com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>